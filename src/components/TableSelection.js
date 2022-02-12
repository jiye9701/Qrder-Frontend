import React from "react";
import { NavLink } from "react-router-dom";
import logoPNG from "../images/qrder-logo.png";

const TableSelection = () => {
  return (
    <div>
      <img alt="Qrder Logo" className="logo" src={logoPNG} />
      <p className="tagline-paragraph">
        SELECT THE TABLE NUMBER TO START AN ORDER
      </p>
      <select class="select-tag">
        <option selected>Select a table</option>
        <option value="1">Table No 1</option>
        <option value="2">Table No 7</option>
        <option value="3">Table No 9</option>
      </select>
      <div className="item-center">
        <NavLink to="/product" className="btn text-center">
          {" "}
          Next{" "}
        </NavLink>
      </div>
    </div>
  );
};

export default TableSelection;
