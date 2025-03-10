import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
    return (
        <>  {/* home page with css, image, text content from the museum, and page html formatting */}
            <Container>
                <Row> {/* image container, upper portion of the homepage */}
                    <Col>
                        <Image 
                            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" 
                            alt="MET Building"
                            className="img-fluid rounded"
                            width={1500}    // width
                            height={850}    // height
                        />
                        <br />
                        <br />
                    </Col>
                </Row>
                <Row> {/* text container lower portion of the homepage */}
                    <Col lg-6> {/* right side text container */}
                        <p>
                            The Metropolitan Museum of Art of New York City, colloquially "the Met", is the largest art museum in the Americas. Its permanent 
                            collection contains over two million works, divided among 17 curatorial departments. The main building is at 1000 Fifth Avenue, along 
                            the Museum Mile on the eastern edge of Central Park on Manhattan's Upper East Side, is by area one of the world's largest art museums. 
                            A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, 
                            architecture, and artifacts from medieval Europe.
                        </p>
                        <p>
                            The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum's 
                            permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the 
                            European masters, and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, 
                            Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments, costumes, accessories, antique weapons, 
                            and armor from around the world. Ranging from 1st-century Rome to modern American designs, installed within the galleries.
                        </p>
                    </Col>
                    <Col lg-6> {/* left side text container, also contains the link to the wiki article about the museum */}
                        <p>
                            The Fifth Avenue building opened on March 30, 1880. In 2021, despite the COVID-19 pandemic in New York City, 
                            the museum attracted 1,958,000 visitors, ranking fourth on the list of most-visited art museums in the world.
                        </p>
                        <p>
                            Museum link:{'  '}
                            <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">
                                https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art
                            </a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
