
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import "./Home.css";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


export default function Home() {
    return (
        <>

            <Container>
                <Row className='first-display-card'>
                    <Col className='green'>
                        <Row className='item title'>SdaerDoog</Row>
                        <Row className='item desc'>You can never get a cup of tea large enough or a book long enough to suit me.</Row>
                        <Row className='item'><Col className='buttons'> <Link to='/signup'><Button variant="light">Sign Up</Button>  </Link> <Link to='/login'><Button variant="link">Sign In</Button></Link></Col><Col></Col></Row>
                    </Col>
                    {/* <Col className='img-container'><Image className="background-img" src={backgroundImg} /></Col> */}
                </Row>
            </Container>
        </>

    );
}