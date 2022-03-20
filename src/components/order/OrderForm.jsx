import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Spinner } from 'react-bootstrap';

const OrderForm = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orderItems, orderTotalAmount, status } = useSelector((state) => state.order);
    const { currentRestaurant } = useSelector(
        (state) => state.restaurants
    )
    
    useEffect(() => {
        dispatch(getTotals());
    }, [ orderItems, dispatch ]);
    
    
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
            restaurant: currentRestaurant._id,
            data: {
                tip: 0,
                totalCost: orderTotalAmount,
                menuItems: menuItemsArray,
            },
        }
        dispatch(addOrder(orderData)).then(() =>{
            dispatch(clearCart());
            navigate('/order-success');
        });
    };


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
                                <Button onClick={handleSubmitOrder}>
                                { status === 'pending' && (
                                    <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        />
                                    </>
                                )}
                                    Submit Order</Button>
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