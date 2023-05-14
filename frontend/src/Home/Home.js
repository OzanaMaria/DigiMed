
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import "./Home.css";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ListCard from "./Card";
import teeth from "../images/teeth.png";
import foot from "../images/foot.jpg";
import diagnosis from "../images/diagnostic.jpg";

export default function Home() {
    const cardsInfo = [{ img: teeth, title: "Tratarea dintilor", desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm." },
    { img: foot, title: "Tratarea oaselor", desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm." },
    { img: diagnosis, title: "Diagnostice", desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm." },
    { img: teeth, title: "Cardiologie", desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm." },
    { img: teeth, title: "Operatii", desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm." },
    { img: teeth, title: "Ingrijirea ochilor", desc: "Lorem ipsum dolor sit amet consecte tur adipiscing elit semper dalaracc lacus vel facilisis volutpat est velitolm." }]
    const displayCard = () => cardsInfo.map((item, index) => <ListCard
        key={index}
        img={item.img}
        title={item.title}
        desc={item.desc}
    ></ListCard>);
    return (
        <>
            <Container>
                <Row className='item title'>Servicii</Row>
                <Row className='card-list '>
                    {displayCard()}
                </Row>
            </Container>

        </>

    );
}