import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import ShoppinglistComponent from "./ShoppinglistComponent";
import FoodstorageComponent from "./FoodstorageComponent";

function ShoppingbasketComponent() {
  const [selectedTab, setSelectedTab] = useState("shoppinglist");
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (eventKey) => {
    setSelectedTab(eventKey);
  };
  const updateSelectedItems = (items) => {
    setSelectedItems(items);
  };

  return (
    <>
      <Nav
        className="ms-2 mt-3 me-2 "
        variant="tabs"
        defaultActiveKey="shoppinglist"
        onSelect={handleSelect}
      >
        <Nav.Item>
          <Nav.Link className="text-black" eventKey="shoppinglist">
            Lista della spesa
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="text-black" eventKey="foodstorage">
            Dispensa
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {selectedTab === "shoppinglist" && (
        <ShoppinglistComponent updateSelectedItems={updateSelectedItems} />
      )}
      {selectedTab === "foodstorage" && (
        <FoodstorageComponent selectedItems={selectedItems} />
      )}
    </>
  );
}

export default ShoppingbasketComponent;
