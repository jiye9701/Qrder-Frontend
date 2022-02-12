import React, { useEffect, useState } from "react";
import CartSingleItem from "./CartSingleItem";
import { getAllOrder } from "../Controller/api";
import { NavLink } from "react-router-dom";
import logoPNG from "../images/qrder-logo.png";

function OrderItem() {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    let url = window.location.pathname;
    let id = window.location.hash;
    let path = url.split("/").reverse();
    let table_id = path[0] + id;

    //console.log("table id ", tableId);

    const response = await getAllOrder();
    //console.log(response.data);
    setOrder(response.data);

    let result = response.data.find(({ tableId }) => tableId === `${table_id}`);
    console.log("dsf", result);
    console.log("dsf", result.occupiedOrder.orderedItems);
    if (result.occupiedOrder != null) {
      setOrder(result.occupiedOrder.orderedItems);
    }
  };
  return (
    <div className="card">
      <img alt="Qrder Logo" className="logo" src={logoPNG} />

      <div
        className="printme"
        style={{ padding: "40px", border: "1px solid black" }}
      >
        <h2 style={{ marginBottom: "10px", textAlign: "center" }}>
          PAYMENT SUCCESSFUL
        </h2>
        <h4 style={{ marginBottom: "10px", textAlign: "center" }}>
          ORDER OVERVIEW
        </h4>
        {order.map((data) => (
          <CartSingleItem
            key={data.id}
            itemId={data.id}
            itemTitle={data.name}
            itemPrice={data.price}
          />
        ))}

        <div className="product-item" style={{ marginTop: "20px" }}>
          <span className="item-id"></span>
          <h4 className="item-name" style={{ paddingLeft: "40px" }}>
            Total
          </h4>
          <h4 className="item-price">
            $ {order.reduce((a, b) => (a = a + b.price), 0)}
          </h4>
        </div>
      </div>
      <div
        className="item-center no-printme"
        style={{ marginTop: "40px", marginBottom: "40px" }}
      >
        {/* When the user clicks on this button, the current order must be deleted and the table will be cleared */}
        <NavLink to="/" className="btn text-center">
          {" "}
          Clear the table{" "}
        </NavLink>
        <NavLink to="/" className="btn text-center">
          {" "}
          Home{" "}
        </NavLink>
        <p onClick={() => window.print()} className="btn text-center">
          {" "}
          Print Receipt{" "}
        </p>
      </div>
    </div>
  );
}

export default OrderItem;
