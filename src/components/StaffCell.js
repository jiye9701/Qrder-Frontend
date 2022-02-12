import React from "react";
import { NavLink } from "react-router-dom";

const TableCell = ({ tableNumber, tableId }) => {
  return (
    <div className="card">
      <h2>
        <NavLink to={`/pay/${tableId}`}>{tableNumber}</NavLink>
      </h2>
    </div>
  );
};

TableCell.defaultProps = {
  tableNumber: "Table 1",
};

export default TableCell;
