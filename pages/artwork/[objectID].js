import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";
import ArtworkCardDetail from "@/components/ArtworkCardDetail";

export default function ArtworkById() {
    const router = useRouter();
    const { objectID } = router.query; // extracts the objectID from the URL passed
    return (
        <>
            <br />
            <Row>
                <Col>
                    {objectID && <ArtworkCardDetail objectID={objectID} />}
                </Col>
            </Row>
        </>
    );
};
