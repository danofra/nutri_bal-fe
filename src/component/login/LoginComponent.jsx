import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { login } from "../../data/login";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function LoginComponent() {
  const [show, setShow] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowSuccessModal(false);
    setShowErrorModal(false);
    setError(null);

    try {
      await login(email, password);
      setShowSuccessModal(true);
      handleClose();
    } catch (err) {
      setError(err.message);
      setShowErrorModal(true);
      handleClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Successo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Accesso effettuato con successo!</Modal.Body>
      </Modal>

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton className="modal-header-error">
          <Modal.Title>Errore</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
      </Modal>

      <Nav onClick={handleShow} id="pm-none">
        <h1>
          <i className="bi bi-person-circle"></i>
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
          <Row className="w-100 d-flex justify-content-center">
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <>
                <Row className="w-100">
                  <Button
                    className="custom-button-primary me-2"
                    onClick={handleSubmit}
                  >
                    Accedi
                  </Button>
                </Row>
                <Row className="w-100 mt-2">
                  <Button
                    className="custom-button-secondary"
                    onClick={handleClose}
                  >
                    Esci
                  </Button>
                </Row>
              </>
            )}
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginComponent;
