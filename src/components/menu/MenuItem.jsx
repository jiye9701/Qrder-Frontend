import { useDispatch } from 'react-redux';
import { 
    addToCart,
} from '../../features/order/orderSlice';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
                        <Button onClick={() => handleAddToBasket(props.menuItem)}>Add To Card</Button>                        
                    </Card.Body>
                </Card>        
            </div>

        </>
    )
}

export default MenuItem;