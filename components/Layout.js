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
import { Container } from 'react-bootstrap';
import MainNav from './MainNav';


/********************************************************************************
*   Layout component
*   Provides a starting template of sorts for every page of the web application
*   Includes a fixed navbar at the top, and a container to render the page onto 
********************************************************************************/
export default function Layout(props) {
    return (
        <>
            <MainNav />
            <br />
            <Container>
                {props.children}
            </Container>
            <br />
        </>
    );
};
