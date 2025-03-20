/*********************************************************************************
*  WEB422 – Assignment 5
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay   Student ID: 134061175   Date: 03/25/2025
*
*
********************************************************************************/ 
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

// Main navbar component with search bar functionality and value extraction from the search bar
export default function MainNav() {
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false); // controls navbar expansion
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // Access to the search history state
    const handleSubmit = (event) => {
        event.preventDefault();   // stops page from refreshing
        if (searchField.trim()) { // extract search input, trim, and apply to the API url
            const queryString = `title=true&q=${encodeURIComponent(searchField.trim())}`;
            setSearchHistory((current) => [...current, queryString]);
            router.push(`/artwork?title=true&q=${encodeURIComponent(searchField.trim())}`);
            setSearchField('');   // sets the search bar back to blank
            setIsExpanded(false); // Close navbar on search
        }
    };

    const handleNavClick = () => {
        setIsExpanded(false);
    };

    const toggleNavbar = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <>  {/* navbar with inline styling, changing the color of navbar background to a dark gray */}
            <Navbar expanded={isExpanded} expand="lg" className="fixed-top navbar-dark navbar-expand-lg py-3" style={{ backgroundColor: "#2A3B55" }}>
                <Container>
                    <Navbar.Brand>Nilrudra Mukhopadhyay</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" onClick={toggleNavbar} />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link href="/" legacyBehavior passHref>
                                <Nav.Link active={router.pathname === "/"} onClick={handleNavClick}>Home</Nav.Link>
                            </Link>
                            <Link href="/search" legacyBehavior passHref>
                                <Nav.Link active={router.pathname === "/search"} onClick={handleNavClick}>Advanced Search</Nav.Link>
                            </Link>
                        </Nav>
                        &nbsp;
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
                        &nbsp;
                        <Nav> {/* User Name Dropdown with Favourites */}
                            <NavDropdown title="Nilrudra Mukhopadhyay" id="user-dropdown">
                                <Link href="/favourites" legacyBehavior passHref>
                                    <NavDropdown.Item active={router.pathname === "/favourites"} onClick={handleNavClick}>+ favourite</NavDropdown.Item>
                                </Link>
                                <Link href="/history" legacyBehavior passHref>
                                    <NavDropdown.Item active={router.pathname === "/history"} onClick={handleNavClick}>Search History</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
};
