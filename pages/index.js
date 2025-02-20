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
import { useState, useEffect } from 'react';
import { Pagination, Accordion, Container } from 'react-bootstrap';
import MovieDetails from '@/components/MovieDetails';
import PageHeader from '@/components/PageHeader';
const fetcher = (url) => fetch(url).then((res) => res.json());


/********************************************************************************
*   Homepage
*   Fetches the movie data from an API endpoint and sets the page number 
*   Also sets Pagination feature and renders list of movies inside an Accordion
********************************************************************************/
export default function Home() {
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState([]);
    const { data } = useSWR( `https://web-assignment1-ceb6.vercel.app/api/movies?page=${page}&perPage=10`, fetcher );

    useEffect(() => { setPageData(data) }, [data]);
    const previous = () => { if (page > 1) { setPage(page - 1); } };
    const next = () => { if (page < 10) { setPage(page + 1); } };

    return (
        <>  
            <Container>
                <PageHeader text="Film Collection : Sorted by Date" />
                <br/>
                <Accordion>
                    {pageData?.length > 0 &&
                        pageData.map((movie) => (
                            <Accordion.Item key={movie._id} eventKey={movie._id}>
                                <Accordion.Header>
                                    {/* Added space between the title and the year of the movie using style, couldn't find another way */}
                                    <strong style={{ marginRight: '5px'}}>{movie.title}</strong> ({movie.year}) - {movie.directors.join(', ')}
                                </Accordion.Header>
                                <Accordion.Body>    {/* Drops down to reveal the movie details */}
                                    <MovieDetails movie={movie}/>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                </Accordion>
                <br/>
                <Pagination> {/* The user can scroll through a max of 10 pages by design */}
                    <Pagination.Prev onClick={previous} disabled={page === 1}/>
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={next} disabled={page === 10}/>
                </Pagination>
            </Container>
        </>
    );
};
