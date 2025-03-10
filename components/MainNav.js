import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function MainNav() {
    const [searchField, setSearchField] = useState('');
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchField.trim()) {
            router.push(`/artwork?title=true&q=${encodeURIComponent(searchField)}`);
        }
    };

    return (
        <>
            <Navbar expand="lg" className="navbar-dark fixed-top" style={{ backgroundColor: "#2A3B55" }}>
                <Container fluid>
                    <Navbar.Brand>Nilrudra Mukhopadhyay</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link href="/" legacyBehavior passHref>
                                <Nav.Link>Home</Nav.Link>
                            </Link>
                            <Link href="/search" legacyBehavior passHref>
                                <Nav.Link>Advanced Search</Nav.Link>
                            </Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchField}
                                onChange={(e) => setSearchField(e.target.value)}
                            />
                            <Button type="submit" variant="success" style={{ backgroundColor: "#5ccf65" }}>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/>
            <br/>
        </>
    );
};
