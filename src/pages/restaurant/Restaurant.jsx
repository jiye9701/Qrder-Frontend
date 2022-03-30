import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getRestaurantById } from '../../features/restaurant/restaurantSlice';

import OrderForm from '../../components/order/OrderForm';
import MenuItem from '../../components/menu/MenuItem';

const Restaurant = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { currentRestaurant, systemMessage } = useSelector((state) => state.restaurants);

    const { itemRatings } = useSelector((state) => state.itemRating);
    
    useEffect(() => {
        if (itemRatings.length != null && itemRatings.length != 0) {
            navigate('/rate-order');
        }

        dispatch(getRestaurantById(params.restaurant_id));

        console.log('page loaded')
        
    }, [ systemMessage, itemRatings ]);
    
    return(
        <>
            { !currentRestaurant || !currentRestaurant.menuItems ? (
                <div>
                    <h1>
                        Invalid Restaurant
                    </h1>
                </div>
            ) : (
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
            )}
            
        </>
    );
};

export default Restaurant;