import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Spinner,
  Modal,
} from "react-bootstrap";
import {
  groceryShoppingGet,
  groceryShoppingPost,
  groceryShoppingPut,
  groceryShoppingDelete,
} from "../../data/shopping_basket/shoppinglist";

function ShoppinglistComponent() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newEditName, setNewEditName] = useState("");
  const [newEditQuantity, setNewEditQuantity] = useState(0);
  const [deleteItem, setDeleteItem] = useState(null);
  const [showPatchModal, setShowPatchModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* FETCH GET */

  useEffect(() => {
    groceryShoppingGet()
      .then((data) => {
        setItems(data.content);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food storage:", error);
        setIsLoading(false);
      });
  }, []);

  /* FETCH POST */

  const handleAddItem = () => {
    if (newItemName.trim() !== "") {
      groceryShoppingPost(newItemQuantity, newItemName)
        .then((data) => {
          setItems(data.content);
          return groceryShoppingGet().then((updatedData) => {
            setItems(updatedData.content);
            setNewItemName("");
            setNewItemQuantity(1);
          });
        })
        .catch((error) => {
          console.error("Error adding item to grocery shopping list:", error);
        });
    }
  };

  /* FETCH PATCH */

  const handleEditQuantity = () => {
    groceryShoppingPut(newEditQuantity, newEditName)
      .then((data) => {
        setItems(data.content);
      })
      .catch((error) => {
        console.error("Error fetching updated grocery shopping list:", error);
      });
    setShowPatchModal(false);
  };

  /* FETCH DELETE */

  const handleDeleteItem = () => {
    groceryShoppingDelete(deleteItem)
      .then((data) => {
        setItems(data.content);
      })
      .catch((error) => {
        console.error("Error fetching updated grocery shopping list:", error);
      });
    setShowDeleteModal(false);
  };

  const handleToggleItem = (index) => {
    const updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked;
    setItems(updatedItems);
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
        <Row className="mt-3 flex-column justify-content-center align-items-center">
          <Col className="d-flex justify-content-center">
            <Form.Control
              type="text"
              placeholder="Aggiungi un elemento"
              className=" me-2 "
              style={{ width: "250px" }}
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Aggiungi quantità"
              className=" me-2 "
              style={{ width: "70px" }}
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(parseInt(e.target.value))}
            />
          </Col>
        </Row>
        <Row className="mt-2 justify-content-center align-items-center">
          <Col className="d-flex justify-content-center">
            <Button className="custom-button-primary" onClick={handleAddItem}>
              Aggiungi
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <h3 className="text-center">Lista della spesa</h3>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="border" className="spinner" />
            </div>
          ) : items && items.length > 0 ? (
            items.map((item, index) => (
              <Row key={index}>
                <Col className="col-4 d-flex justify-content-start align-items-center">
                  <Form.Check
                    type="checkbox"
                    label={item.product.name}
                    checked={item.checked}
                    className="custom-checkbox"
                    onChange={() => handleToggleItem(index)}
                  />
                </Col>
                <Col className="col-5 d-flex justify-content-end align-items-center">
                  Quantità: {item.quantity}
                </Col>
                <Col className=" col-3 d-flex flex-column  justify-content-end align-items-center">
                  <Button
                    className="me-2 ms-4 mb-2 custom-button-primary"
                    onClick={() => {
                      setShowPatchModal(true);
                      setNewEditName(item.product.name);
                      setNewEditQuantity(item.quantity);
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    className="me-2 ms-4 mb-2 custom-button-secondary"
                    onClick={() => {
                      setShowDeleteModal(true);
                      setDeleteItem(item.product.name);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </Col>
                <hr />
              </Row>
            ))
          ) : (
            <div className="text-center">
              <p>Nessun elemento in lista. Creane una nuova!</p>
            </div>
          )}
        </Row>
        <Row className=" text-center mt-3">
          <Col>
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" className="spinner" />
              </div>
            ) : (
              <Button className="custom-button-primary">
                Trasferisci alla dispensa
              </Button>
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
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleDeleteItem}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL PATCH */}
      <Modal show={showPatchModal} onHide={handleClosePatchModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica quantità</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="number"
            placeholder="Aggiungi quantità"
            className=" me-2 "
            style={{ width: "100%" }}
            value={newEditQuantity}
            onChange={(e) => setNewEditQuantity(parseInt(e.target.value))}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="custom-button-primary"
            onClick={handleEditQuantity}
          >
            Modifica
          </Button>
          <Button
            className="custom-button-secondary"
            onClick={handleClosePatchModal}
          >
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShoppinglistComponent;
