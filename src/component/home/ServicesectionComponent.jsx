import { Container, Row, Col } from "react-bootstrap";

const ServicesectionComponent = () => {
  return (
    <>
      <Container className="mb-3">
        <Row className="mt-5">
          <Col className="d-flex flex-column align-items-center justify-content-center">
            <h2>Cosa offriamo?</h2>
            <Row className="mt-3">
              <Col>
                <ul>
                  <li>
                    <h4>
                      <i className="bi bi-arrow-right-short"></i>
                      Calendario
                    </h4>
                    <p>
                      Registrare i pasti giornalieri, tramite un calendario
                      interattivo (Colazione,Pranzo e Cena);
                    </p>
                  </li>
                  <li>
                    <h4>
                      <i className="bi bi-arrow-right-short"></i>
                      Lista della spesa
                    </h4>
                    <p>
                      Gestire la lista della spesa, tramite un’ apposita sezione
                      che consente di aggiungere, modificare ed eliminare
                      prodotti, selezionare e deselezionare quest ultimi ed
                      inoltre trasferirli in dispensa non appena acquistati;
                    </p>
                  </li>
                  <li>
                    <h4>
                      <i className="bi bi-arrow-right-short"></i>
                      Dispensa
                    </h4>
                    <p>
                      Monitorare la dispensa, contenente gli acquisti derivanti
                      dalla lista della spesa e con possibilità di aggiungere
                      ulteriori prodotti ed eliminare quelli utilizzati. E’
                      possibile gestire le quantità e suddividere i prodotti per
                      categorie personalizzate. Ciò consente di gestire le
                      scorte di cibo nella propria dispensa e semplificare la
                      pianificazione di acquisti futuri;
                    </p>
                  </li>
                  <li>
                    <h4>
                      <i className="bi bi-arrow-right-short"></i>
                      Ricettario (?)
                    </h4>
                    <p>
                      Creare un ricettario personalizzato, tramite un opposta
                      sezione che consente di aggiungere, raggruppare e mettere
                      in elenco le ricette. La pagina dedicata alla ricetta,
                      offre la possibilità di aggiungere una lista ingredienti,
                      descrizione, foto e link.
                    </p>
                  </li>
                  <li>
                    <h4>
                      <i className="bi bi-arrow-right-short"></i>
                      Ulteriori funzionalità
                    </h4>
                    <p>
                      L&apos;applicazione, inoltre, offre una sezione
                      informativa che include una piramide alimentare
                      settimanale indicativa ed un elenco alfabetico degli
                      alimenti suddivisi per categorie (frutta, verdure ecc..).
                    </p>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ServicesectionComponent;
