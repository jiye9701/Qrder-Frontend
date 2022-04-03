import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
//import { withRouter } from "react-router-dom";
//import { getAllOrder } from "../Controller/api";
const orderUrl =
"http://comp231qrderapi-dev.us-east-2.elasticbeanstalk.com/api/restaurant/50a96701adb6482088eb97342ea4bd8b/order";

export const getAllOrder1 = async () => {
  return await axios.get(`${orderUrl}`);
};


function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = getAllOrder1;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

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
         /* order.orderName === item.orderName &&
          order.section === item.section &&
          order.semester === item.semester*/
      )
    ) {
      array.push(item);
      return item;
    }
  });

  const displayAllorderTable = array.map((order, idx) => {
    return (
      <tr
        key={idx}
        onClick={() => {
          showDetail(order.order_id);
        }}
      >
        <td>{order.tip}</td>
       
      </tr>
    );
  });


  return (
    <div className="container">
      <div className="col-12 div-style">
        
        <h2 className="h2-style">List Of orders</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {/* <h3>
          orders for {data.firstName} {data.lastName}
        </h3> */}
        <div class="col-12 item-center paddings div-style">
          <h5>Click on order to see order details.</h5>
          </div>
          <div class="col-12 item-center paddings div-style">
          <table class="table table-primary">
            <thead class="thead-dark">
              <tr>
                <th>order Code</th>
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
