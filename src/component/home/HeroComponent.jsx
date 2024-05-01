import { Container, Row, Col, Image } from "react-bootstrap";
import logoNutribal from "../../assets/logo-nutri-bal.png";

function HeroComponet() {
  return (
    <>
      <Container
        id="custom-img"
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <Row>
          <Col className="d-flex flex-column align-items-center justify-content-center">
            <Image
              src={logoNutribal}
              alt="logo-nutribal"
              width={400}
              height={400}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default HeroComponet;
