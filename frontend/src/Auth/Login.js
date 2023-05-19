import Container from 'react-bootstrap/Container';
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useAuth } from "../contexts/AuthContexts";
import "./SignUp.css";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);

            navigate("/dashboard")
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
                        <h2 className='text-center mb-4'>Login</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}

                        <Form className="form-container" onSubmit={handleSubmit}>
                            <Form.Group id='credentials'>

                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    ref={emailRef}
                                    required
                                />

                                <Form.Label className='mt-2'>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    ref={passwordRef}
                                    required
                                />

                            </Form.Group>

                            <Button className='mt-2' id='register'
                                variant="light"
                                type='submit'
                            >
                                Login
                            </Button>
                        </Form>



                    </Col>
                    {/* <Col className='img-container'><Image className="background-img" src={backgroundImg} /></Col> */}
                </Row>
                <div className='w-100 text-center mt-2' id='login-check'>
                    Need an account? <Link to='/signup'><Button variant="link">Register</Button></Link>
                </div>
            </div>
        </div>
    );
}