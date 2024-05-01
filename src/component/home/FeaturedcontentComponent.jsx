import { Container, Row, Col, Image, Button } from "react-bootstrap";
const FeaturedcontentComponent = () => {
  // Esempio di dati per il contenuto in primo piano
  const featuredItems = [
    {
      title: "Cambia la tua vita con il metodo Bilanciamo.",
      description: "Impara a mangiare per non fare mai più una dieta!",
      image: "https://m.media-amazon.com/images/I/71mWwSVNYPL._SL1500_.jpg",
      link: "https://www.amazon.it/Cambia-metodo-Bilanciamo-Impara-mangiare/dp/882275669X/ref=sr_1_9?dib=eyJ2IjoiMSJ9.edt6qZDy4Wtv9NZanidjNlkjOErIY7xqRoG2aeim0aG13D1FKKRo3Fs2gA14c7f2wFdLFbZ780WAqKDWuTbttr5FFXT4l7dkCUBAj-1P_zr6VTv7xm6cn1CQiO5HYYjNjGuak9XtWF1tVavVCqQQj6L4O7Ot2JZsTkknmOj3klnoWi0MCK4i_P_pQgUmd3EypUW9Xy6xfmetzJlaWiLC3usBQmArsrA_bx9OkytVWeA.AVZwVa2CZezwTeoF8t9CwXhPAJDoscI6DFbv13wWqrM&dib_tag=se&keywords=alimentazione&qid=1714492928&s=books&sr=1-9",
    },
    {
      title: "La scienza della nutrizione.",
      description:
        "Sfatare i falsi miti, conoscere i fatti, mangiare e vivere meglio",
      image:
        "https://m.media-amazon.com/images/I/41x3iuIxoFL._SX342_SY445_.jpg",
      link: "https://www.amazon.it/scienza-nutrizione-Sfatare-conoscere-mangiare/dp/8858040872/ref=sr_1_5?dib=eyJ2IjoiMSJ9.edt6qZDy4Wtv9NZanidjNlkjOErIY7xqRoG2aeim0aG13D1FKKRo3Fs2gA14c7f2wFdLFbZ780WAqKDWuTbttr5FFXT4l7dkCUBAj-1P_zr6VTv7xm6cn1CQiO5HYYjNjGuak9XtWF1tVavVCqQQj6L4O7Ot2JZsTkknmOj3klnoWi0MCK4i_P_pQgUmd3EypUW9Xy6xfmetzJlaWiLC3usBQmArsrA_bx9OkytVWeA.AVZwVa2CZezwTeoF8t9CwXhPAJDoscI6DFbv13wWqrM&dib_tag=se&keywords=alimentazione&qid=1714492928&s=books&sr=1-5",
    },
    {
      title: "Il nuovo mangiare bene per sconfiggere il male.",
      description: "La battaglia contro i tumori inizia a tavola.",
      image:
        "https://m.media-amazon.com/images/I/41B2ibchYYL._SY445_SX342_.jpg",
      link: "https://www.amazon.it/mangiare-sconfiggere-battaglia-contro-tavola/dp/8869394565/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.edt6qZDy4Wtv9NZanidjNlkjOErIY7xqRoG2aeim0aG13D1FKKRo3Fs2gA14c7f2wFdLFbZ780WAqKDWuTbttr5FFXT4l7dkCUBAj-1P_zr6VTv7xm6cn1CQiO5HYYjNjGuak9XtWF1tVavVCqQQj6L4O7Ot2JZsTkknmOj3klnoWi0MCK4i_P_pQgUmd3EypUW9Xy6xfmetzJlaWiLC3usBQmArsrA_bx9OkytVWeA.AVZwVa2CZezwTeoF8t9CwXhPAJDoscI6DFbv13wWqrM&dib_tag=se&keywords=alimentazione&qid=1714492928&s=books&sr=1-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
    },
    {
      title: "Alimentazione sportiva e performance",
      description:
        "Migliora la condizione atletica con la giusta nutrizione: La guida completa per ottimizzare la massa muscolare e ... il grasso in eccesso partendo dalla cucina: 3",
      image:
        "https://m.media-amazon.com/images/I/41FGzP5OSVL._SY445_SX342_.jpg",
      link: "https://www.amazon.it/ALIMENTAZIONE-SPORTIVA-PERFORMANCE-condizione-nutrizione/dp/B0CXMPDZT6/ref=sr_1_2_sspa?dib=eyJ2IjoiMSJ9.edt6qZDy4Wtv9NZanidjNlkjOErIY7xqRoG2aeim0aG13D1FKKRo3Fs2gA14c7f2wFdLFbZ780WAqKDWuTbttr5FFXT4l7dkCUBAj-1P_zr6VTv7xm6cn1CQiO5HYYjNjGuak9XtWF1tVavVCqQQj6L4O7Ot2JZsTkknmOj3klnoWi0MCK4i_P_pQgUmd3EypUW9Xy6xfmetzJlaWiLC3usBQmArsrA_bx9OkytVWeA.AVZwVa2CZezwTeoF8t9CwXhPAJDoscI6DFbv13wWqrM&dib_tag=se&keywords=alimentazione&qid=1714492928&s=books&sr=1-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
    },
  ];

  return (
    <Container
      id="custom-img-featured"
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <Row className="text-center mt-4 mb-4">
        <Col className="col-12">
          <h2>Bibliografica in primo piano</h2>
        </Col>
        {featuredItems.map((item, index) => (
          <Col
            key={index}
            className="col-6 mt-4 d-flex flex-column align-items-center justify-content-around"
          >
            <Image src={item.image} alt={item.title} width={150} height={150} />
            <h2 className="pt-3">{item.title}</h2>
            <p>{item.description}</p>
            <Button
              className="custom-button-primary"
              target="_blank"
              href={item.link}
            >
              Leggi tutto
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedcontentComponent;