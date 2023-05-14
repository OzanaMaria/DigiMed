import Container from 'react-bootstrap/Container';
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
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    // console.log(signup)
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            //sendData();
            navigate("/registerForm");
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    }

    return (
        <Container>
            <Row className='first-display-card'>
                <Col className='green'>
                    <h2 className='text-center mb-4'>New account</h2>
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
                            Register
                        </Button>
                    </Form>


                    <div className='w-100 text-center mt-2' id='login-check'>
                        Already have an account? <Link to='/login'><Button variant="link">Sign In</Button></Link>
                    </div>
                </Col>
                {/* <Col className='img-container'><Image className="background-img" src={backgroundImg} /></Col> */}
            </Row>

        </Container>
    );
}