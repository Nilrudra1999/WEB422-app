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
        <>  {/* Artwork card component */}
            <Card style={{ width: '18rem' }}>
                <Card.Img
                    variant="top"
                    src={primaryImageSmall || placeholderImage}
                    alt={title || 'N/A'}
                />
                <Card.Body>
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
        </>
    );
};
