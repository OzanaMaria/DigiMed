import React, { useEffect, useRef, useState } from "react";
import "./dashboard.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card, Form, Alert } from "react-bootstrap";
import axios from "axios";
import Modal from "./Modal"
import Button from 'react-bootstrap/Button';
import firebase from "../firebase";

export default function Dashboard() {
    const [date, setDate] = useState(new Date());
    const [result, setResult] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [appointments, setAppointments] = useState();
    const email = firebase.auth().currentUser.email

    const onChange = date => {
        setDate(date);

        const url = 'http://localhost:3000/appointments/' + date + "/" + email;

        axios.get(url, {
        })
            .then(function (response) {

                setResult(response.data.appointment)
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    useEffect(() => {

        const url = 'http://localhost:3000/appointments/' + email;

        axios.get(url)
            .then(function (response) {
                setAppointments(response.data.appointment)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);
    console.log(result);
    return (
        <div className="page-container">
            <Container> <Row className="title">Programarile mele</Row>
                <Row className="gol"></Row>
                <Row className="calendar-container">
                    <Calendar onChange={onChange} value={date} />
                    <Row className="gol"></Row>
                    <Row>
                        {result.length === 0 ?
                            <div style={{ color: "#D9D9D9", fontSize: "18px", fontWeight: "700" }}>Nu exista programari.</div> : <div>Exista o programare</div>
                        }
                        <button onClick={() => setModalOpen(true)} style={{ color: "#007E85", fontSize: "18px", fontWeight: "700", opacity: "0.7" }}>Adauga o programare</button>
                        {modalOpen && (
                            <Modal
                                onHide={() => {
                                    setModalOpen(false);
                                }}
                                show={modalOpen}
                            />
                        )}
                    </Row>
                </Row>
                <Row className="gol"></Row>
                <Row className="programari-recurente-container">
                    <Row className="programari-recurente">
                        <div style={{ color: "#007E85", fontSize: "18px", fontWeight: "700", opacity: "0.7" }}>Programari recurente</div>

                        {appointments !== undefined && appointments.map(item => {
                            return <div>
                                <div style={{ color: "#007E85", fontSize: "18px", fontWeight: "700", opacity: "0.7" }}>Data: {item.date}</div>
                                <div style={{ color: "#007E85", fontSize: "18px", fontWeight: "700", opacity: "0.7" }}>Tip: {item.type}</div>
                                <div style={{ color: "#007E85", fontSize: "18px", fontWeight: "700", opacity: "0.7" }}>Specialitate: {item.speciality}</div>
                                <div style={{ color: "#007E85", fontSize: "18px", fontWeight: "700", opacity: "0.7" }}>Spital:{item.hospital}</div>
                            </div>

                        })}
                    </Row>
                </Row>

            </Container>
        </div >
    );
}