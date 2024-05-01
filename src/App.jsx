import "./App.css";
import NavbarComponent from "./component/navbar/NavbarComponent.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ContactnavComponent from "./component/navbar/ContactnavComponent.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SinginComponent from "./component/login/SinginComponent.jsx";
import HomeComponent from "./component/home/HomeComponent.jsx";
import ShoppingbasketComponent from "./component/shopping_basket/ShoppingbasketComponent.jsx";
import FoodstorageComponent from "./component/shopping_basket/FoodstorageComponent.jsx";
import ShoppinglistComponent from "./component/shopping_basket/ShoppinglistComponent.jsx";
import CalendarComponent from "./component/calendar/CalendarComponent.jsx";
import FoodpyramidComponent from "./component/listmenu/FoodpyramidComponent.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <ContactnavComponent />
          <NavbarComponent />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/singin" element={<SinginComponent />} />
            <Route
              path="/shoppingbasket"
              element={<ShoppingbasketComponent />}
            />
            <Route path="/foodstorage" element={<FoodstorageComponent />} />
            <Route path="/shoppinglist" element={<ShoppinglistComponent />} />
            <Route path="/calendar" element={<CalendarComponent />} />
            <Route path="/foodpyramid" element={<FoodpyramidComponent />} />
          </Routes>
        </main>
        <footer></footer>
      </BrowserRouter>
    </>
  );
}

export default App;
