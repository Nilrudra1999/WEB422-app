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
import { Container, Row, Col } from "react-bootstrap";


/********************************************************************************
*   Movie Details component
*   Provides various movie details for the movie object passed to the component
*   Renders the poster and the formated details of the movie onto a container
********************************************************************************/
export default function MovieDetails({ movie }) {
    if (!movie) { return <p>No movie data available.</p>; }
    return (
        <Container>
            <Row>
                {movie.poster && (
                    <Col md>
                        <img src={movie.poster} alt="Movie Poster" className="img-fluid w-100" />
                        <br/><br/>
                    </Col>
                )}
                <Col md>
                    <strong>Directed By: </strong>{movie.directors?.join(", ")}<br/><br/>
                    <p>{movie.fullplot || "No plot available."}</p>
                    <strong>Cast: </strong>{movie.cast?.length ? movie.cast.join(", ") : "N/A"}<br/><br/>
                    <strong>Awards: </strong>{movie.awards?.text || "No awards information available."}<br/>
                    <strong>IMDB Rating: </strong>{movie.imdb?.rating || "N/A"} ({movie.imdb?.votes || "0"} votes)
                </Col>
            </Row>
        </Container>
    );
};
