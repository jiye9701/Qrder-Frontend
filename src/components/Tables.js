import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logoPNG from "../images/qrder-logo.png";
import TableCell from "./TableCell";
import { getAllOrder } from "../Controller/api";

const Tables = ({ restaurantName }) => {
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
        if (table.occupiedOrder == null) {
          return (
            <TableCell
              key={table.tableId}
              tableNumber={table.tableName}
              tableId={table.tableId}
            />
          );
        }
      })}
    </div>
  );
};

Tables.defaultProps = {
  restaurantName: "Richmond Station",
};

export default Tables;
