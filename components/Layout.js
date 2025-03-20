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
import Container from 'react-bootstrap/Container';
import MainNav from './MainNav';

// app page layout, main navbar at the top, then page content
// organized using components
export default function Layout({ children }) {
    return (
        <>
            <MainNav />
            <br />
            <Container>
                {children}
            </Container>
            <br />
        </>
    );
};
