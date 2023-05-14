import { TbBooks } from "react-icons/tb"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from "../contexts/AuthContexts";
import { auth } from "../firebase";
import "./Navbar.css"

function BasicExample() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    var authButton = (user) => {
        if (user != null) {
            return (
                <Nav>
                    <Nav.Link href="/profile">My profile</Nav.Link>
                    <Nav.Link href="/books">My books</Nav.Link>

                    <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                </Nav>
            );
        } else
            return (
                <>
                    <Nav>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Register</Nav.Link>
                    </Nav>
                </>
            );
    };
    async function handleLogout() {
        await logout();
        navigate("/")
    }

    return (
        <Navbar className='nav' >
            <Container >
                <Navbar.Brand href="/">DigiMed</Navbar.Brand>

                {authButton(auth.currentUser)}

            </Container>
        </Navbar>
    );
}

export default BasicExample;