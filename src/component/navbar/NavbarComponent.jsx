import { Container, Navbar, Offcanvas, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { userDetailsGet } from "../../data/login/userdetails";
import { productsGet } from "../../data/menu/product";

function NavbarComponent() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [showAlimentiSubMenu, setShowAlimentiSubMenu] = useState(false);
  const [showRicettarioSubMenu, setShowRicettarioSubMenu] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    userDetailsGet()
      .then((data) => setUserData(data))
      .catch((error) => console.error(error));
    productsGet()
      .then((data) => {
        setProductData(data.content);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setShowAlimentiSubMenu(false);
  };
  const handleToggleAlimentiSubMenu = () => {
    setShowAlimentiSubMenu(!showAlimentiSubMenu);
    setShowRicettarioSubMenu(false);
  };
  const handleToggleRicettarioSubMenu = () => {
    setShowRicettarioSubMenu(!showRicettarioSubMenu);
    setShowAlimentiSubMenu(false);
  };

  const handleUser = () => {
    if (token) {
      navigate("/userdetails");
    } else {
      navigate("/login");
      handleClose();
    }
  };

  return (
    <>
      <Navbar
        key={"false"}
        expand={"false"}
        id="navbar"
        data-bs-theme="dark"
        className="fixed-bottom"
      >
        <Container>
          <Link onClick={handleShow} className="navbar-brand link-navbar">
            <i className="bi bi-list icon-navbar"></i>
          </Link>
          <Offcanvas
            show={show}
            onHide={handleClose}
            className="custom-offcanvas"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Esplora</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="menu-container">
                <div className="menu-item">
                  <Link to="/foodpyramid" onClick={handleClose}>
                    <span>Piramide Alimentare</span>
                  </Link>
                </div>
                <hr />
                <div
                  className="menu-item"
                  onClick={handleToggleAlimentiSubMenu}
                >
                  <span>Alimenti</span>
                  <i
                    className={
                      showAlimentiSubMenu
                        ? "bi bi-caret-down-fill"
                        : "bi bi-caret-right-fill"
                    }
                  ></i>
                </div>
                {showAlimentiSubMenu && (
                  <ul className="submenu mt-2">
                    {token ? (
                      productData
                        .map((product) => product.category)
                        .filter(
                          (category, index, self) =>
                            self.indexOf(category) === index
                        )
                        .sort()
                        .map((category) => (
                          <li key={category} className="submenu-item">
                            <Link
                              to={`/category/${category}`}
                              onClick={handleClose}
                            >
                              {category}
                            </Link>
                          </li>
                        ))
                    ) : (
                      <li className="submenu-item text-center">
                        <p>Accedi per consultare il menù</p>
                        <Button
                          className="navbar-brand link-navbar custom-button-primary"
                          onClick={handleUser}
                        >
                          Accedi
                        </Button>
                      </li>
                    )}
                  </ul>
                )}
                <hr />
                <div
                  className="menu-item"
                  onClick={handleToggleRicettarioSubMenu}
                >
                  <span>Ricettario</span>
                  <i
                    className={
                      showRicettarioSubMenu
                        ? "bi bi-caret-down-fill"
                        : "bi bi-caret-right-fill"
                    }
                  ></i>
                </div>
                {showRicettarioSubMenu && (
                  <ul className="submenu mt-2 ">
                    <li>
                      <Link to="/addrecipies" onClick={handleClose}>
                        Nuova Ricetta
                      </Link>
                    </li>
                    <li>
                      <a href="#ricettario" onClick={handleClose}>
                        Il mio Ricettario
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </Offcanvas.Body>
          </Offcanvas>
          <Link to="/calendar" className="navbar-brand link-navbar">
            <i className="bi bi-calendar4-week icon-navbar"></i>
          </Link>
          <Link to="/" className="navbar-brand link-navbar">
            <i className="bi bi-house icon-navbar"></i>
          </Link>
          <Link to="/shoppingbasket" className="navbar-brand link-navbar">
            <i className="bi bi-basket3 icon-navbar"></i>
          </Link>
          {token ? (
            <Image
              src={userData.avatar}
              className="navbar-brand link-navbar image-navbar"
              onClick={handleUser}
            />
          ) : (
            <Button
              className="navbar-brand link-navbar button-navbar"
              onClick={handleUser}
            >
              <h1>
                <i className="bi bi-person-circle"></i>
              </h1>
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
