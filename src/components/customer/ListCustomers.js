import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import logoPNG from "../../images/qrder-logo.png";

function ListCustomers(props) {
    let navigate = useNavigate();
    
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [listError, setListError] = useState(false);
    const apiUrl = "/api/customers";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:', result.data)
          console.log('result.data.screen:', result.data.screen)
          setData(result.data)
        });
    };
    fetchData();
  }, []);

  const showDetail = (id) => {
    navigate('/customers/' + id);
  }

  return (
    <div>
      <img alt="Qrder Logo" className="logo-custom" src={logoPNG} />

      <div class="item-center">
      { data && data.length != 0 ? (
          <div>
          <ListGroup>
            {data && data.map((item, idx) => (
                <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.name} </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        ) : ( <div><h3>No customers were found.</h3></div> )
      }
    </div>

    </div>
  );
}
//
export default ListCustomers;