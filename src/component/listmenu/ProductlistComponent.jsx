import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productsGet } from "../../data/menu/product";
import {
  Card,
  ListGroup,
  Spinner,
  Row,
  Col,
  Container,
  Button,
} from "react-bootstrap";

const ProductlistComponent = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    productsGet()
      .then((data) => {
        setProducts(data.content);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, [category]);

  return (
    <>
      {token ? (
        <div>
          <h2 className="text-center mt-3">{category}</h2>
          {isLoading ? (
            <Spinner animation="border" role="status"></Spinner>
          ) : (
            <>
              <Container fluid>
                <Row className="justify-content-center align-items-center ">
                  {products
                    .filter((product) => product.category === category)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((product) => (
                      <Col
                        key={product.name}
                        className="mb-4 d-flex justify-content-center align-items-center"
                      >
                        <Card
                          style={{ width: "18rem" }}
                          className=" background-food"
                        >
                          <Card.Img variant="top" src={product.image} />
                          <Card.Body>
                            <Card.Title className="text-center m-0 p-0">
                              {product.name}
                            </Card.Title>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                              Categoria:{" "}
                              <span className="font-span">
                                {product.category}
                              </span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Descrizione:{" "}
                              <span className="font-span">
                                {product.description}
                              </span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Kcal:{" "}
                              <span className="font-span">{product.kcal}</span>{" "}
                            </ListGroup.Item>
                          </ListGroup>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </Container>
            </>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-center mt-3">
            {" "}
            Accedi per consultare l&apos;elenco
          </h2>
          <Button className="btn btn-primary mt-3" href="/login">
            Accedi
          </Button>
        </div>
      )}
    </>
  );
};

export default ProductlistComponent;
