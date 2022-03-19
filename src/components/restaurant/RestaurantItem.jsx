import { useNavigate } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRestaurant } from '../../features/restaurant/restaurantSlice';
import { setRestaurantToUpdate } from '../../features/restaurant/restaurantSlice';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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

    const handleViewMenu = (restaurant) => {
        dispatch(setRestaurantToUpdate(restaurant));
        navigate(`/restaurants/${restaurant._id}`);
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
                        <ListGroup>
                            <ListGroupItem><Button onClick={handleEditRestaurant}>Edit</Button></ListGroupItem>
                            <ListGroupItem><Button onClick={handleDeleteRestaurant}>Delete</Button></ListGroupItem>
                            <ListGroupItem><Button onClick={() => handleViewMenu(props.restaurant)}>View Menu</Button></ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>        
            </div>

        </>
    );
}

export default RestaurantItem;