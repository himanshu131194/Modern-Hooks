import { useReducer, useEffect, useRef, Fragment } from "react";
import data from "../../static.json";
import { FaArrowRight } from "react-icons/fa";
import Spinner from '../UI/Spinner';
import reducer from './reducer';
import getData from "../../utils/api";
const { sessions, days } = data;



const initialState = {
    group: 'Rooms',
    bookableIndex: 0,
    hasDetails: true,
    bookables:[],
    isLoading: true,
    error: false
}

export default function BookablesList() {

    const timeRef = useRef(null);
    const nextButtonRef = useRef();
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const { group, bookableIndex, bookables } = state;
    const { hasDetails, isLoading, error } = state;
    
    const bookableInGroup = bookables.filter((b) => b.group === group);
    const groups = [...new Set(bookables.map(b => b.group))];
    const bookable = bookableInGroup[bookableIndex];

    useEffect(()=>{
        timeRef.current = setInterval(()=>{
            dispatch({ type: "NEXT_BOOKABLE" });
        }, 3000);
        return stopPresentation
    },[])

    function stopPresentation(){
        clearInterval(timeRef.current);
    }

    useEffect(()=>{
        dispatch( { type: "FETCH_BOOKABLES_REQUEST" });
        getData("http://localhost:3001/bookables")
            .then((bookables)=>dispatch({
                type: "FETCH_BOOKABLES_SUCCESS",
                payload: bookables
            }))
            .catch((error)=>dispatch({
                type: "FETCH_BOOKABLES_ERROR",
                payload: error
            }))
    }, []);


    function nextBookable() {
        dispatch({
            type: "NEXT_BOOKABLE"
        })
    }

    function changeGroup(e){
        dispatch({
            type: "SET_GROUP",
            payload: e.target.value
        });
    }

    function toogleDetails(){
        dispatch({
            type: "TOGGLE_HAS_DETAILS"
        })
    }

    function changeBookable(selectedIndex){
        dispatch({
            type: "SET_BOOKABLE",
            payload: selectedIndex
        });
        nextButtonRef.current.focus();
    }

    if(error){
        return <p>{error.message}</p>
    }

    if(isLoading){
        return <p><Spinner/> Loading bookables....</p>
    }

    return (
        <>
            <div>
                <select
                    value={group}
                    onChange={changeGroup}>
                    {groups.map(g => <option value={g} key={g}>{g}</option>)}
                </select>
                <ul className="items-list-nav">
                    {bookableInGroup.map((b, i) => (
                        <li key={b.id} className={i === bookableIndex ? 'selected' : null}>
                            <button className='btn' onClick={() => changeBookable(i)}>{b.title}</button>
                        </li>
                    ))}
                </ul>
                <p>
                    <button className="btn" onClick={nextBookable} ref={nextButtonRef} autoFocus>
                        <FaArrowRight />
                        <span>Next</span>
                    </button>
                </p>
            </div>

            {bookable &&
                <div className="bookable-details">
                    <div className="item">
                        <div className="item-header">
                            <h2>{bookable.title}</h2>
                            <span className="controls">
                                <label>
                                    <input
                                        type='checkbox'
                                        checked={hasDetails}
                                        onChange={toogleDetails}
                                    />
                                    Show Details
                                </label>
                                <button className="btn" onClick={stopPresentation}>Stop</button>
                            </span>

                        </div>
                        <p>{bookable.notes}</p>
                        {hasDetails &&
                            <div className="item-details">
                                <h2>Availability</h2>
                                <div className="bookable-availability">
                                    <ul>
                                        {bookable.days.sort().map(d => <li key={d}>{days[d]}</li>)}
                                    </ul>
                                    <ul>
                                        {bookable.sessions.sort().map(s => <li key={s}>{sessions[s]}</li>)}
                                    </ul>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}