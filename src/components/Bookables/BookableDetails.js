import { useState } from "react";
import data from "../../static.json";
const { sessions, days } = data;

export default function BookableDetails({ bookable }){
    const [hasDetails, setHasDetails] = useState(true);

    function toogleDetails(){
        setHasDetails(has=>!has);
    }

    return bookable ?
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
                        {/* <button className="btn" onClick={stopPresentation}>Stop</button> */}
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
    : null;
}