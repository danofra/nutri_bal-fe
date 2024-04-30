import { Container, Row, Col } from "react-bootstrap";

function HeroComponet() {
  return (
    <>
      <Container
        id="custom-img"
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <Row>
          <Col className="d-flex flex-column align-items-center justify-content-center">
            <h1>NutriBal</h1>
            <h4>L&apos;app per la tua salute!</h4>
            <p className="text-center">
              Siamo entusiasti di darti il benvenuto nella nostra applicazione
              dedicata alla salute e alla nutrizione. Qui troverai tutte le
              risorse di cui hai bisogno per raggiungere i tuoi obiettivi di
              benessere e alimentazione in modo sano e sostenibile.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default HeroComponet;
