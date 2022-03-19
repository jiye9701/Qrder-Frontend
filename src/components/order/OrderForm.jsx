import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { 
    clearCart,
    decreaseCart,
    getTotals,
 } from '../../features/order/orderSlice';
 
import { addOrder } from '../../features/order/orderSlice';

import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

const OrderForm = (props) => {
    const dispatch = useDispatch();

    const { orderItems, orderTotalQuantity, orderTotalAmount } = useSelector((state) => state.order);
    const { currentRestaurant } = useSelector(
        (state) => state.restaurants
    )
    
    useEffect(() => {
        dispatch(getTotals());
    }, [ orderItems, orderTotalQuantity, orderTotalAmount, dispatch ]);
    
    
    const handleDecreaseCart = (item) => {
        dispatch(decreaseCart(item));
    }
    
    const handleClearCart = () => {
        dispatch(clearCart());
    }
    
    const handleSubmitOrder = () => {

        const menuItemsArray = []; 

        // pick only _id (for pushing to order's 
        // menuItems menuItem objectId reference)
        // and quantity
        orderItems.map(
            ({ _id, quantity }) => menuItemsArray.push({ menuItem: _id, quantity })
        );

        const orderData = {
            restaurantId: currentRestaurant._id,
            data: {
                // TODO: set tip feature later
                tip: 0,
                menuItems: menuItemsArray
            },
        }

        console.log(orderData)
        dispatch(addOrder(orderData));
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
                        { orderItems && 
                            orderItems.length > 0 ? (orderItems.map((item, i) => (
                            <ListGroupItem key={item._id}>
                            <CloseButton onClick={() => handleDecreaseCart(item)}/> 
                            {item.name} ${item.price} x {orderItems[i].quantity}  
                            </ListGroupItem>
                        ))) : (
                            <div>
                                No Items Yet
                            </div>
                        )}
                    </ListGroup>
                    
                    </Card.Body>
                    <Card.Footer>
                        <ListGroup>
                            <ListGroupItem>
                                Total Cost: ${orderTotalAmount}
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button onClick={handleSubmitOrder}>Submit Order</Button>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button onClick={handleClearCart}>Clear Cart</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card.Footer>
                </Card>        
            </div>
        </>
    );
}

export default OrderForm;