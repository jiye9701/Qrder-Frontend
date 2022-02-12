import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartSingleItem from "./CartSingleItem";
import { payOrder } from "../Controller/api";
import logoPNG from "../images/qrder-logo.png";

function CartItem() {
  const navigate = useNavigate();

  //const counter = useSelector(state => state);
  const orders = useSelector((state) => state.ordersReducer.orders);
  const total = useSelector((state) => state.ordersReducer.total);
  const table_id = useSelector((state) => state.ordersReducer.tableId);
  const restaurant_id = useSelector(
    (state) => state.ordersReducer.restaurantId
  );
  const orderState = useSelector((state) => state.ordersReducer.orderId);

  console.log("Order State: " + orderState);

  console.log("asfe ", restaurant_id);
  console.log("12321312 ", table_id);

  console.log("orders  ", orders);
  const dispatch = useDispatch();

  const handlerPay = () => {
    let data = {};
    data["tableGuid"] = table_id;
    data["restaurantId"] = restaurant_id;
    data["orderedItems"] = orders;
    let response = payOrder(data);
    console.log(response);
    navigate(`/success`);
    console.log("data = " + data);
  };

  return (
    <div className="card">
      <img alt="Qrder Logo" className="logo" src={logoPNG} />

      <h2 style={{ marginBottom: "40px", textAlign: "center" }}>CART</h2>

      {orders &&
        orders.map((data) => (
          <CartSingleItem
            key={data.id}
            itemTitle={data.title}
            itemPrice={data.price}
          />
        ))}

      <div className="product-item" style={{ marginTop: "50px" }}>
        <span className="item-id"></span>
        <h4 className="item-name" style={{ paddingLeft: "40px" }}>
          Total
        </h4>
        <h4 className="item-price">$ {total}</h4>
      </div>
      <div className="item-center" style={{ marginTop: "40px" }}>
        <button className="btn text-center" onClick={handlerPay}>
          {" "}
          Place an order{" "}
        </button>
      </div>
    </div>
  );
}

export default CartItem;
