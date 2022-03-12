import { useState } from "react";
import data from "../../static.json";
import { FaArrowRight } from "react-icons/fa";
const { bookables, sessions, days } = data;


export default function BookablesList() {

    const [group, setGroup] = useState('Kit');
    const bookableInGroup = bookables.filter((b) => b.group === group);
    const [bookableIndex, setBookableIndex] = useState(0);
    const groups = [...new Set(bookables.map(b => b.group))];

    const bookable = bookableInGroup[bookableIndex];
    const [hasDetails, setHasDetails] = useState(false);

    function nextBookable() {
        setBookableIndex(i => (i + 1) % bookableInGroup.length);
    }

    function changeGroup(e){
        setGroup(e.target.value);
        setBookableIndex(0);
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
                            <button className='btn' onClick={() => setBookableIndex(i)}>{b.title}</button>
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
                                        onChange={() => setHasDetails(has => !has)}
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