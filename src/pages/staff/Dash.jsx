import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  getRestaurantById,
  getAllItemRatings,
  getDayTotalSale,
  getDayTotalTip,
} from '../../features/restaurant/restaurantSlice';

import MenuItem from '../../components/menu/MenuItem';
import { Button } from 'react-bootstrap';
import EditModal from '../../components/menu/EditModal';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

const Dash = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [editModalBool, setEditModalBool] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});
  const [createModeBool, setCreateModeBool] = useState(false);

  const editModalCallBack = (show, itemData) => {
    setEditModalBool(show);
    setItemToEdit(itemData);
    setCreateModeBool(false);
  };

  const createModalCallBack = () => {
    setEditModalBool(true);
    setItemToEdit({});
    setCreateModeBool(true);    
  }

  const handleCallbackHide = (hide) => {
    setEditModalBool(hide);
  };

  const { currentRestaurant, message } = useSelector(
    (state) => state.restaurants
  );

  useEffect(() => {
    dispatch(getRestaurantById(params.restaurant_id)).then(() => {
      dispatch(getAllItemRatings(params.restaurant_id));
      dispatch(getDayTotalSale(params.restaurant_id));
      dispatch(getDayTotalTip(params.restaurant_id));
    });
  }, []);

  return (
    <>
      <EditModal
        show={editModalBool}
        createMode={createModeBool}
        handleCallbackHide={handleCallbackHide}
        menuItem={itemToEdit}
      />

      <Button onClick={() => navigate(-1)}>Back</Button>

      <Button onClick={() => createModalCallBack()}>Add Item</Button>

      <Card border='info' style={{ width: '18rem' }}>
        <Card.Header>
          {currentRestaurant.name} - Daily (24hrs) Stats
        </Card.Header>
        <Card.Body>
          <Card.Title> Sales</Card.Title>
          {!currentRestaurant.totalDaySale ? (
            <Spinner animation='border' />
          ) : (
            <Card.Text>${currentRestaurant.totalDaySale}</Card.Text>
          )}
        </Card.Body>
        <Card.Body>
          <Card.Title> Tips</Card.Title>
          {!currentRestaurant.totalDayTip ? (
            <Spinner animation='border' />
          ) : (
            <Card.Text>${currentRestaurant.totalDayTip}</Card.Text>
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
                dash={true}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default Dash;
