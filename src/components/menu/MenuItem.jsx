import { useDispatch } from 'react-redux';
import { 
    addToCart,
} from '../../features/order/orderSlice';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import StarRatings from 'react-star-ratings';

const MenuItem = (props) => {
    const dispatch = useDispatch();

    if(props.dash) {
        console.log('staff dash');
    };

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
                        <Button onClick={() => handleEditCallback(props.menuItem)}>Edit</Button>
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