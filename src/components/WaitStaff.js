import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logoPNG from "../images/qrder-logo.png";
import StaffCell from "./StaffCell";
import { getAllOrder } from "../Controller/api";

const WaitStaff = ({ restaurantName }) => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    getTables();
  }, []);

  const getTables = async () => {
    let response = await getAllOrder();
    console.log("response data", response.data[5].occupiedOrder.orderedItems);
    console.log("response data", response.data);
    setTables(response.data);
  };

  return (
    <div>
      <img alt="Qrder Logo" className="logo" src={logoPNG} />
      <h1>{restaurantName}</h1>

      {tables.map((table) => {
        if (table.occupiedOrder !== null) {
          return (
            <StaffCell
              key={table.tableId}
              tableNumber={table.tableName}
              tableId={table.tableId}
            />
          );
        }
      })}
      <div className="item-center">
        <NavLink
          to="/tables/50a96701adb6482088eb97342ea4bd8b"
          className="btn text-center"
        >
          {" "}
          Start a new order{" "}
        </NavLink>
      </div>
    </div>
  );
};

WaitStaff.defaultProps = {
  restaurantName: "Richmond Station",
};

export default WaitStaff;
