import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    getRestaurantById,
    getAllItemRatings
} from '../../features/restaurant/restaurantSlice';

import OrderForm from '../../components/order/OrderForm';
import MenuItem from '../../components/menu/MenuItem';
import { Spinner, Button } from 'react-bootstrap';

const Restaurant = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();


    const { currentRestaurant, message, isSuccess: getResSuccess } = useSelector((state) => state.restaurants);

    const { itemRatings } = useSelector((state) => state.itemRating);

    useEffect(() => {
        if (itemRatings.length != null && itemRatings.length != 0) {
            navigate('/rate-order');
        }
     
        dispatch(getRestaurantById(params.restaurant_id)).then(() => {
            console.log('restaurant info fetched');
        })
        dispatch(getAllItemRatings(params.restaurant_id)).then(() => {
            console.log('restaurant menu ratings fetched');
        })
        
    }, []);
    
    
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