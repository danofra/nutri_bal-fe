import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

function LoginComponent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Nav onClick={handleShow} id="pm-none">
        <h1>
          <i className="bi bi-person-circle me-2"></i>
        </h1>
      </Nav>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Accedi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="LoginComponentForm.ControlInput1"
            >
              <Form.Label>Indirizzo Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci la tua email"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="LoginComponentForm.ControlInput2"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci la tua passaword"
                autoFocus
                required
              />
            </Form.Group>
            <div className="text-center">
              <p>
                Non fai ancora parte della nostra community? {""}
                <Link to="/singin" className="text-muted" onClick={handleClose}>
                  Registrati.
                </Link>
              </p>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Row className="w-100">
            <Button className="custom-button-primary" onClick={handleClose}>
              Accedi
            </Button>
          </Row>
          <Row className="w-100">
            <Button className="custom-button-secondary" onClick={handleClose}>
              Esci
            </Button>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginComponent;
