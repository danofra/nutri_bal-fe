import {
  Container,
  Form,
  Row,
  Col,
  Button,
  FormCheck,
  Modal,
  Spinner,
} from "react-bootstrap";
import { singin } from "../../data/singin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "./LoginComponent";

function SinginComponent() {
  const initialState = {
    name: "",
    surname: "",
    email: "",
    password: "",
    date_of_birth: "",
    gender: "",
    physical_activity: "",
    nationality: "",
    city_of_residence: "",
    robot: false,
  };

  const [formData, setFormData] = useState(initialState);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowSuccessModal(false);
    setShowErrorModal(false);
    setError(null);

    try {
      await singin(
        formData.name,
        formData.surname,
        formData.email,
        formData.password,
        formData.date_of_birth,
        formData.gender.toUpperCase(),
        formData.physical_activity.toUpperCase(),
        formData.nationality,
        formData.city_of_residence,
        formData.robot
      );
      setFormData(initialState);
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  const handleErrorModal = () => {
    setShowErrorModal(false);
    navigate("/");
  };

  return (
    <>
      <Modal show={showSuccessModal} onHide={handleSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Successo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Registrazione avvenuta con successo!
          <LoginComponent />
        </Modal.Body>
      </Modal>

      <Modal show={showErrorModal} onHide={handleErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Errore</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
      </Modal>

      <Container className="mt-5 singin-container">
        <div className="text-center">
          <h2>Registrazione</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row className="mt-5">
            <Form.Group as={Col} controlId="name">
              <Form.Label>Nome*:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Inserisci il tuo nome"
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="surname">
              <Form.Label>Cognome*:</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Inserisci il tuo cognome"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col} controlId="email">
              <Form.Label>Email*:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Inserisci la tua email"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col} controlId="password">
              <Form.Label>Password*:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Inserisci la tua password"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col} controlId="date_of_birth">
              <Form.Label>Data di nascita*:</Form.Label>
              <Form.Control
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                placeholder="Inserisci la tua età"
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="gender">
              <Form.Label>Genere*:</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Inserisci la tua età"
                required
              >
                <option value="">Seleziona il tuo genere</option>
                <option value="male">Maschio</option>
                <option value="female">Femmina</option>
                <option value="other">Altro</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col} controlId="physical_activity">
              <Form.Label>Attività fisica*:</Form.Label>
              <Form.Control
                as="select"
                name="physical_activity"
                value={formData.physical_activity}
                onChange={handleChange}
                placeholder="Inserisci la tua attività fisica"
                required
              >
                <option value="">Seleziona il livello di attività</option>
                <option value="sedentary">Sedentario</option>
                <option value="moderately_Active">Moderatamente Attivo</option>
                <option value="active">Attivo</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col} controlId="nationality">
              <Form.Label>Nazionalità:</Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="Inserisci il tuo nazionalità"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="city_of_residence">
              <Form.Label>Comune di residenza:</Form.Label>
              <Form.Control
                type="text"
                name="city_of_residence"
                value={formData.city_of_residence}
                onChange={handleChange}
                placeholder="Inserisci il tuo comune di residenza"
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col} controlId="robot">
              <FormCheck
                type="checkbox"
                name="robot"
                label="No! Non sono un robot"
                checked={formData.robot}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mt-3 w-75 mx-auto d-flex justify-content-center">
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="success" />
              </div>
            ) : (
              <Button
                className="custom-button-primary text-center mt-3"
                type="submit"
                onClick={handleSubmit}
              >
                Registrati
              </Button>
            )}
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default SinginComponent;
