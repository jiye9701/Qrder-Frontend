import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllItemRatings } from "../../features/itemRating/itemRatingSlice";

import Card from 'react-bootstrap/Card';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';


const RateOrderTest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { itemRatings, averageRatings, isSucces, isError, message } = useSelector(
        (state) => state.itemRating
    );

    const { currentRestaurant } = useSelector(
        (state) => state.restaurants
    );
    
    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getAllItemRatings(currentRestaurant._id));
        
    }, [ isError ]);

    console.log(itemRatings);
    
    return (
        <>
            
        </>
    );
}

export default RateOrderTest;