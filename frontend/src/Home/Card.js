import React from "react";
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./Home.css";

function BasicExample(props) {
    return (
        <Card style={{ width: '20vw', borderRadius: '25px' }}>
            <Card.Img className="card-img" variant="top" style={{ borderRadius: '25px' }} src={props.img} />
            <Card.Body>
                <Card.Title style={{ fontWeight: '700' }}>{props.title}</Card.Title>
                <Card.Text className="card-text">{props.desc}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default BasicExample;