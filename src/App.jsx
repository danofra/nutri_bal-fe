/* IMPORT REACT ROUTER */

import { BrowserRouter, Routes, Route } from "react-router-dom";

/* IMPORT BOOTSTRAP */

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

/* IMPORT COMPONENT */

import NavbarComponent from "./component/navbar/NavbarComponent.jsx";
import ContactnavComponent from "./component/navbar/ContactnavComponent.jsx";
import SinginComponent from "./component/login/SinginComponent.jsx";
import HomeComponent from "./component/home/HomeComponent.jsx";
import ShoppingbasketComponent from "./component/shopping_basket/ShoppingbasketComponent.jsx";
import FoodstorageComponent from "./component/shopping_basket/FoodstorageComponent.jsx";
import ShoppinglistComponent from "./component/shopping_basket/ShoppinglistComponent.jsx";
import CalendarComponent from "./component/calendar/CalendarComponent.jsx";
import FoodpyramidComponent from "./component/listmenu/FoodpyramidComponent.jsx";
import LoginComponent from "./component/login/LoginComponent.jsx";
import UserdetailsComponent from "./component/login/UserdetailsComponent.jsx";
import ProductlistComponent from "./component/listmenu/ProductlistComponent.jsx";
import AddRecipesComponent from "./component/recipes/AddRecipesComponent.jsx";

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
            <Route path="/login" element={<LoginComponent />} />
            <Route
              path="/shoppingbasket"
              element={<ShoppingbasketComponent />}
            />
            <Route path="/foodstorage" element={<FoodstorageComponent />} />
            <Route path="/shoppinglist" element={<ShoppinglistComponent />} />
            <Route path="/calendar" element={<CalendarComponent />} />
            <Route path="/foodpyramid" element={<FoodpyramidComponent />} />
            <Route path="/userdetails" element={<UserdetailsComponent />} />
            <Route
              path="/category/:category"
              element={<ProductlistComponent />}
            />
            <Route path="/addrecipies" element={<AddRecipesComponent />} />
          </Routes>
        </main>
        <footer></footer>
      </BrowserRouter>
    </>
  );
}

export default App;
