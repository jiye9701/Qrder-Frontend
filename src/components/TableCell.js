import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const TableCell = ({ tableNumber, tableId }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    let url = window.location.pathname;
    let path = url.split("/").reverse();
    let realUrl = path[0];

    setUrl(realUrl);
  }, []);

  return (
    <div className="card">
      <h2>
        <NavLink to={`/product/${url}/${tableId}`}>{tableNumber}</NavLink>
      </h2>
    </div>
  );
};

TableCell.defaultProps = {
  tableNumber: "Table 1",
};

export default TableCell;
