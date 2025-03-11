import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import { Row, Col, Card, Pagination, Container } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";

const PER_PAGE = 12; // total number of artworks in every page

export default function Artwork() { // creates the artwork page with artwork cards
    const [artworkList, setArtworkList] = useState(null);
    const [page, setPage] = useState(1);
    const router = useRouter();
    let finalQuery = router.asPath.split("?")[1]; // extracts query string
    const { data, error } = useSWR(finalQuery ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}` : null);
    const previousPage = () => { 
        if (page > 1) setPage((prev) => prev - 1); 
    };
    const nextPage = () => { 
        if (page < artworkList.length) setPage((prev) => prev + 1); 
    };
    
    useEffect(() => {
        setArtworkList(null); // clear prior query results
        if (data?.objectIDs) {
            let results = [];
            for (let i = 0; i < data.objectIDs.length; i += PER_PAGE) {
                const chunk = data.objectIDs.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
            setPage(1);
        } else {
            setArtworkList([]); // if nothing found sets results to null
        }
    }, [data]);

    if (error) return <Error statusCode={404} />;   // Error guard, displays the 404 error to end users
    if (!artworkList || artworkList.length === 0) { // null results triggers this error guard
        return (
            <Container>
                <br />
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <h4>Nothing Here</h4>
                            <p>Try searching for something else.</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container>
            <br/>
            <Row className="gy-4">
                {artworkList[page - 1].map((currentObjectID) => (
                    <Col lg={3} key={currentObjectID}>
                        <ArtworkCard objectID={currentObjectID} />
                    </Col>
                ))}
            </Row>
            <Row className="mt-4">
                <Pagination>
                    <Pagination.Prev onClick={previousPage} disabled={page === 1} />
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage} disabled={page === artworkList.length} />
                </Pagination>
            </Row>
        </Container>
    );
};
