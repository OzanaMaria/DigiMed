import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import firebase from "../firebase";
import axios from "axios";
import "./dashboard.css";
import "./doctors.css";
import DoctorProfile from "./doctorProfile";
import Container from 'react-bootstrap/Container';

function Doctors() {
    const email = firebase.auth().currentUser.email
    const [doctors, setDoctor] = useState([]);
    useEffect(() => {

        const doctors = 'http://localhost:3000/users/doctors';
        axios.get(doctors)
            .then(function (response) {
                console.log("doctors are: " + response.data.docs);
                setDoctor(response.data.docs);
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);
    return (
        <div className="doctor-list-page">
            <div className="doctor-list">
                {doctors.length > 0 && doctors.map((doctor) => (
                <DoctorProfile doctor={doctor} />
                ))}
            </div>
        </div>
    );
}

export default Doctors;