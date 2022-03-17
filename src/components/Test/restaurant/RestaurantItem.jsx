import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import Card from 'react-bootstrap/Card';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getRestaurantById, deleteRestaurant } from '../../../features/restaurant/restaurantSlice';

const RestaurantItem = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEditRestaurant = () => {
        // send signal to parent to show Edit Restaurant modal
        // also send the id of the restaurant to eventually send to 
        // the edit modal component to populate form with data
        props.handleCallback(true, props.restaurant);
    }

    const handleDeleteRestaurant = () => {
        dispatch(deleteRestaurant(props.restaurant._id));
    }

    return(
        <>
            <div>

                <Card border='light' style={{ width: '18rem' }}>
                    <Card.Header as='h5'>
                        {props.restaurant.name}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>{props.restaurant._id}</Card.Text>
                        <Card.Text>
                            Is Open: {props.restaurant.isOpen.toString()} 
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <ListGroupItem><Card.Link href='#' onClick={handleEditRestaurant}>Edit</Card.Link></ListGroupItem>
                        <ListGroupItem><Card.Link href='#' onClick={handleDeleteRestaurant}>Delete</Card.Link></ListGroupItem>

                    </Card.Body>
                </Card>        
            </div>

        </>
    );
}

export default RestaurantItem;