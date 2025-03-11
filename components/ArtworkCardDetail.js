import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';

const fetcher = (url) => fetch(url).then((res) => res.json()); // fetcher function for SWR

export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);
    // Error guard statements, for null values, and other errors
    if (error) { return <Error statusCode={404} />; }
    if (!data) { return null; }

    const { primaryImage, title, objectDate, classification, medium, artistDisplayName, creditLine, dimensions, artistWikidata_URL } = data;
    const placeholderImage = 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'; // fallback url

    return (
        <Card> {/* renders the Card.Img only if and when the primaryImage value exists */}
            {primaryImage && <Card.Img variant="top" src={primaryImage} alt={title || 'N/A'} />}
            <Card.Body>
                <Card.Title>{title || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {objectDate || 'N/A'}<br/>
                    <strong>Classification:</strong> {classification || 'N/A'}<br/>
                    <strong>Medium:</strong> {medium || 'N/A'}
                    <br /><br/>
                    {/* renders artist's name but doesn't render the url to the wiki page if it doesn't exist */}
                    <strong>Artist:</strong> {artistDisplayName ? (
                        <>
                            {artistDisplayName}
                            {artistWikidata_URL && (
                                <> <a href={artistWikidata_URL} target="_blank" rel="noreferrer">(wiki)</a></>
                            )}
                        </>
                    ) : 'N/A'}<br/>
                    <strong>Credit Line:</strong> {creditLine || 'N/A'}<br/>
                    <strong>Dimensions:</strong> {dimensions || 'N/A'}<br/>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
