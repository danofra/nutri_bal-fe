import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Modal, Container } from "react-bootstrap";

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
  const currentMonth = currentDate.getMonth();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [mealData, setMealData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const [mealQuantity, setMealQuantity] = useState(1);

  useEffect(() => {
    setSelectedYear(currentYear);
    setSelectedMonth(currentMonth);
  }, [currentMonth, currentYear]);

  const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const handleShowModal = (day, mealType) => {
    setSelectedDay(day);
    setSelectedMealType(mealType);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDay("");
    setSelectedMealType("");
    setMealDescription("");
    setMealQuantity(1);
    setShowModal(false);
  };

  const handleSaveMeal = () => {
    const key = `${selectedYear}-${selectedMonth + 1}-${selectedDay}`;
    const mealItem = {
      description: mealDescription,
      quantity: mealQuantity,
    };

    setMealData((prevData) => {
      const updatedData = { ...prevData };
      if (updatedData[key]) {
        if (updatedData[key][selectedMealType]) {
          const existingMealIndex = updatedData[key][
            selectedMealType
          ].findIndex(
            (meal) =>
              meal.description.toLowerCase() === mealDescription.toLowerCase()
          );
          if (existingMealIndex !== -1) {
            updatedData[key][selectedMealType][existingMealIndex].quantity +=
              mealQuantity;
          } else {
            updatedData[key][selectedMealType].push(mealItem);
          }
        } else {
          updatedData[key][selectedMealType] = [mealItem];
        }
      } else {
        updatedData[key] = {
          [selectedMealType]: [mealItem],
        };
      }
      return updatedData;
    });
    handleCloseModal();
  };

  return (
    <>
      <Container fluid className="calendar-container">
        <Row className="pt-3 pb-3">
          <Col className="text-center">
            <h1>Calendario</h1>
          </Col>
        </Row>
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
            <Col key={day} sm={12} md={6} lg={4} xl={3}>
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
                {["colazione", "pranzo", "cena"].map((mealType) => (
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
                        onClick={() => handleShowModal(day, mealType)}
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
                        {mealData[
                          `${selectedYear}-${selectedMonth + 1}-${day}`
                        ]?.[mealType]?.map((meal, index) => (
                          <li key={index} className="border-bottom border-1">
                            {meal.quantity} - {meal.description}
                          </li>
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
      <Modal show={showModal} onHide={handleCloseModal}>
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
            onClick={handleCloseModal}
          >
            Annulla
          </Button>
          <Button className="custom-button-primary" onClick={handleSaveMeal}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CalendarComponent;
