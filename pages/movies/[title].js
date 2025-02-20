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
import useSWR from 'swr';
import { useRouter } from 'next/router';
import MovieDetails from '@/components/MovieDetails';
import PageHeader from '@/components/PageHeader';
import { Card, Container } from 'react-bootstrap';
import Error from 'next/error';
const fetcher = (url) => fetch(url).then((res) => res.json());


/********************************************************************************
*   Movie Details [Title] page 
*   Fetches the movie data from the API endpoint for a single movie using title
*   If the title matches multiple movies, then the page displays all of them
********************************************************************************/
export default function Title() {
    const { query } = useRouter();
    const { title } = query;

    if (!title) return null;
    const { data, error } = useSWR(
        `https://web-assignment1-ceb6.vercel.app/api/movies?page=1&perPage=10&title=${encodeURIComponent(title)}`, 
        fetcher 
    );
    if (error) return <Error statusCode={500}/>;
    if (!data) return null;
    if (data.length === 0) return <Error statusCode={404} />;

    return (
        <>
            <Container>
                {/* -------------------------------------------------------------------------------------------
                    Some alternatives to using a map for capturing and displaying 1 or more movies is:
                    - Using a for-loop and an array, pushing each movie found into array and dislaying that
                    - Or using the .reduce() method which can do the same functions as a map
                    - Or using .forEach() with useMemo from react 

                    I found the map the simplest to implement so thats why I'd rather use this 
                ------------------------------------------------------------------------------------------- */}
                {data.map((movie) => (
                    <div key={movie._id}>
                        <PageHeader text={movie.title} />
                        <Card className="bg-light">
                            <Card.Body>
                                <MovieDetails movie={movie} />
                            </Card.Body>
                        </Card>
                        <br/>
                    </div>
                ))}
            </Container>
        </>
    );
};
