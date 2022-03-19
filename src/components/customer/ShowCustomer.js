import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import logoPNG from "../../images/qrder-logo.png";

function ShowCustomer(props) {

  let { id } = useParams();
  console.log(id)
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);

  const apiUrl = "http://localhost:5000/api/customers/" + id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
    <img alt="Qrder Logo" className="logo" src={logoPNG} />

    <div class="item-center">
        <div>
            {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span></Spinner> }    
            <h1>Name: {data.name}</h1>
            <p>Email: {data.email}</p>
            <p>Phone Number {data.phoneNumber}</p>
            <p>Date: {data.date}</p>
            <p>Orders {data.orders}</p>
        </div>
    </div>

  </div>
      
    
  );
}

export default ShowCustomer;
