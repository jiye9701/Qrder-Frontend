import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    addToCart,
    clearCart,
    decreaseCart,
    getTotals,
    removeFromCart
 } from '../../features/order/orderSlice';
 
import Card from 'react-bootstrap/Card';

import CloseButton from 'react-bootstrap/CloseButton';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const OrderForm = (props) => {
    const dispatch = useDispatch();

    const { orderItems, orderTotalQuantity, orderTotalAmount } = useSelector((state) => state.order);
    
    useEffect(() => {
        dispatch(getTotals());
    }, [ orderItems, orderTotalQuantity, orderTotalAmount, dispatch ]);
    
    const handleAddToCart = (item) => {
        dispatch(addToCart(item));
    }

    const handleDecreaseCart = (item) => {
        dispatch(decreaseCart(item));
    }

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item));
    }

    const handleClearCart = () => {
        dispatch(clearCart());
    }

    return (
        <>
            <div>

                <Card border='light'>
                    <Card.Header as='h5'>
                        Your Order
                    </Card.Header>
                    <Card.Body>
                    <ListGroup>
                        { orderItems && orderItems.map((item, i) => (
                            <ListGroupItem key={item._id}>
                                {item.name} {item.price} x {orderItems[i].quantity}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    
                    </Card.Body>
                    <Card.Footer>
                        Total Cost: {orderTotalAmount}
                        <Card.Link href='#' onClick={() => console.log(orderItems)}>Show object</Card.Link>
                    </Card.Footer>
                </Card>        
            </div>
        </>
    );
}

export default OrderForm;