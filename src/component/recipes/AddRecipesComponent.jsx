import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { recipesPost } from "../../data/menu/recipes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddRecipesComponent() {
  const initialState = {
    image: "",
    name: "",
    difficulty: "",
    preparationtime: "",
    cooking: "",
    doses: "",
    cost: "",
    note: "",
    preparation: "",
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

  const handleNoteChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      preparation: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowSuccessModal(false);
    setShowErrorModal(false);
    setError(null);

    try {
      await recipesPost(
        formData.image,
        formData.name,
        formData.difficulty,
        formData.preparationtime,
        formData.cooking,
        formData.doses,
        formData.cost,
        formData.note,
        formData.preparation
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

  const modules = {
    toolbar: [
      [
        { header: "1" },
        { header: "2" },
        { font: ["sans-serif", "monospace", "calibri"] },
      ],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "list",
    "bullet",
    "bold",
    "italic",
    "underline",
    "align",
  ];

  return (
    <>
      <Modal show={showSuccessModal} onHide={handleSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Successo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Registrazione avvenuta con successo!</Modal.Body>
      </Modal>

      <Modal show={showErrorModal} onHide={handleErrorModal}>
        <Modal.Header closeButton className="modal-header-error">
          <Modal.Title>Errore</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
      </Modal>

      <Container className="mt-5 log-container">
        <div className="text-center">
          <h2>Aggiungi nuova diretta</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row className="mt-5">
            <Col>
              <Form.Group controlId="image">
                <Form.Label>Inserisci immagine della ricetta</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="name">
                <Form.Label>Nome della ricetta*:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Inserisci il nome della ricetta"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Group controlId="difficulty">
                <Form.Label>Difficoltà*:</Form.Label>
                <Form.Control
                  type="text"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  placeholder="Inserisci la difficoltà"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="doses">
                <Form.Label>Dosi per*:</Form.Label>
                <Form.Control
                  type="text"
                  name="doses"
                  value={formData.doses}
                  onChange={handleChange}
                  placeholder="Inserisci la dose per quante persone"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="cost">
                <Form.Label>Costo*:</Form.Label>
                <Form.Control
                  type="text"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  placeholder="Inserisci il costo"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group controlId="preparationtime">
                <Form.Label>Tempo di preparazione*:</Form.Label>
                <Form.Control
                  type="text"
                  name="preparationtime"
                  value={formData.preparationtime}
                  onChange={handleChange}
                  placeholder="Inserisci il tempo di preparazione"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="cooking">
                <Form.Label>Cottura*:</Form.Label>
                <Form.Control
                  type="text"
                  name="cooking"
                  value={formData.cooking}
                  onChange={handleChange}
                  placeholder="Inserisci il tempo di cottura"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group controlId="note">
                <Form.Label>Note:</Form.Label>
                <Form.Control
                  type="text"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Inserisci le note"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group controlId="preparation">
                <Form.Label>Preparazione*:</Form.Label>
                <ReactQuill
                  className="custom-quill"
                  value={formData.preparation}
                  onChange={handleNoteChange}
                  placeholder="Inserisci la preparazione"
                  modules={modules}
                  formats={formats}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3 w-75 mx-auto d-flex justify-content-center">
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" className="spinner" />
              </div>
            ) : (
              <Button
                className="custom-button-primary text-center mt-3"
                type="submit"
                onClick={handleSubmit}
              >
                Aggiungi ricetta
              </Button>
            )}
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default AddRecipesComponent;
