import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function AdvancedSearch() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const submitForm = (data) => { // Constructs the url string
        let queryString = ``;      // url string variable init
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
        setSearchHistory(current => [...current, queryString]); // Adds the query result to search history
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
                                Case Sensitive String (ie "Europe", "France", "Paris", "China", "New York", etc.), 
                                with multiple values separated by the | operator
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Medium</Form.Label>
                            <Form.Control type="text" {...register("medium")} />
                            <Form.Text className="text-muted">
                                Case Sensitive String (ie: "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc.), 
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
