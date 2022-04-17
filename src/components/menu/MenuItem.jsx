import { useDispatch } from 'react-redux';
import { 
    addToCart,
} from '../../features/order/orderSlice';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import StarRatings from 'react-star-ratings';
import { deleteItem } from '../../features/restaurant/restaurantSlice';

const MenuItem = (props) => {
    const dispatch = useDispatch();

    // staff dash view
    //
    // send data to parent
    const handleEditCallback = (itemData) => {
        props.editModalCallback(true, itemData);
    };

    // customer view
    const handleAddToBasket = (item) => {
        dispatch(addToCart(item));
    };

    // delete function omitted since 
    // deleting a menu item causes the 
    // popular menu items to fail 
    //
    // const handleDeleteItem = (id) => {
    //     dispatch(deleteItem(id));
    // }

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
                            Average Rating:
                            <StarRatings
                            numberOfStars={10}
                            starRatedColor="red"
                            rating={props.menuItem.averageRating}
                            starDimension="15px"
                            starSpacing="1px" />

                        </Card.Text>
                        <Card.Text>
                            {props.menuItem.description}
                        </Card.Text>
                        <Card.Text>
                            Price ${props.menuItem.price}
                        </Card.Text>
                    </Card.Body>
                    {props.dash ? (
                        <>
                            <Button onClick={() => handleEditCallback(props.menuItem)}>Edit</Button>
                            {/* <Button onClick={() => handleDeleteItem(props.menuItem._id)}>Delete</Button> */}
                        </>
                    ) : (
                        <Card.Body>
                            <Button onClick={() => handleAddToBasket(props.menuItem)}>Add To Cart</Button>                        
                        </Card.Body>
                    )}
                </Card>        
            </div>

        </>
    )
}

export default MenuItem;