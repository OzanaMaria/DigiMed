import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Card, Form, Alert } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import "./Modal.css";
import firebase from "../firebase";
import axios from "axios";

function StaticExample(props) {
    const email = firebase.auth().currentUser.email;
    const [result, setResult] = useState(0);
    const [hospital, setHospitals] = useState([]);
    const [speciality, setSpeciality] = useState([]);
    const [doctor, setDoctor] = useState([]);
    const [show, setShow] = useState(true);

    useEffect(() => {

        const url = 'http://localhost:3000/users/' + email;

        axios.get(url)
            .then(function (response) {
                setResult(response.data.user.id)
            })
            .catch(function (error) {
                console.log(error);
            });

        const url2 = 'http://localhost:3000/extra/hospitals';
        axios.get(url2)
            .then(function (response) {
                console.log(response.data.hospitals);
                setHospitals(response.data.hospitals)
            })
            .catch(function (error) {
                console.log(error);
            });

        const url3 = 'http://localhost:3000/extra/specialities';
        axios.get(url3)
            .then(function (response) {
                console.log(response.data.specialities);
                setSpeciality(response.data.specialities)
            })
            .catch(function (error) {
                console.log(error);
            });

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

    const [formState, setFormState] = useState(
        {
            "patient": email,
            "doctorName": "",
            "date": "",
            "type": "",
            "speciality": "",
            "hospital": "",
        }
    );
    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    // const handleSubmit = async (e) => {
    //     setShow(true)
    //     e.preventDefault();
    //     console.log(formState);
    //     axios.post('http://localhost:3000/appointments',
    //         formState)
    //         .then(function (response) {
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    //     setShow(false);
    //     await delay(1000);
    //     window.location.reload(false);
    // }
    const handleSubmit = async (e) => {
        const response = await fetch('https://eu.engine.gorules.io/documents/50aa1769-678f-4675-b83d-a8ca09c6c8ba/digimed ', {
            method: 'POST',
            headers: {
                'X-Access-Token': 'kwHGzZGGXV7fHZ1IUL2HZH7R',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                context: {
                    user: { age: 13, gender: "Female" },
                },
            }),
        });

        const { data } = await response.json();
        console.log("result ", data);

    };

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Adauga programare
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="date">Data</label>
                            <input name="date" onChange={handleChange} value={formState.date} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="doctorName">Doctor</label>
                            <select
                                name="doctorName"
                                onChange={handleChange}
                                value={formState.doctorName}
                                required
                            >
                                <option value="select">Select Doctor</option>
                                {doctor.length > 0 && doctor.map(elem => <option value={elem}>{elem}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="speciality">Speciality</label>
                            <select
                                name="speciality"
                                onChange={handleChange}
                                value={formState.speciality}
                                required
                            >
                                <option value="select">Select Speciality</option>
                                {speciality.length > 0 && speciality.map(elem => <option value={elem}>{elem}</option>)}

                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="hospital">Hospital</label>
                            <select
                                name="hospital"
                                onChange={handleChange}
                                value={formState.hospital}
                            >
                                <option value="select">Select Hospital</option>
                                {hospital.length > 0 && hospital.map(elem => <option value={elem}>{elem}</option>)}

                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <select
                                name="type"
                                onChange={handleChange}
                                value={formState.type}
                            >
                                <option value="select">Select</option>
                                <option value="singular">singular</option>
                                <option value="annually">annually</option>
                                <option value="biannually">biannually</option>
                                <option value="quarterly">quarterly</option>
                                <option value="weekly">weekly</option>
                                <option value="biweekly">biweekly</option>
                            </select>
                        </div>
                        {show === true ?
                            <button type="submit" className="btn" onClick={handleSubmit}>
                                Submit
                            </button> :
                            <Alert variant="success" dismissible>
                                <Alert.Heading>Oh snap! You got success!</Alert.Heading>
                            </Alert>
                        }
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default StaticExample;