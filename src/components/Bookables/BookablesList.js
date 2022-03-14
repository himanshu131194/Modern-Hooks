import { useReducer } from "react";
import data from "../../static.json";
import { FaArrowRight } from "react-icons/fa";
import reducer from './reducer';
const { bookables, sessions, days } = data;

const initialState = {
    group: 'Rooms',
    bookableIndex: 0,
    hasDetails: true,
    bookables
}

export default function BookablesList() {

    const [{ group, bookableIndex, hasDetails, bookables }, dispatch ] = useReducer(reducer, initialState);
    
    const bookableInGroup = bookables.filter((b) => b.group === group);
    const groups = [...new Set(bookables.map(b => b.group))];
    const bookable = bookableInGroup[bookableIndex];

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
        })
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
                    <button className="btn" onClick={nextBookable} autoFocus>
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