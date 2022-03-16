import { useReducer, useState } from 'react';
import reducer from './weekReducer';
import { getWeek } from '../../utils/date-wrangler';
import { FaChevronLeft, FaCalendarDay, FaChevronRight, FaCalendarCheck } from "react-icons/fa";

export default function WeekPicker({ date }) {
    const [week, dispatch] = useReducer(reducer, date, getWeek);
    const [dateText, setDateText] = useState('2022-03-16');

    function goToDate(){
        dispatch({ 
            type: 'SET_DATE',
            payload: dateText
        })
    }

    return (
        <div>
            <p className='date-picker'>
                <button className='btn' onClick={() => dispatch({ type: 'PREV_WEEK' })}>
                    <FaChevronLeft />
                    <span>Prev</span>
                </button>
                <button className='btn' onClick={() => dispatch({ type: 'TODAY' })}>
                    <FaCalendarDay />
                    <span>Today</span>
                </button>
                <span>
                    <input onChange={(e)=>setDateText(e.target.value)} placeholder={'e.g. 2022-03-16'}/>
                    <button className='go btn' onClick={goToDate}>
                        <FaCalendarCheck/>
                        <span>Go</span>
                    </button>
                </span>
                <button className='btn' onClick={() => dispatch({ type: 'NEXT_WEEK' })}>
                    <FaChevronRight />
                    <span>Next</span>
                </button>
            </p>
            <p>
                {week.start.toDateString()} - {week.end.toDateString()}
            </p>
        </div>
    )
}