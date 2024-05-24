/* IMPORT REACT BOOTSTRAP */
import { Container, Navbar, Nav } from "react-bootstrap";

function ContactnavComponent() {
  return (
    <Navbar id="navbar" data-bs-theme="dark">
      <Container className="d-flex justify-content-evenly align-items-center">
        <Nav>
          <Nav.Link href="https://github.com/danofra" className="text-white">
            <h4>
              <i className="bi bi-github"></i>
            </h4>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            href="https://www.linkedin.com/in/dano-fra/"
            className="text-white"
          >
            <h4>
              <i className="bi bi-linkedin"></i>
            </h4>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            href="https://it.pinterest.com/dano_fra/"
            className="text-white"
          >
            <h4>
              <i className="bi bi-pinterest"></i>
            </h4>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default ContactnavComponent;
