/*********************************************************************************
*  WEB422 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay Student ID: 134061175 Date: 01/02/2025
*  Vercel API Link: https://web-assignment1-ceb6.vercel.app/api/movies
*  Vercel App Link:
*
********************************************************************************/
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from "next/link";


/********************************************************************************
*   MainNav component
*   Provides a templated navbar for all pages of the web application with links
********************************************************************************/
export default function MainNav() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className='fixed-top'>
                <Container>
                    <Navbar.Brand>Nilrudra Mukhopadhyay</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link href="/" passHref legacyBehavior><Nav.Link>Movies</Nav.Link></Link>
                        <Link href="/about" passHref legacyBehavior><Nav.Link>About</Nav.Link></Link>
                    </Nav>
                </Container>
            </Navbar>
            <br/>
            <br/>
        </>
    );
};
