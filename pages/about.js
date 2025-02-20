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
import Link from "next/link";
import { Card, Container } from "react-bootstrap";
import MovieDetails from "@/components/MovieDetails";
import PageHeader from "@/components/PageHeader";


/********************************************************************************
*   Overloaded getStaticProps() method, used to fetch movie data from the API
*   Fetches movie data during build time, using a fixed movie title to capture a single movie's details
********************************************************************************/
export async function getStaticProps() {
    const title = "Dark City";
    const url = `https://web-assignment1-ceb6.vercel.app/api/movies?page=1&perPage=10&title=${encodeURIComponent(title)}`;
    const data = await fetch(url).then(res => res.json());
    if (!data || data.length === 0) {
        console.log(`No results found. Something went wrong!!`);
        return { notFound: true };
    }
    return { props: { movie: data[0], title } };
};


/********************************************************************************
*   About page
*   Fetches a single movie's data from the API during load time of the page
*   Renders the about text and movie details fetched using a static prop method
********************************************************************************/
export default function About(props) {
    const { movie, title } = props;
    return (
        <>
            <Container>
                <PageHeader text="About the Developer - Nilrudra Mukhopadhyay"/>
                <Card className="bg-light">
                    <Card.Body>
                        <p>
                            Hello! I'm Nilrudra Mukhopadhyay, a passionate programmer with a focus on modern data management and application developement. 
                            I love building intuitive and performance oriented applications. In my free time, I enjoy playing video games, watching sports, and traveling.
                        </p>
                        <p>
                            During the duration of this course, I hope to achieve a deeper understanding of modern web development practices, improve my 
                            ability to write clean and efficient code, and gain a hands-on experience with real-world projects. I also aim to enhance my problem-solving 
                            skills and build a website that can add to my portfolio of work that showcases my progress. Additionally, I look forward to learning 
                            best practices for debugging, optimizing performance, and deploying applications successfully.
                        </p>
                        <p>
                            One of my favorite movies of all time, is available on our dataset:
                            <Link href={`/movies/${title}`} passHref legacyBehavior>
                                <a style={{marginLeft: '5px'}}>{title}</a>
                            </Link>
                        </p>
                        <br/>
                        <MovieDetails movie={movie}/>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};
