import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

import {
  getRestaurantById,
  getAllItemRatings,
} from '../../features/restaurant/restaurantSlice';

import MenuItem from '../../components/menu/MenuItem';
import { Button } from "react-bootstrap";
import EditModal from "../../components/menu/EditModal";

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
    });

  }, []);
  
  return (
    <>
    <EditModal 
      show={editModalBool} 
      handleCallbackHide={handleCallbackHide}
      menuItem={itemToEdit} />

    <Button onClick={() => navigate(-1)}>Back</Button>
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