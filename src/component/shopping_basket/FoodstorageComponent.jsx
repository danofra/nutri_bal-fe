import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { updateFooditem, removeToFooditem } from "../../redux/actions/index";
import {
  foodStorageGet,
  foodStorageDelete,
} from "../../data/shopping_basket/foodStorage";

function FoodstorageComponent() {
  const [foodItems, setFoodItems] = useState([]);
  const fooditemItems = useSelector((state) => state.favorites.content);
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const [newQuantity, setNewQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    foodStorageGet()
      .then((data) => {
        setFoodItems(data.content);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching food storage:", error);
        setIsLoading(false);
      });
  }, []);

  const handleEditQuantity = (item, newQuantity) => {
    const updatedFoodItems = foodItems.map((foodItem) => {
      if (foodItem.id === item.id) {
        return { ...foodItem, quantity: newQuantity };
      }
      return foodItem;
    });
    setFoodItems(updatedFoodItems);
    dispatch(updateFooditem(updatedFoodItems));
  };

  const handleShowConfirmation = (item) => {
    setItemToRemove(item);
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    if (itemToRemove) {
      foodStorageDelete(itemToRemove.product.id)
        .then(() => {
          const updatedFoodItems = foodItems.filter(
            (foodItem) => foodItem.id !== itemToRemove.id
          );
          setFoodItems(updatedFoodItems);
          dispatch(removeToFooditem(itemToRemove));
          setShowConfirmationModal(false); // Chiudi il modale dopo aver eliminato l'elemento
        })
        .catch((error) => {
          console.error("Error deleting food item:", error);
          // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
        });
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
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" className="spinner" />
              </div>
            ) : foodItems && foodItems.length > 0 ? (
              foodItems.map((item) => (
                <Card key={item.id} className="mb-1">
                  <Card.Body>{item.product.name}</Card.Body>
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
              ))
            ) : (
              <div className="text-center">
                <p>Nessun elemento nel food storage</p>
              </div>
            )}
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
          {itemToRemove && itemToRemove.product.name}?
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
          <Button
            variant="primary"
            onClick={() => handleEditQuantity(editedItem, newQuantity)}
          >
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FoodstorageComponent;
