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
  const [showPutModal, setShowPutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    setShowPutModal(false);
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

  /* FUNCTION CATEGORY */

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setMenuOpen(false);
    } else {
      setSelectedCategory(category);
      setMenuOpen(true);
    }
  };

  const groupedItems = items.reduce((acc, item) => {
    const category = item.product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  /* CLOSE MODAL */

  const handleClosePutModal = () => {
    setShowPutModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Container>
        <Row className="mt-3">
          <h3 className="text-center">Dispensa</h3>
          <Col style={{ height: "651px", overflowY: "scroll" }}>
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" className="spinner" />
              </div>
            ) : (
              <>
                {Object.keys(groupedItems).length === 0 ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <p>Nessun prodotto nella tua dispensa</p>
                  </div>
                ) : (
                  Object.keys(groupedItems).map((category) => (
                    <Card key={category} className="mt-3 footstorage-container">
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <Card.Title
                          className="mt-3"
                          onClick={() => handleCategoryClick(category)}
                          style={{ cursor: "pointer" }}
                        >
                          {category}
                          {selectedCategory === category && menuOpen && (
                            <i className={`bi bi-caret-down-fill`}></i>
                          )}
                          {(selectedCategory !== category || !menuOpen) && (
                            <i className={`bi bi-caret-right-fill`}></i>
                          )}
                        </Card.Title>
                      </Card.Body>
                      {selectedCategory === category &&
                        groupedItems[category].map((item) => (
                          <>
                            <Container className="mb-2">
                              <Card key={item.id} className="mb-1">
                                <Card.Body className="d-flex justify-content-between align-items-center">
                                  <Card.Title>{item.product.name}</Card.Title>
                                  <Card.Subtitle className="mb-2 text-muted">
                                    Kcal: {item.product.kcal}
                                  </Card.Subtitle>
                                </Card.Body>
                                <Card.Footer>
                                  <Row className="d-flex justify-content-between align-items-center">
                                    <Col>Quantità: {item.quantity}</Col>
                                    <Col className="d-flex justify-content-end">
                                      <Button
                                        className="me-2 custom-button-primary"
                                        onClick={() => {
                                          setShowPutModal(true);
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
                                        <i className="bi bi-trash"></i>
                                      </Button>
                                    </Col>
                                  </Row>
                                </Card.Footer>
                              </Card>
                            </Container>
                          </>
                        ))}
                    </Card>
                  ))
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>

      {/* MODAL DELETE */}

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton className="modal-header-error">
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
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL PUT */}

      <Modal show={showPutModal} onHide={handleClosePutModal}>
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
            onClick={handleClosePutModal}
          >
            Annulla
          </Button>
          <Button
            className="custom-button-primary"
            onClick={handleEditQuantity}
          >
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FoodstorageComponent;
