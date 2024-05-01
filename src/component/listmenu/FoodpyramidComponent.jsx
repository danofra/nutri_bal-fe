import { Col, Container, Image, Row } from "react-bootstrap";
import food_pyramid from "../../assets/piramide_alimentare.jpeg";

function PiramidealimentareComponent() {
  return (
    <>
      <Container>
        <Row className="pt-3 pb-3">
          <Col className="text-center">
            <h1>Piramide alimentare</h1>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <Image
              src={food_pyramid}
              alt="food_pyramid"
              width={"70%"}
              border="0"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default PiramidealimentareComponent;
