import React, { useRef, useState } from "react";
import "../Auth/SignUp.css";
import Row from 'react-bootstrap/Row';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Dashboard() {
    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date);
    };

    return (
        <div className="page-container">
            <Calendar showWeekNumbers onChange={onChange} value={date} />
            {/* {console.log(date)}
            {date.toString()} */}
        </div>
    );
}