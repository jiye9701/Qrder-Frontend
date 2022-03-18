import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRestaurantById } from '../../features/restaurant/restaurantSlice';

import OrderForm from '../../components/order/OrderForm';
import MenuItem from '../../components/menu/MenuItem';

const Restaurant = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const { currentRestaurant, systemMessage } = useSelector((state) => state.restaurants);
    
    useEffect(() => {
        if (!currentRestaurant) {
            console.log('no res found');
        }
        
        dispatch(getRestaurantById(params.restaurant_id));

    }, [ systemMessage ]);
    
    return(
        <>
            <OrderForm />

            <div>
                { currentRestaurant.menuItems && currentRestaurant.menuItems.map((menuItem) => (
                    <MenuItem
                        key={menuItem._id}
                        menuItem={menuItem}/>
                    
                ))}
            </div>
        </>
    );
};

export default Restaurant;