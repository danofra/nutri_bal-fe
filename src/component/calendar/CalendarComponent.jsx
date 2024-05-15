import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Modal, Container } from "react-bootstrap";
import {
  mealsGet,
  newMealsPost,
  mealsPut,
  mealsDelete,
} from "../../data/calendar/calendar";

function CalendarComponent() {
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getDayOfWeek = (year, month, day) => {
    const dayOfWeek = new Date(year, month, day).getDay();
    const daysOfWeek = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"];
    return daysOfWeek[dayOfWeek];
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() - 1;

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth + 1);
  const [mealData, setMealData] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showPutModal, setShowPutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const [mealQuantity, setMealQuantity] = useState(1);
  const [newEditQuantity, setNewEditQuantity] = useState(0);
  const [editMealsQuantityId, setEditMealsQuantityId] = useState(0);
  const [deleteMealsQuantityId, setDeleteMealsQuantityId] = useState(0);
  const [deleteMealsQuantityName, setDeleteMealsQuantityName] = useState("");

  useEffect(() => {
    fetchMealData();
  }, [selectedMonth, selectedYear]);

  /* FETCH GET */

  const fetchMealData = async () => {
    const data = await mealsGet(selectedMonth + 1, selectedYear);
    setMealData(data);
  };

  /* FETCH POST */

  const handlePostMeal = async () => {
    const data = {
      month: selectedMonth + 1,
      year: selectedYear,
      day: selectedDay,
      type_meals: selectedMealType,
      productName: mealDescription,
      quantity: mealQuantity,
    };
    await newMealsPost(data);
    handleClosePostModal();
    fetchMealData();
  };

  /* FETCH PUT */

  const handlePutMeal = async () => {
    await mealsPut(editMealsQuantityId, newEditQuantity);
    handleClosePutModal();
    fetchMealData();
  };

  /* FETCH DELETE */

  const handleDeleteMeal = async () => {
    await mealsDelete(deleteMealsQuantityId);
    handleCloseDeleteModal();
    fetchMealData();
  };

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  /* OPEN MODAL */

  const handleShowPostModal = (day, mealType) => {
    setSelectedDay(day);
    setSelectedMealType(mealType);
    setShowPostModal(true);
  };

  /* CLOSE MODAL */

  const handleClosePostModal = () => {
    setSelectedDay("");
    setSelectedMealType("");
    setMealDescription("");
    setMealQuantity(1);
    setShowPostModal(false);
  };

  const handleClosePutModal = () => {
    setShowPutModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Container fluid className="calendar-container">
        <Row className="pt-3 pb-3">
          <Col className="text-center">
            <h1>Calendario</h1>
          </Col>
        </Row>
        {/* CALENDAR */}
        <Row className="select-container">
          <Col>
            <select
              className="form-select month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              {[...Array(12).keys()].map((month) => (
                <option key={month} value={month}>
                  {new Date(2000, month).toLocaleString("it-IT", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </Col>
          <Col>
            <select
              className="form-select year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {[...Array(20).keys()].map((index) => (
                <option key={index} value={currentYear + index}>
                  {currentYear + index}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row className="row-cols-7">
          {daysArray.map((day) => (
            <Col key={day} sm={12} md={6} lg={4} xl={4}>
              <Container className="day-container">
                <Row className="justify-content-between align-items-center">
                  <Col
                    xs={6}
                    className="day-of-week d-flex justify-content-start"
                  >
                    {getDayOfWeek(selectedYear, selectedMonth, day)}
                  </Col>
                  <Col xs={6} className="day d-flex justify-content-end">
                    {day}
                  </Col>
                </Row>
                {["BREAKFAST", "LUNCH", "DINNER"].map((mealType) => (
                  <Row
                    key={mealType}
                    className="justify-content-start align-items-center"
                  >
                    <Col
                      xs={12}
                      sm={5}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <strong>
                        {mealType.charAt(0).toUpperCase() + mealType.slice(1)}:
                      </strong>
                      <Button
                        onClick={() => handleShowPostModal(day, mealType)}
                        className="custom-button-ter"
                      >
                        <i className="bi bi-plus-circle-fill"></i>
                      </Button>
                    </Col>
                    <Col
                      xs={12}
                      sm={7}
                      className="d-flex justify-content-between align-items-center mt-2 mb-2"
                    >
                      <ul className="w-100">
                        {mealData.length > 0 &&
                          mealData
                            .filter(
                              (item) =>
                                item.type_meals === mealType && item.day === day
                            )
                            .map((item, index) => (
                              <div key={index}>
                                <>
                                  {item.mealsQuantity.map((meal, index) => (
                                    <div
                                      className="d-flex justify-content-between"
                                      key={index}
                                    >
                                      <div>
                                        <li className="border-bottom border-1">
                                          {meal.quantity} - {meal.product.name}
                                        </li>
                                      </div>
                                      <div>
                                        <Button
                                          className="custom-button-quaternary"
                                          onClick={() => {
                                            setShowPutModal(true);
                                            setEditMealsQuantityId(meal.id);
                                            setNewEditQuantity(meal.quantity);
                                          }}
                                        >
                                          <i className="bi bi-pencil"></i>
                                        </Button>
                                        <Button
                                          className="custom-button-quintary"
                                          onClick={() => {
                                            setShowDeleteModal(true);
                                            setDeleteMealsQuantityId(meal.id);
                                            setDeleteMealsQuantityName(
                                              meal.product.name
                                            );
                                          }}
                                        >
                                          <i className="bi bi-trash"></i>
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </>
                              </div>
                            ))}
                      </ul>
                    </Col>
                  </Row>
                ))}
              </Container>
            </Col>
          ))}
        </Row>
      </Container>

      {/* MODAL ADD MEALS */}

      <Modal show={showPostModal} onHide={handleClosePostModal}>
        <Modal.Header closeButton>
          <Modal.Title>Inserisci Pasto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="mealDescription">
            <Form.Label>Descrizione del pasto</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={mealDescription}
              onChange={(e) => setMealDescription(e.target.value)}
              placeholder="Inserisci descrizione del pasto"
            />
          </Form.Group>
          <Form.Group controlId="mealQuantity">
            <Form.Label>Quantità</Form.Label>
            <Form.Control
              type="number"
              value={mealQuantity}
              onChange={(e) => setMealQuantity(parseInt(e.target.value))}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="custom-button-secondary"
            onClick={handleClosePostModal}
          >
            Annulla
          </Button>
          <Button className="custom-button-primary" onClick={handlePostMeal}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL DELETE */}

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler eliminare l&apos;elemento{" "}
          {deleteMealsQuantityName} selezionato?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="custom-button-secondary"
            onClick={handleCloseDeleteModal}
          >
            Annulla
          </Button>
          <Button className="custom-button-primary" onClick={handleDeleteMeal}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL PUT */}

      <Modal show={showPutModal} onHide={handleClosePutModal}>
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
            className="custom-button-secondary"
            onClick={handleClosePutModal}
          >
            Annulla
          </Button>
          <Button className="custom-button-primary" onClick={handlePutMeal}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CalendarComponent;
