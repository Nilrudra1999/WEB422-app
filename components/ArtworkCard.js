/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay   Student ID: 134061175   Date: 04/07/2025
*
********************************************************************************/
import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';

const fetcher = (url) => fetch(url).then((res) => res.json()); // fetcher function for SWR

export default function ArtworkCard({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);
    // Error guard statements, for null values, and other errors
    if (error) { return <Error statusCode={404} />; }
    if (!data) { return null; }

    const { primaryImageSmall, title, objectDate, classification, medium } = data;
    const placeholderImage = 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'; // fallback

    return (
        <Card style={{ width: '18rem' }}> {/* Artwork card component */}
            {primaryImageSmall && ( // Only render the image if available
                <Card.Img
                    variant="top"
                    src={primaryImageSmall || placeholderImage}
                    alt={title || 'N/A'}
                />
            )}
            <Card.Body> {/* if a card's data is doesn't exist then it doesn't get render, instead 'NA' is rendered as placeholder */}
                <Card.Title>{title || 'N/A'}</Card.Title>
                <Card.Text>
                    <p>Object Date: {objectDate || 'N/A'}</p>
                    <p>Classification: {classification || 'N/A'}</p>
                    <p>Medium: {medium || 'N/A'}</p>
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref>
                    <Button variant="primary">View {objectID}</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};
