import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/order/orderSlice';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const MenuItem = (props) => {
    const dispatch = useDispatch();

    const handleAddToBasket = (item) => {
        dispatch(addToCart(item));
    };

    return (
        <>
            <div 
                key={props.menuItem._id}>

                <Card 
                    border='light' style={{ width: '18rem' }}>
                    <Card.Header as='h5'>
                        {props.menuItem.name}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {props.menuItem.price}
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Card.Link href='#' onClick={() => handleAddToBasket(props.menuItem)}>Add To Card</Card.Link>                        
                    </Card.Body>
                </Card>        
            </div>

        </>
    )
}

export default MenuItem;