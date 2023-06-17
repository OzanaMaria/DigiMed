import React, { useRef, useState } from "react";
import "./dashboard.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";

export default function Dashboard() {
    const [date, setDate] = useState(new Date());
    const [result, setResult] = useState();
    const onChange = date => {
        setDate(date);
        axios.get('localhost:3000/appointments').then(response => {
            setResult(response)
        })

    };
    console.log(result);
    return (
        <div className="page-container">
            <Container> <Row className="title">Programarile mele</Row>
                <Row className="gol"></Row>
                <Row className="calendar-container">
                    <Calendar onChange={onChange} value={date} />
                    <Row className="gol"></Row>
                    <Row className="programari"><div style={{ color: "#D9D9D9", fontSize: "18px", fontWeight: "700" }}>Nu exista programari.</div><button style={{ color: "#007E85", fontSize: "18px", fontWeight: "700", opacity: "0.7" }}>Adauga o programare</button> </Row>
                </Row>
                <Row className="gol"></Row>
                <Row className="programari-recurente-container">
                    <Row className="programari-recurente"><div style={{ color: "#007E85", fontSize: "18px", fontWeight: "700", opacity: "0.7" }}>Programari recurente</div> </Row>
                </Row>
            </Container>
        </div>
    );
}