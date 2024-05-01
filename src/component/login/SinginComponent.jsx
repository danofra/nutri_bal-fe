import { Container, Form, Row, Col, Button, FormCheck } from "react-bootstrap";
import { useState } from "react";

function SinginComponent() {
  const initialState = {
    nome: "",
    cognome: "",
    email: "",
    password: "",
    dataDiNascita: "",
    sesso: "",
    attivitaFisica: "",
    nazionalita: "",
    comune: "",
    robot: false,
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData(initialState);
  };
  return (
    <>
      <Container className="mt-5 singin-container">
        <div className="text-center">
          <h2>Registrazione</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row className="mt-5">
            <Form.Group as={Col} controlId="nome">
              <Form.Label>Nome*:</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Inserisci il tuo nome"
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="cognome">
              <Form.Label>Cognome*:</Form.Label>
              <Form.Control
                type="text"
                name="cognome"
                value={formData.cognome}
                onChange={handleChange}
                placeholder="Inserisci il tuo cognome"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col} controlId="email">
              <Form.Label>Email*:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Inserisci la tua email"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col} controlId="password">
              <Form.Label>Password*:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Inserisci la tua password"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col} controlId="dataDiNascita">
              <Form.Label>Data di nascita*:</Form.Label>
              <Form.Control
                type="date"
                name="dataDiNascita"
                value={formData.dataDiNascita}
                onChange={handleChange}
                placeholder="Inserisci la tua età"
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="sesso">
              <Form.Label>Genere*:</Form.Label>
              <Form.Control
                as="select"
                name="sesso"
                value={formData.sesso}
                onChange={handleChange}
                placeholder="Inserisci la tua età"
                required
              >
                <option value="">Seleziona il tuo genere</option>
                <option value="male">Maschio</option>
                <option value="female">Femmina</option>
                <option value="other">Altro</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col} controlId="attivitaFisica">
              <Form.Label>Attività fisica*:</Form.Label>
              <Form.Control
                as="select"
                name="attivitaFisica"
                value={formData.attivitaFisica}
                onChange={handleChange}
                placeholder="Inserisci la tua attività fisica"
                required
              >
                <option value="">Seleziona il livello di attività</option>
                <option value="sedentary">Sedentario</option>
                <option value="moderatelyActive">Moderatamente Attivo</option>
                <option value="active">Attivo</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col} controlId="nazionalita">
              <Form.Label>Nazionalità:</Form.Label>
              <Form.Control
                type="text"
                name="nazionalita"
                value={formData.nazionalita}
                onChange={handleChange}
                placeholder="Inserisci il tuo nazionalità"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="comune">
              <Form.Label>Comune di residenza:</Form.Label>
              <Form.Control
                type="text"
                name="comune"
                value={formData.comune}
                onChange={handleChange}
                placeholder="Inserisci il tuo comune di residenza"
              />
            </Form.Group>
          </Row>
          <Row className="mt-3">
            <Form.Group as={Col} controlId="robot">
              <FormCheck
                type="checkbox"
                name="robot"
                label="No! Non sono un robot"
                checked={formData.robot}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mt-3 w-75 mx-auto">
            <Button
              className="custom-button-primary text-center mt-3"
              type="submit"
              onClick={handleSubmit}
            >
              Registrati
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default SinginComponent;
