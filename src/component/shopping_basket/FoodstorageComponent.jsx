import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import {
  foodStorageGet,
  foodStoragePut,
  foodStorageDelete,
} from "../../data/shopping_basket/foodStorage";

function FoodstorageComponent() {
  const [items, setItems] = useState([]);
  const [newEditName, setNewEditName] = useState("");
  const [newEditQuantity, setNewEditQuantity] = useState(0);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showPatchModal, setShowPatchModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* FETCH GET */

  useEffect(() => {
    foodStorageGet()
      .then((data) => {
        setItems(data.content);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food storage:", error);
        setIsLoading(false);
      });
  }, []);

  /* FETCH PUT */

  const handleEditQuantity = () => {
    foodStoragePut(newEditQuantity, newEditName)
      .then((data) => {
        setItems(data.content);
      })
      .catch((error) => {
        console.error("Error fetching food storage:", error);
      });
    setShowPatchModal(false);
  };

  /* FETCH DELETE */

  const handleDeleteItem = () => {
    foodStorageDelete(deleteItem)
      .then((data) => {
        setItems(data.content);
      })
      .catch((error) => {
        console.error("Error fetching food storage:", error);
      });
    setShowDeleteModal(false);
  };

  /* CLOSE MODAL */
  const handleClosePatchModal = () => {
    setShowPatchModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Container>
        <Row className="mt-3">
          <h3 className="text-center">Dispensa</h3>
          <Col>
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" className="spinner" />
              </div>
            ) : items && items.length > 0 ? (
              items.map((item) => (
                <Card key={item.id} className="mb-1">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <Card.Title>{item.product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Categoria: {item.product.category} - Kcal:{" "}
                      {item.product.kcal}
                    </Card.Subtitle>
                  </Card.Body>
                  <Card.Footer>
                    <Row className="d-flex justify-content-between align-items-center">
                      <Col>Quantità: {item.quantity}</Col>
                      <Col className="d-flex justify-content-end">
                        <Button
                          className="me-2 custom-button-primary"
                          onClick={() => {
                            setShowPatchModal(true);
                            setNewEditName(item.product.name);
                            setNewEditQuantity(item.quantity);
                          }}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                        <Button
                          className="custom-button-secondary"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setDeleteItem(item.product.name);
                          }}
                        >
                          <i className="bi bi-eraser"></i>
                        </Button>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              ))
            ) : (
              <div className="text-center">
                <p>Nessun elemento nel food storage</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* MODAL DELETE */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare l&apos;elemento {deleteItem}{" "}
          selezionato?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="custom-button-secondary"
            onClick={handleCloseDeleteModal}
          >
            Annulla
          </Button>
          <Button className="custom-button-primary" onClick={handleDeleteItem}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL PATCH */}

      <Modal show={showPatchModal} onHide={handleClosePatchModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica quantità</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="number"
            className="form-control"
            value={newEditQuantity}
            onChange={(e) => setNewEditQuantity(parseInt(e.target.value))}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="custom-button-secondary"
            onClick={handleClosePatchModal}
          >
            Annulla
          </Button>
          <Button
            className="custom-button-primary"
            onClick={handleEditQuantity}
          >
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FoodstorageComponent;
