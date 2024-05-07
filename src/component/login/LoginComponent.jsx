import { useState } from "react";
import { Container, Row, Col, Form, Modal, Button } from "react-bootstrap";
import { login } from "../../data/login/login";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function LoginComponent() {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    } catch (err) {
      setError(err.message);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  return (
    <>
      <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
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

      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Accedi</h2>
            <Form>
              <Form.Group className="mb-3" controlId="LoginForm.ControlInput1">
                <Form.Label>Indirizzo Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Inserisci la tua email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="LoginForm.ControlInput2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Inserisci la tua password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="text-center mb-3">
                <p>
                  Non fai ancora parte della nostra community?{" "}
                  <Link to="/singin">Registrati.</Link>
                </p>
              </div>
              <div className="d-grid gap-2">
                {isLoading ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <>
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      className="mb-2"
                    >
                      Accedi
                    </Button>
                    <Button variant="secondary" as={Link} to="/">
                      Esci
                    </Button>
                  </>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginComponent;
