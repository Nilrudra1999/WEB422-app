/*********************************************************************************
*  WEB422 – Assignment 5
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay   Student ID: 134061175   Date: 03/25/2025
*
*
********************************************************************************/ 
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {
    const [favouritesList] = useAtom(favouritesAtom); // Access to the favourites list

    return (
        <Container>
            <br />
            {favouritesList.length === 0 ? (
                // Display a single card when the list is empty
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <h4>Your Favourite Artworks</h4>
                            <p>Nothing Here. Try adding some new artwork to the list.</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                // Display artwork cards when the list is not empty
                <Row>
                    {favouritesList.map((objectID) => (
                        <Col key={objectID} xs={12} md={4} lg={3} className="mb-4">
                            <ArtworkCard objectID={objectID} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};
