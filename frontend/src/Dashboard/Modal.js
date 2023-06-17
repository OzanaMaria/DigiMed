import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Card, Form, Alert } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import "./Modal.css";
import firebase from "../firebase";
import axios from "axios";

function StaticExample(props) {
    const email = firebase.auth().currentUser.email;
    const [result, setResult] = useState();

    useEffect(() => {

        const url = 'http://localhost:3000/users/' + email;

        axios.get(url)
            .then(function (response) {
                console.log(response.data.user.id);
                setResult(response.data.user.id)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);
    const [formState, setFormState] = useState(
        {

            "patientId": result,
            "doctorId": 0,
            "date": "",
            "type": "",
            "speciality": "",
            "hospital": "",
        }
    );
    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formState);
        axios.post('http://localhost:3000/appointments',
            formState)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
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
                            <label htmlFor="patientId">PatientId</label>
                            <input type="number" name="patientId" onChange={handleChange} value={result} required />
                        </div>
                        <div className="form-group">
                            <label type="number" htmlFor="doctorId">doctorId</label>
                            <input
                                name="doctorId"
                                onChange={handleChange}
                                value={formState.doctorId}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="speciality">speciality</label>
                            <input
                                name="speciality"
                                onChange={handleChange}
                                value={formState.speciality}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hospital">hospital</label>
                            <input
                                name="hospital"
                                onChange={handleChange}
                                value={formState.hospital}
                                required
                            />
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
                        <button type="submit" className="btn" onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default StaticExample;