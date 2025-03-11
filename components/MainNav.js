import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';

// Main navbar component with search bar functionality and value extraction from the search bar
export default function MainNav() {
    const [searchField, setSearchField] = useState('');
    const router = useRouter();
    const handleSubmit = (event) => {
        event.preventDefault();   // stops page from refreshing
        if (searchField.trim()) { // extract search input, trim, and apply to the API url
            router.push(`/artwork?title=true&q=${encodeURIComponent(searchField.trim())}`);
            setSearchField('');   // sets the search bar back to blank
        }
    };

    return (
        <>  {/* navbar with inline styling, changing the color of navbar background to a dark gray */}
            <Navbar expand="lg" className="fixed-top navbar-dark navbar-expand-lg py-3" style={{ backgroundColor: "#2A3B55" }}>
                <Container>
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
                            {/* inline styling to change the button to a light teal color */}
                            <Button type="submit" variant="success" style={{ backgroundColor: "#39B8B8" }}>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/>
            <br/>
        </>
    );
};
