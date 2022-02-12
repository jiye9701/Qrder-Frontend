import React, { useEffect, useState } from "react";
import Todo from "./MenuItem";
import { getAllMenu } from "../Controller/api";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../redux/reducer";
import logoPNG from "../images/qrder-logo.png";

function Product() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    let url = window.location.pathname;
    let path = url.split("/").reverse();
    let rest_id = path[1];
    let table_id = path[0] + window.location.hash;

    let response = await getAllMenu();
    console.log("response data ", response.data);
    let result = response.data.find(
      ({ restaurantId }) => restaurantId === `${rest_id}`
    );

    dispatch({
      type: "SET_DATA",
      tableId: table_id,
      restaurantId: rest_id,
    });

    setMenu(result.menus);
    setRestaurantName(result.restaurantName);
  };

  return (
    <div>
      <img alt="Qrder Logo" className="logo" src={logoPNG} />

      <h1>{restaurantName}</h1>

      {menu.map((data) => (
        <Todo
          key={data.name}
          dishTitle={data.name}
          dishDescription={data.price}
        />
      ))}

      <div className="item-center">
        <NavLink to="/cart" className="btn text-center">
          {" "}
          View Cart{" "}
        </NavLink>
      </div>
    </div>
  );
}

export default Product;
