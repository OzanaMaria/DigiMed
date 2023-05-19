import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAuth } from "../contexts/AuthContexts";
import "./SignUp.css";

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState("");
    const [select, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    // console.log(signup)
    const navigate = useNavigate();
    function handleChange(e) {
        const { name, value } = e.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value,
            }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            const newUser = {
                email: emailRef.current.value,
                role: select.show,
            }
            console.log(newUser);
            axios.post('http://localhost:3000/users', newUser,
                {
                    headers: { "Content-Type": "application/json" }
                }
            )
            navigate("/login");
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    }

    return (
        <div className='page-container'>
            <div className="register-container">
                <Row className='first-display-card'>
                    <Col className='green'>
                        <h2 className='text-center mb-4'>Register</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}

                        <Form className="form-container" onSubmit={handleSubmit}>
                            <Form.Group id='credentials'>

                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    ref={emailRef}
                                    required
                                />
                                <Form.Label className='mt-2'>Roles</Form.Label>
                                <Form.Select required onChange={handleChange} name="show" >
                                    <option value="Select">Select option</option>
                                    <option value="pacient">Pacient</option>
                                    <option value="doctor">Doctor</option>
                                </Form.Select>
                                <Form.Label className='mt-2'>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    ref={passwordRef}
                                    required
                                />

                                <Form.Label className='mt-2'>Password Confirmation</Form.Label>
                                <Form.Control
                                    type='password'
                                    ref={passwordConfirmRef}
                                    required
                                />
                            </Form.Group>

                            <Button className='mt-2' id='register'
                                variant="light"
                                type='submit'
                            >
                                Submit
                            </Button>
                        </Form>



                    </Col>
                    {/* <Col className='img-container'><Image className="background-img" src={backgroundImg} /></Col> */}

                </Row>
                <div className='w-100 text-center mt-2' id='login-check'>
                    Already have an account? <Link to='/login'><Button variant="link">Login</Button></Link>
                </div>
            </div>
        </div>
    );
}