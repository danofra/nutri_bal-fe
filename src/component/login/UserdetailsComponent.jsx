import {
  Button,
  Spinner,
  Container,
  Row,
  Col,
  Modal,
  Image,
  Form,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  userDetailsGet,
  userDetailsDelete,
  userDetailsUploadImage,
  userDetailsPut,
} from "../../data/login/userdetails";

function UserdetailsComponent() {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessDeleteModal, setShowSuccessDeleteModal] = useState(false);
  const [showSuccessUploadImageModal, setShowSuccessUploadImageModal] =
    useState(false);
  const [showSuccessPutUserModal, setShowSuccessPutUserModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  const [editFormData, setEditFormData] = useState({
    name: userData.name,
    surname: userData.surname,
    email: userData.email,
    password: "",
    date_of_birth: userData.date_of_birth,
    gender: userData.gender,
    physical_activity: userData.physical_activity,
    nationality: userData.nationality,
    city_of_residence: userData.city_of_residence,
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUploadImageModal, setShowUploadImageModal] = useState(false);
  const [showPutUserModal, setShowPutUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState(new FormData());

  /* FETCH GET */

  useEffect(() => {
    userDetailsGet()
      .then((data) => {
        setUserData(data);
        console.log(data);
      })
      .catch((error) => Error(error));
  }, []);

  /* LOGOUT */

  const logout = async () => {
    try {
      await localStorage.removeItem("token");
      setShowLogoutModal(false);
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  /* FETCH DELETE */

  const userDelete = async () => {
    try {
      await userDetailsDelete();
      setShowDeleteModal(false);
      setShowSuccessDeleteModal(true);
    } catch (err) {
      setError(err.message);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  /* FETCH UPLOAD IMAGE */

  const handleImageChange = (e) => {
    const updateFromData = new FormData();
    updateFromData.append("avatar", e.target.files[0]);
    setFormData(updateFromData);
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await userDetailsUploadImage(formData);
      setIsLoading(false);
      setShowUploadImageModal(false);
      setShowSuccessUploadImageModal(true);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  /* FETCH PUT */

  const handleShowPutUserModal = () => {
    setEditFormData({
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      password: "",
      date_of_birth: userData.date_of_birth,
      gender: userData.gender,
      physical_activity: userData.physical_activity,
      nationality: userData.nationality,
      city_of_residence: userData.city_of_residence,
    });
    setShowPutUserModal(true);
  };

  const handleEditFormChange = (event) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const userDataObject = {
        name: editFormData.name,
        surname: editFormData.surname,
        email: editFormData.email,
        password: editFormData.password,
        dateOfBirth: editFormData.date_of_birth,
        gender: editFormData.gender,
        physicalActivity: editFormData.physical_activity,
        nationality: editFormData.nationality,
        cityOfResidence: editFormData.city_of_residence,
      };
      await userDetailsPut(
        userDataObject.name,
        userDataObject.surname,
        userDataObject.email,
        userDataObject.password,
        userDataObject.dateOfBirth,
        userDataObject.gender,
        userDataObject.physicalActivity,
        userDataObject.nationality,
        userDataObject.cityOfResidence
      );
      setIsLoading(false);
      setShowPutUserModal(false);
      setShowSuccessPutUserModal(true);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      setShowErrorModal(true);
    }
  };

  /* FUNCTION GENDER AND PHYSICAL ACTIVITY */

  const gender = (gender) => {
    if (gender === "MALE") {
      return "Maschio";
    } else if (gender === "FEMALE") {
      return "Femmina";
    } else {
      return "Altro";
    }
  };

  const physicalActivity = (physical_activity) => {
    if (physical_activity === "SEDENTARY") {
      return "Sedentario";
    } else if (physical_activity === "MODERATELY_ACTIVE") {
      return "Moderatamente attivo";
    } else {
      return "Attivo";
    }
  };

  /* FUCTION SUCCESS MODAL */

  const handleSuccessDeleteModalClose = () => {
    setShowSuccessDeleteModal(false);
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate("/");
    window.location.reload();
  };

  const handleSuccessUploadImageModalClose = () => {
    setShowSuccessUploadImageModal(false);
    navigate("/userdetails");
    window.location.reload();
  };

  const handleSuccessPutUserModalClose = () => {
    setShowSuccessPutUserModal(false);
    navigate("/userdetails");
    window.location.reload();
  };

  /* FUNCTION CLOSE MODAL */

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseUploadImageModal = () => {
    setShowUploadImageModal(false);
  };

  const handleClosePutUserModal = () => {
    setShowPutUserModal(false);
  };

  return (
    <>
      <Container className="mt-5 log-container">
        <div className="text-center">
          <h2>Profilo</h2>
        </div>
        <Row className="justify-content-center mt-5 mb-5">
          <Col className="d-flex justify-content-center align-items-center">
            <Row className="flex-column justify-content-center align-items-center">
              <Col className="d-flex justify-content-center align-items-center mb-2">
                <Image
                  src={userData.avatar}
                  alt="user-image"
                  className="user-image rounded-circle"
                  width={200}
                  height={200}
                />
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                <Button
                  className="custom-button-primary"
                  onClick={setShowUploadImageModal}
                >
                  <i className="bi bi-pencil"></i> Modifica avatar
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col className="mb-1">
                <h5>
                  Nome:<span className="font-span"> {userData.name}</span>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col className="mb-1">
                <h5>
                  Cognome:
                  <span className="font-span"> {userData.surname}</span>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col className="mb-1">
                <h5>
                  Email:<span className="font-span"> {userData.email}</span>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col className="mb-1">
                <h5>
                  Data di nascita:
                  <span className="font-span"> {userData.date_of_birth}</span>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col className="mb-1">
                <h5>
                  Genere:
                  <span className="font-span"> {gender(userData.gender)}</span>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col className="mb-1">
                <h5>
                  Attività fisica:
                  <span className="font-span">
                    {" "}
                    {physicalActivity(userData.physical_activity)}
                  </span>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col className="mb-1">
                <h5>
                  Nazionalità:
                  <span className="font-span"> {userData.nationality}</span>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col className="mb-1">
                <h5>
                  Comune di residenza:
                  <span className="font-span">
                    {" "}
                    {userData.city_of_residence}
                  </span>
                </h5>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-3 d-flex justify-content-center align-items-center">
          {isLoading ? (
            <Col className="d-flex justify-content-center align-items-center">
              <Spinner animation="border" className="spinner" />
            </Col>
          ) : (
            <>
              <Col className="d-flex justify-content-center align-items-center">
                <Button
                  className="custom-button-secondary"
                  onClick={() => {
                    setShowLogoutModal(true);
                  }}
                >
                  <i className="bi bi-x-circle"></i> Esci
                </Button>
              </Col>
              <Col className="d-flex justify-content-around  align-items-center">
                <Button
                  className="custom-button-primary"
                  onClick={handleShowPutUserModal}
                >
                  <i className="bi bi-pencil"></i> Modifica
                </Button>
                <Button
                  className="custom-button-secondary"
                  onClick={() => {
                    setShowDeleteModal(true);
                  }}
                >
                  <i className="bi bi-trash"></i> Elimina
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Container>

      {/* MODAL LOGOUT */}

      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
        <Modal.Header closeButton className="modal-header-error">
          <Modal.Title>Conferma logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler uscire dall&apos;applicazione?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="custom-button-secondary"
            onClick={handleCloseLogoutModal}
          >
            Annulla
          </Button>
          <Button className="custom-button-primary" onClick={logout}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL UPLOAD IMAGE */}

      <Modal show={showUploadImageModal} onHide={handleCloseUploadImageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Caricamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Scegli il tuo avatar!</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        {isLoading ? (
          <Col className="d-flex justify-content-center align-items-center mb-3">
            <Spinner animation="border" className="spinner" />
          </Col>
        ) : (
          <Modal.Footer>
            <Button
              className="custom-button-secondary"
              onClick={handleCloseUploadImageModal}
            >
              Annulla
            </Button>

            <Button
              className="custom-button-primary"
              onClick={handleUploadImage}
            >
              Salva
            </Button>
          </Modal.Footer>
        )}
      </Modal>

      {/* MODAL PUT */}

      {/* MODAL PUT */}
      <Modal show={showPutUserModal} onHide={handleClosePutUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formSurname">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={editFormData.surname}
                onChange={handleEditFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={editFormData.password}
                onChange={handleEditFormChange}
                placeholder="Inserisci la password modificata o quella attuale"
              />
            </Form.Group>

            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Data di nascita</Form.Label>
              <Form.Control
                type="date"
                name="date_of_birth"
                value={editFormData.date_of_birth}
                onChange={handleEditFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formGender">
              <Form.Label>Genere</Form.Label>
              <Form.Select
                name="gender"
                value={editFormData.gender}
                onChange={handleEditFormChange}
              >
                <option value="MALE">Maschio</option>
                <option value="FEMALE">Femmina</option>
                <option value="OTHER">Altro</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formPhysicalActivity">
              <Form.Label>Attività fisica</Form.Label>
              <Form.Select
                name="physical_activity"
                value={editFormData.physical_activity}
                onChange={handleEditFormChange}
              >
                <option value="SEDENTARY">Sedentario</option>
                <option value="MODERATELY_ACTIVE">Moderatamente attivo</option>
                <option value="ACTIVE">Attivo</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formNationality">
              <Form.Label>Nazionalità</Form.Label>
              <Form.Control
                type="text"
                name="nationality"
                value={editFormData.nationality}
                onChange={handleEditFormChange}
              />
            </Form.Group>

            <Form.Group controlId="formCityOfResidence">
              <Form.Label>Comune di residenza</Form.Label>
              <Form.Control
                type="text"
                name="city_of_residence"
                value={editFormData.city_of_residence}
                onChange={handleEditFormChange}
              />
            </Form.Group>

            <Button type="submit" className="custom-button-primary">
              Salva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* MODAL DELETE */}

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton className="modal-header-error">
          <Modal.Title>Conferma logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler eliminare il tuo account?</Modal.Body>
        <Modal.Footer>
          <Button
            className="custom-button-secondary"
            onClick={handleCloseDeleteModal}
          >
            Annulla
          </Button>
          <Button className="custom-button-primary" onClick={userDelete}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>

      {/* SUCCESS MODAL DELETE */}

      <Modal
        show={showSuccessDeleteModal}
        onHide={handleSuccessDeleteModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Successo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Hai eliminato l&apos;account con successo!</Modal.Body>
      </Modal>

      {/* SUCCESS MODAL PUT */}

      <Modal
        show={showSuccessPutUserModal}
        onHide={handleSuccessPutUserModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Successo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Hai modificato l&apos;account con successo!</Modal.Body>
      </Modal>

      {/* SUCCESS MODAL UPLOAD IMAGE */}

      <Modal
        show={showSuccessUploadImageModal}
        onHide={handleSuccessUploadImageModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Successo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Avatar caricato con successo!</Modal.Body>
      </Modal>

      {/* SUCCESS MODAL LOGOUT */}

      <Modal show={showSuccessModal} onHide={handleSuccessModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Successo</Modal.Title>
        </Modal.Header>
        <Modal.Body>Logout effettuato con successo!</Modal.Body>
      </Modal>

      {/* ERROR MODAL */}

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton className="modal-header-error">
          <Modal.Title>Errore</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
      </Modal>
    </>
  );
}
export default UserdetailsComponent;
