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
import { Card } from "react-bootstrap";


/********************************************************************************
*   Page Header component
*   Provides a header for the page, along with a box and some text formating
********************************************************************************/
export default function PageHeader({ text }) {
    return (
        <>
            <Card className="bg-light">
                <Card.Body>
                    <strong>{ text }</strong>
                </Card.Body>
            </Card>
            <br/>
        </>
    );
};
