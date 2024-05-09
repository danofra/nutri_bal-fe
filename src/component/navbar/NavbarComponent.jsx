import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { BiCaretRight } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";

function NavbarComponent() {
  const [show, setShow] = useState(false);
  const [showAlimentiSubMenu, setShowAlimentiSubMenu] = useState(false);
  const [showRicettarioSubMenu, setShowRicettarioSubMenu] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setShowAlimentiSubMenu(false);
    setShowRicettarioSubMenu(false);
  };
  const handleToggleAlimentiSubMenu = () => {
    setShowAlimentiSubMenu(!showAlimentiSubMenu);
    setShowRicettarioSubMenu(false);
  };
  const handleToggleRicettarioSubMenu = () => {
    setShowRicettarioSubMenu(!showRicettarioSubMenu);
    setShowAlimentiSubMenu(false);
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
            <h1>
              <i className="bi bi-list"></i>
            </h1>
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
                  <BiCaretRight
                    className={showAlimentiSubMenu ? "rotate-icon" : ""}
                  />
                </div>
                {showAlimentiSubMenu && (
                  <ul className="submenu mt-2">
                    <li>
                      <a href="#frutta" onClick={handleClose}>
                        Frutta
                      </a>
                    </li>
                    <li>
                      <a href="#verdura" onClick={handleClose}>
                        Verdura
                      </a>
                    </li>
                    <li>
                      <a href="#ortaggi" onClick={handleClose}>
                        Ortaggi
                      </a>
                    </li>
                    <li>
                      <a href="#carne" onClick={handleClose}>
                        Carne
                      </a>
                    </li>
                  </ul>
                )}
                <hr />
                <div
                  className="menu-item"
                  onClick={handleToggleRicettarioSubMenu}
                >
                  <span>Ricettario</span>
                  <BiCaretRight
                    className={showRicettarioSubMenu ? "rotate-icon" : ""}
                  />
                </div>
                {showRicettarioSubMenu && (
                  <ul className="submenu mt-2 ">
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
          <Link
            to="/calendar"
            className="navbar-brand link-navbar"
          >
            <h1>
              <i className="bi bi-calendar4-week"></i>
            </h1>
          </Link>
          <Link
            to="/"
            className="navbar-brand link-navbar"
          >
            <h1>
              <i className="bi bi-house"></i>
            </h1>
          </Link>
          <Link
            to="/shoppingbasket"
            className="navbar-brand link-navbar"
          >
            <h1>
              <i className="bi bi-basket3"></i>
            </h1>
          </Link>
          <Link
            to="/login"
            className="navbar-brand link-navbar"
          >
            <h1>
              <i className="bi bi-person-circle"></i>
            </h1>
          </Link>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;