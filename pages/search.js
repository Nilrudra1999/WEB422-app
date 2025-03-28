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
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';

export default function AdvancedSearch() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    const submitForm = async (data) => { // Make function async
        let queryString = ``;
        if (data.searchBy === 'title') {
            queryString += `title=true`;
        } else if (data.searchBy === 'tags') {
            queryString += `tags=true`;
        } else if (data.searchBy === 'artistOrCulture') {
            queryString += `artistOrCulture=true`;
        }
        queryString += `&isOnView=${data.isOnView}`;
        queryString += `&isHighlight=${data.isHighlight}`;
        if (data.geoLocation) queryString += `&geoLocation=${encodeURIComponent(data.geoLocation)}`;
        if (data.medium) queryString += `&medium=${encodeURIComponent(data.medium)}`;
        queryString += `&q=${encodeURIComponent(data.q)}`;
        setSearchHistory(await addToHistory(queryString));
        router.push(`/artwork?${queryString}`);
    };

    return (
        <Container>
            <br />
            <Form onSubmit={handleSubmit(submitForm)}> {/* form is divided into 4 rows with various form components */}
                <Row> {/* First Row: Search Query */}
                    <Form.Group>
                        <Form.Label>Search Query</Form.Label>
                        <Form.Control
                            type="text"
                            {...register("q", { required: true })}
                            className={errors.q ? "is-invalid" : ""}
                        />
                        {errors.q && <div className="invalid-feedback">This field is required</div>}
                    </Form.Group>
                </Row>
                <Row className="mt-3"> {/* Second Row: Search By dropdown list, GeoLocation, and Medium text fields */}
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Search By</Form.Label>
                            <Form.Select {...register("searchBy")}>
                                <option value="title">Title</option>
                                <option value="tags">Tags</option>
                                <option value="artistOrCulture">Artist or Culture</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Geo Location</Form.Label>
                            <Form.Control type="text" {...register("geoLocation")} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), 
                                with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" {...register("medium")} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), 
                                with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3"> {/* Third Row: Checkboxes */}
                    <Col md={4}>
                        <Form.Group>
                            <Form.Check type="checkbox" label="Currently on View" {...register("isOnView")} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check type="checkbox" label="Highlighted" {...register("isHighlight")} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3"> {/* Fourth Row: Submit Button */}
                    <Col>
                        <Button variant="dark" type="submit" style={{ backgroundColor: "#2A3B55" }}>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};
