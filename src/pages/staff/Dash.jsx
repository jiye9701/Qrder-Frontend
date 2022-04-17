import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

import {
  getRestaurantById,
  getAllItemRatings,
  getDayTotalSale,
} from '../../features/restaurant/restaurantSlice';

import MenuItem from '../../components/menu/MenuItem';
import { Button } from "react-bootstrap";
import EditModal from "../../components/menu/EditModal";
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

const Dash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [editModalBool, setEditModalBool] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});

  const editModalCallBack = (show, itemData) => {
    setEditModalBool(show);
    setItemToEdit(itemData);
    console.log(show);
    console.log(itemData);
  };

  const handleCallbackHide = (hide) => {
    setEditModalBool(hide);
  }

  const {
    currentRestaurant,
    message,
  } = useSelector((state) => state.restaurants); 

  useEffect(() => {
    dispatch(getRestaurantById(params.restaurant_id)).then(() => {
      console.log('res info loaded');
      dispatch(getAllItemRatings(params.restaurant_id)).then(() => {
        console.log('res ratings loaded');
      });
      dispatch(getDayTotalSale(params.restaurant_id)).then(() => {
        console.log('total sale calculated');
      });
    });

  }, []);
  
  return (
    <>
    <EditModal 
      show={editModalBool} 
      handleCallbackHide={handleCallbackHide}
      menuItem={itemToEdit} />

    <Button onClick={() => navigate(-1)}>Back</Button>

      <Card border="info" style={{ width: '18rem' }}>
        <Card.Header>Sales</Card.Header>
        <Card.Body>
          <Card.Title>{currentRestaurant.name} 24hrs Sales</Card.Title>
          { !currentRestaurant.totalDaySale ? (
            <Spinner animation="border" />
          ) : (
            <Card.Text>
                ${currentRestaurant.totalDaySale}
            </Card.Text>
          )}
        </Card.Body>
      </Card>
      {!currentRestaurant || !currentRestaurant.menuItems ? (
        <div>
          <h1>Invalid Restaurant</h1>
        </div>
      ) : (
        <div>
          {currentRestaurant.menuItems && 
            currentRestaurant.menuItems.map((menuItem) => (
              <MenuItem 
                key={menuItem._id} 
                menuItem={menuItem}
                editModalCallback={editModalCallBack}
                dash={true} />
            ))}
        </div>
      )}
    </>
  );
}

export default Dash;