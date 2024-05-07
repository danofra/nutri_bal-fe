import { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToFooditem, updateFooditem } from "../../redux/actions/index";

function ShoppinglistComponent() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [editedItem, setEditedItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fooditemItems = useSelector((state) => state.favorites.content);
  const dispatch = useDispatch();
  const handleAddItem = () => {
    if (newItemName.trim() !== "") {
      const newItemNameLower = newItemName.toLowerCase();
      const existingItemIndex = items.findIndex(
        (item) => item.name.toLowerCase() === newItemNameLower
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += newItemQuantity;
        setItems(updatedItems);
      } else {
        const newItem = {
          name: newItemName,
          quantity: newItemQuantity,
          checked: false,
        };
        setItems([...items, newItem]);
      }
      setNewItemName("");
      setNewItemQuantity(1);
    }
  };
  const handleEditQuantity = () => {
    if (editedItem && newQuantity >= 0) {
      const index = items.findIndex((item) => item.name === editedItem.name);
      if (index !== -1) {
        const updatedItems = [...items];
        updatedItems[index] = { ...editedItem, quantity: newQuantity };
        setItems(updatedItems);
      }
      setEditedItem(null);
      setNewQuantity(1);
    }
  };
  const handleToggleItem = (index) => {
    const updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked;
    setItems(updatedItems);
  };
  const handleTransferToFooditem = () => {
    const selectedItems = items.filter((item) => item.checked);
    selectedItems.forEach((item) => {
      const normalizedItemName = item.name.toLowerCase();
      const existingItem = fooditemItems.find(
        (fooditemItem) => fooditemItem.name.toLowerCase() === normalizedItemName
      );
      if (existingItem) {
        const updatedQuantity = existingItem.quantity + item.quantity;
        dispatch(
          updateFooditem([
            ...fooditemItems.filter(
              (fooditemItem) => fooditemItem !== existingItem
            ),
            { ...existingItem, quantity: updatedQuantity },
          ])
        );
      } else {
        dispatch(addToFooditem({ ...item, name: normalizedItemName }));
      }
    });
    const remainingItems = items.filter((item) => !item.checked);
    setItems(remainingItems);
    setIsLoading(false);
  };

  const handleShowDeleteModal = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      const updatedItems = items.filter((item) => item !== itemToDelete);
      setItems(updatedItems);
      setShowDeleteModal(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
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
          {items.map((item, index) => (
            <Row key={index}>
              <Col className="col-4 d-flex justify-content-start align-items-center">
                <Form.Check
                  type="checkbox"
                  label={item.name}
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
                    setEditedItem(item);
                    setNewQuantity(item.quantity);
                  }}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  className="me-2 ms-4 mb-2 custom-button-secondary"
                  onClick={() => handleShowDeleteModal(item)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </Col>
              <hr />
            </Row>
          ))}
        </Row>
        <Row className=" text-center mt-3">
          <Col>
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" className="spinner" />
              </div>
            ) : (
              <Button
                className="custom-button-primary"
                onClick={handleTransferToFooditem}
              >
                Trasferisci alla dispensa
              </Button>
            )}
          </Col>
        </Row>
      </Container>
      {/* Modale per confermare l'eliminazione */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare l&apos;elemento{" "}
          {itemToDelete && itemToDelete.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
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

export default ShoppinglistComponent;
