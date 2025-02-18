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
import { Card } from "react-bootstrap";
import MovieDetails from "@/components/MovieDetails";
import PageHeader from "@/components/PageHeader";

// Fetching movie data during build time, using a fixed movie title to capture a single movie
export async function getStaticProps() {
    const baseURL = `https://web-assignment1-ceb6.vercel.app/api/movies`;
    const title = "Dark City";
    const url = `${baseURL}?page=1&perPage=10&title=${encodeURIComponent(title)}`;
    const data = (await fetch(url)).json();
    if (title && (!data || data.length === 0)) {
        console.log(`No results found. Something went wrong!!`);
        return { notFound: true };
    }
    return { props: { movie: data[0] || null, title } };
};



export default function About(props) {
    const { movie, title } = props;
    return (
        <>
            <PageHeader text="About the Developer - Nilrudra Mukhopadhyay"/>
            <Card className="bg-light">
                <Card.Body>
                    <p>
                        Hello! I'm Nilrudra Mukhopadhyay, a passionate programmer with a focus on modern data management and application developement. 
                        I love building intuitive and performant applications. In my free time, I enjoy playing video games, watching sports, and traveling.
                    </p>
                    <p>
                        One of my favorite movies is available on our dataset:
                        <Link href={`/movies/${title}`} passHref legacyBehavior>
                            <a>{title}</a>
                        </Link>
                    </p>
                </Card.Body>
                {movie && <MovieDetails movie={movie}/>}
            </Card>
            <br/>
        </>
    );
};
