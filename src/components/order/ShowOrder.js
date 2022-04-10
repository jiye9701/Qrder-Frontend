import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
//import { withRouter } from "react-router-dom";
//import { getAllOrder } from "../Controller/api";
const apiUrl =
"/api/orders";

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const fetchData = async () => {
    const result = await axios(apiUrl);
    setData(result.data);
    setShowLoading(false);
  };

  useEffect(() => {

    fetchData();
  }, []);

  const showDetail = id => {
    props.history.push({
      pathname: "/show/" + id
    });
  };

  let array = [];
  data.map(item => {
    if (
      !array.find(
        order =>
              order.tip === item.tip
      )
    ) 
    {
      array.push(item);
      return item;
    }
  });
  let aq=0;
  const displayAllorderTable = array.map((order) => {
    return (
      <tr>
        <td>{order.date}</td>
        <td>{order.totalCost}</td>
        <td>{order.tip}</td>
        <td>{aq= order.tip+aq}</td>
      </tr>
    );
  });


  return (
    <div className="container">
      <div className="col-12 div-style">
        
        <h2 className="h2-style">List Of Orders</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {/* <h3>
          orders for {data.firstName} {data.lastName}
        </h3> */}
        <div class="col-12 item-center paddings div-style">
          <h5></h5>
          </div>
          <div class="col-12 item-center paddings div-style">
          <table class="table table-primary">
            <thead class="thead-dark">
              <tr>
                <th>Order Date</th>
                <th>Total Cost</th>
                <th>Amount of Tip</th>
                <th>Total Amount of Tip</th>
              </tr>
            </thead>
            <tbody class="tr">{displayAllorderTable}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default List;
