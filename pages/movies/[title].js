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
import Error from 'next/error';
import MovieDetails from '@/components/MovieDetails';
import PageHeader from '@/components/PageHeader';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Title() {
    const { query } = useRouter();
    const { title } = query;
    if (!title) return null;
    const { movie, error } = useSWR(
        `https://your-cyclic-app-url/api/movies?page=1&perPage=10&title=${encodeURIComponent(title)}`, 
        fetcher 
    );
    if (error) { return <Error statusCode={500}/>; }
    if (movie.length === 0) { return <Error statusCode={404}/>; }

    return (
        <div key={movie._id}>
            <PageHeader>{movie.title}</PageHeader>
            <MovieDetails movie={movie}/>
        </div>
    );
};
