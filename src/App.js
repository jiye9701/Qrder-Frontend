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
import RestaurantsList from "./pages/restaurant/RestaurantsList";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Restaurant from "./pages/restaurant/Restaurant";
import ListCustomers from "./components/customer/ListCustomers";
import ShowCustomer from "./components/customer/ShowCustomer";
import RateOrder from "./components/order/RateOrder";
import ShowOrder from "./components/order/ShowOrder";
import Dash from "./pages/staff/Dash";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<QRScanner />} />
        <Route render={() => <ShowOrder />} path="/show/:id" />

        <Route path="/tables/:id" element={<Tables />} />
        <Route path="/product/:id/:tableId" element={<Product />} />
        <Route path="/cart" element={<CartItem />} />
        {/* <Route path="/success" element={<OrderSuccess />} /> */}

        <Route path="/pay/:id" element={<OrderItem />} />

        <Route path="/staff" element={<WaitStaff />} />
        <Route path="/selecttable" element={<TableSelection />} />

        <Route exact path="/restaurants" element={<RestaurantsList />} />

        <Route exact path="/restaurants/:restaurant_id" element={<Restaurant />} />


        <Route path="/customers" element={<ListCustomers />} />
        <Route path="/customers/:customer_id" element={<ShowCustomer />} />
        <Route exact path="/order-success" element={<OrderSuccess />} />

        <Route exact path="/rate-order" element={<RateOrder />} />

        <Route exact path='/staffDash/:restaurant_id' element={
          <Dash />
        } />

        <Route path="/showOrder" element={<ShowOrder />} />
        

        {/* <Route path='/print' element={ <PrintData />} /> */}
      </Routes>
    </Router>
  );
}
export default App;
