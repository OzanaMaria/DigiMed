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
    const [user, setUser] = useState();
    const email = firebase.auth().currentUser.email

    const evaluate = date => {
        const response = fetch('https://eu.engine.gorules.io/documents/50aa1769-678f-4675-b83d-a8ca09c6c8ba/digimed ', {
            method: 'POST',
            headers: {
                'X-Access-Token': 'kwHGzZGGXV7fHZ1IUL2HZH7R',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                context: {
                    customer: { country: 'US' },
                    cart: { totals: 100 },
                    product: { weight: 15 },
                },
            }),
        });

        const { data } = response.json();
        console.log(data);

    };
    const onChange = date => {
        setDate(date);

        let url;
        if (user != undefined && user.role == "doctor") {
            console.log("intra");
            url = 'http://localhost:3000/appointments/doc/' + date + "/" + email;
        } else {
            url = 'http://localhost:3000/appointments/' + date + "/" + email;
        }

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

        const url1 = 'http://localhost:3000/users/' + email;
        
        axios.get(url1)
            .then(function (response) {
                console.log(response.data.user);
                setUser(response.data.user)
            })
            .catch(function (error) {
                console.log(error);
            });

        let url;
        if (user != undefined && user.role == "doctor") {
            console.log("intra");
            url = 'http://localhost:3000/appointments/doc/' + email;
        } else {
            url = 'http://localhost:3000/appointments/' + email;
        }

        console.log("url este: " + url);
        axios.get(url)
            .then(function (response) {
                console.log(response);
                setAppointments(response.data.appointment)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, [user != undefined ? user.role : null]);
    console.log(result);
    return (
        <div className="page-container">
            <Container> <Row className="title">Programarile mele</Row>
                <Row className="gol"></Row>
                <Row className="calendar-container">
                    <Calendar onChange={onChange} value={date} />
                    <Row className="gol"></Row>
                    <Row className="programari">
                        {result.length === 0 ?
                            <Row style={{ color: "#D9D9D9", fontSize: "18px", fontWeight: "700" }}>Nu exista programari.</Row> :
                            <Row>
                                <div style={{ color: "#007E85", fontSize: "18px", fontWeight: "700" }}>
                                    <div>{new Date(result[0].date).toDateString()}</div>
                                    <div class="verticalLine">
                                        <div>
                                            Specialitate: {result[0].speciality}
                                        </div>
                                        <div>
                                            Hospital: {result[0].hospital}
                                        </div>


                                    </div>
                                </div>
                            </Row>
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
                    <Row className="programari-recurente" style={{ textAlign: "left" }}>
                        <div style={{ color: "#007E85", fontSize: "18px", fontWeight: "700", opacity: "0.7", marginLeft: "5%" }}>Programari recurente</div>

                        {appointments !== undefined && appointments.map(item => {
                            return <div>
                                <div style={{ color: "#007E85", fontSize: "16px", fontWeight: "700", opacity: "0.7", marginLeft: "5%" }}>Data: {new Date(item.date).toDateString()}</div>
                                <div style={{ color: "#007E85", fontSize: "16px", fontWeight: "700", opacity: "0.7", marginLeft: "5%" }}>Tip: {item.type}</div>
                                <div style={{ color: "#007E85", fontSize: "16px", fontWeight: "700", opacity: "0.7", marginLeft: "5%" }}>Specialitate: {item.speciality}</div>
                                <div style={{ color: "#007E85", fontSize: "16px", fontWeight: "700", opacity: "0.7", marginLeft: "5%" }}>Spital:{item.hospital}</div>
                                <hr
                                    style={{
                                        color: '#000000',
                                        backgroundColor: '#000000',
                                        height: .2,
                                        width: "auto",
                                        borderColor: '#007E85'
                                    }}
                                />
                            </div>

                        })}
                    </Row>
                </Row>

            </Container>
        </div >
    );
}