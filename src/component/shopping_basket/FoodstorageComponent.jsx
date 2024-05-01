import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { updateFooditem, removeToFooditem } from "../../redux/actions/index";

function FoodstorageComponent() {
  const fooditemItems = useSelector((state) => state.favorites.content);
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);

  const handleEditQuantity = () => {
    if (editedItem && newQuantity >= 0) {
      const index = fooditemItems.findIndex(
        (item) => item.id === editedItem.id
      );
      if (index !== -1) {
        const updatedFooditemItems = [...fooditemItems];
        updatedFooditemItems[index] = {
          ...editedItem,
          quantity: newQuantity,
        };
        dispatch(updateFooditem(updatedFooditemItems));
      }
      setEditedItem(null);
      setNewQuantity(1);
    }
  };

  const handleShowConfirmation = (item) => {
    setItemToRemove(item);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    if (itemToRemove) {
      dispatch(removeToFooditem(itemToRemove));
      setShowConfirmationModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
    setItemToRemove(null);
  };

  return (
    <>
      <Container>
        <Row className="mt-3">
          <h3 className="text-center">Dispensa</h3>
          <Col>
            {fooditemItems.map((item, index) => (
              <Card key={index} className="mb-1">
                <Card.Body>{item.name}</Card.Body>
                <Card.Footer>
                  <Row className="d-flex justify-content-between align-items-center">
                    <Col>Quantità: {item.quantity}</Col>
                    <Col className="d-flex justify-content-end">
                      <Button
                        className="me-2 custom-button-primary"
                        onClick={() => {
                          setEditedItem(item);
                          setNewQuantity(item.quantity);
                        }}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        className="custom-button-secondary"
                        onClick={() => handleShowConfirmation(item)}
                      >
                        <i className="bi bi-eraser"></i>
                      </Button>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
      {/* Modale di conferma */}
      <Modal show={showConfirmationModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare l&apos;elemento{" "}
          {itemToRemove && itemToRemove.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Conferma
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modale per modifica quantità */}
      <Modal show={!!editedItem} onHide={() => setEditedItem(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica quantità</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="number"
            className="form-control"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditedItem(null)}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleEditQuantity}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FoodstorageComponent;
