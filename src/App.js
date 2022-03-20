import React from "react";
import Home from "./components/Home";
import QRCode from "./components/QRCode";
import Tables from "./components/Tables";
import Product from "./components/Product";
import CartItem from "./components/CartItem";
import OrderItem from "./components/OrderItem";
import TableSelection from "./components/TableSelection";
import WaitStaff from "./components/WaitStaff";
import QRScanner from "./components/QRScanner";
import OrderSuccess from "./components/order/OrderSuccess";
import Restaurant from "./pages/restaurant/Restaurant";
import RestaurantsList from "./pages/restaurant/RestaurantsList";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<QRScanner />} />

        <Route path="/tables/:id" element={<Tables />} />
        <Route path="/product/:id/:tableId" element={<Product />} />
        <Route path="/cart" element={<CartItem />} />
        {/* <Route path="/success" element={<OrderSuccess />} /> */}

        <Route path="/pay/:id" element={<OrderItem />} />

        <Route path="/staff" element={<WaitStaff />} />
        <Route path="/selecttable" element={<TableSelection />} />

        <Route exact path="/restaurants" element={<RestaurantsList />} />

        <Route exact path="/restaurants/:restaurant_id" element={<Restaurant />} />

        <Route exact path="/order-success" element={<OrderSuccess />} />

        {/* <Route path='/print' element={ <PrintData />} /> */}
      </Routes>
    </Router>
  );
}
export default App;
