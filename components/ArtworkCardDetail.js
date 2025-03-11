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
        <Card style={{ width: '18rem' }}> {/* renders the Card.Img only if and when the primaryImage value exists */}
            {primaryImage && <Card.Img variant="top" src={primaryImage} alt={title || 'N/A'} />}
            <Card.Body>
                <Card.Title>{title || 'N/A'}</Card.Title>
                <Card.Text>
                    <p>Object Date: {objectDate || 'N/A'}</p>
                    <p>Classification: {classification || 'N/A'}</p>
                    <p>Medium: {medium || 'N/A'}</p>
                    <br />
                    <br />
                    <p>Artist: {artistDisplayName ? <a href={artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a> : 'N/A'}</p>
                    <p>Credit Line: {creditLine || 'N/A'}</p>
                    <p>Dimensions: {dimensions || 'N/A'}</p>
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref>
                    <Button variant="primary">View {objectID}</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};
