import React from "react";
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";


function BasicExample(props) {
    return (
        <Card style={{ width: '20vw' }}>
            <Card.Img variant="top" src={props.img} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.desc}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default BasicExample;