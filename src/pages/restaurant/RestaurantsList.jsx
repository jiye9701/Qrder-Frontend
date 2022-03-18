import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants, reset, setRestaurantToUpdate } from "../../features/restaurant/restaurantSlice";

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import RestaurantItem from '../../components/restaurant/RestaurantItem';
import RestaurantForm from '../../components/restaurant/RestaurantForm';
import EditModal from '../../components/restaurant/EditModal';

const RestaurantsList = (props) => {
    const dispatch = useDispatch();

    const { restaurantList, restaurantToUpdate, systemMessage } = useSelector((state) => state.restaurants);
    
    useEffect(() => {
        dispatch(getRestaurants());

        return () => {
            dispatch(reset());
        }
    }, [ systemMessage ]);

    // modal show/hide state
    const [editModal, setEditModal] = useState(false);
    
    const handleCallback = (resItemData, resToUpdate) => {
      setEditModal(resItemData);
      dispatch(setRestaurantToUpdate(resToUpdate));
    }

    const handleCallbackHide = (editResModalData) => {
      setEditModal(editResModalData);
    }
  
    return (
      <>
        
        <div> 
          <RestaurantForm />
        </div>
        <div>
          <CardGroup>
            { restaurantList && restaurantList.map((res) => (
                <RestaurantItem
                    key={res._id}
                    restaurant={res}
                    handleCallback = {handleCallback}
                    />
            ))}
          </CardGroup>  
        </div>
        
        <EditModal 
          show={editModal}
          onHide={() => setEditModal(false)}
          handleCallbackHide={handleCallbackHide}/>

      </>
    );
}

export default RestaurantsList;