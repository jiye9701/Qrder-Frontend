import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCustomerOrder, updateOrder } from "../../features/order/orderSlice";

import Card from 'react-bootstrap/Card';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const OrderSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { customerOrder } = useSelector(
        (state) => state.order
    );

    const [ updatedOrder, setUpdatedOrder ] = useState({
        _id: customerOrder._id,
        tip: 5
    });

    useEffect(() => {
        if (!customerOrder._id) {
            navigate('/');
        }
    });
    
    const handleTipChange = (e) => {
        setUpdatedOrder(
            {
                ...updatedOrder,
                tip: e.target.value,
            }
        );
    }
    
    const handleSubmitTip = () => {
        dispatch(updateOrder(updatedOrder));
        dispatch(clearCustomerOrder());
        navigate('/');
    };

    return (
        <>
            <div>
                <h3>Order Placed!</h3>
                <h5>Thank you for dining with us</h5>
                <h5>Please give a tip to support your waiter</h5>
                
            </div>
            <div>
                    <Card border='light'>
                        <Card.Header as='h5'>
                            Your Order
                        </Card.Header>
                        <Card.Body>
                        <ListGroup>
                            { customerOrder && customerOrder.menuItems && customerOrder.menuItems.map((item, i) => (
                                <ListGroupItem key={item._id}>
                                {item.menuItem.name} ${item.menuItem.price} x {customerOrder.menuItems[i].quantity}  
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                        
                        </Card.Body>
                        <Card.Footer>
                            <ListGroup>
                                <ListGroupItem>
                                    Total Cost: ${customerOrder &&customerOrder.totalCost}
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Footer>
                    </Card>
                
            </div>
            
            <div>
                <label>
                    Tip: $
                    <input 
                        name='tip'
                        defaultValue={updatedOrder.tip}
                        type='number'
                        step=".01" 
                        onChange={(e) => handleTipChange(e)}
                        />
                </label>
                <Button onClick={handleSubmitTip}>Tip</Button>
            </div>
        </>
    );
};

export default OrderSuccess;