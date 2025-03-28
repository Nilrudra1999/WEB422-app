/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay   Student ID: 134061175   Date: 04/07/2025
*
********************************************************************************/
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
