import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCustomerOrder } from "../../features/order/orderSlice";
import { 
    changeRating,
    addItemRating,
    clearItemsForRating,
 } from "../../features/itemRating/itemRatingSlice";

import Card from 'react-bootstrap/Card';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import StarRatings from 'react-star-ratings';

const RateOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { currentRestaurant } = useSelector(
        (state) => state.restaurants    
    );

    const { itemRatings } = useSelector(
        (state) => state.itemRating
    );

    const handleChangeRating = (rating, menuItem) => {
        const item = {
            menuItem,
            rating
        }

        dispatch(changeRating(item));
    }

    const handleSubmitRating = () => {

        const submitRatings = itemRatings.map((item) => {
            const data = {
                restaurant: item.restaurant,
                menuItem: item.menuItem,
                rating: item.rating,
            }
            return dispatch(addItemRating(data));
        });

        if (!!submitRatings) {
            dispatch(clearItemsForRating());
            console.log('ratings submitted')
            navigate('/');
        }
    };

    const handleSkipRating = () => {
        dispatch(clearItemsForRating());
        navigate('/');
    }
    
    useEffect(() => {
        if(itemRatings.length == null || itemRatings.length == 0) {
            navigate('/');
        }
    }, [ itemRatings ])    

    return (
        <>
            <div>
                <h2>Thank you for dining at our restaurant</h2>
                <h4>Please leave some ratings on your ordered items</h4>
            </div>
        
            { itemRatings.length > 0 &&  
                itemRatings.map((item, index) => (
                <div
                    key={item.menuItem}>

                    <div>
                        {item.menuItem}
                    </div>
                    <div>
                        {item.name}
                    </div>

                        <StarRatings
                        name={item.menuItem}
                        changeRating={handleChangeRating}
                        starRatedColor="red"
                        numberOfStars={10}
                        rating={item.rating}
                        starDimension="20px"
                        starSpacing="5px" />               
                <hr></hr>
                </div>
                )) 
            }

            <Button onClick={handleSubmitRating}>Submit Rating</Button>
            or 
            <Button onClick={handleSkipRating}>Skip Rating</Button>
        </>
    );
}

export default RateOrder;