import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCustomerOrder } from '../../features/order/orderSlice';
import {
  changeRating,
  addItemRating,
  clearItemsForRating,
} from '../../features/itemRating/itemRatingSlice';

import { addServiceRating } from '../../features/serviceRating/serviceRatingSlice';

import Card from 'react-bootstrap/Card';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import StarRatings from 'react-star-ratings';

const RateOrder = (order) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentRestaurant } = useSelector((state) => state.restaurants);
  const { itemRatings } = useSelector((state) => state.itemRating);
  const [serviceRating, setServiceRating] = useState(0);

  const handleChangeServiceRating = (userInput) => {
    setServiceRating(userInput);
  };

  const handleChangeRating = (rating, menuItem) => {
    const item = {
      menuItem,
      rating,
    };

    dispatch(changeRating(item));
  };

  const handleSubmitRating = () => {
    const submitRatings = itemRatings.map((item) => {
      const data = {
        restaurant: item.restaurant,
        menuItem: item.menuItem,
        rating: item.rating,
      };
      return dispatch(addItemRating(data));
    });

    // If order id is retrievable from state adds it to api call to save in service rating
    if (order.order.orderList.length > 0) {
      const submitServiceRating = itemRatings.map((item) => {
        const data = {
          order: order.order.orderList[0].order._id,
          restaurant: item.restaurant,
          serviceRating: serviceRating,
        };
        return dispatch(addServiceRating(data));
      });
    } else {
      // Else if there is no order id in state it only adds restaurant id in api call
      const submitServiceRating = itemRatings.map((item) => {
        const data = {
          restaurant: item.restaurant,
          serviceRating: serviceRating,
        };
        return dispatch(addServiceRating(data));
      });
    }

    if (!!submitRatings) {
      dispatch(clearItemsForRating());
      navigate('/');
    }
  };

  const handleSkipRating = () => {
    dispatch(clearItemsForRating());
    navigate('/');
  };

  useEffect(() => {
    if (itemRatings.length == null || itemRatings.length == 0) {
      navigate('/');
    }
  }, [itemRatings]);

  return (
    <>
      <div>
        <h2>Thank you for dining at our restaurant</h2>
        <h4>Please leave some ratings on your ordered items</h4>
      </div>
      {itemRatings.length > 0 &&
        itemRatings.map((item, index) => (
          <div key={item.menuItem}>
            <div>{item.name}</div>

            <StarRatings
              name={item.menuItem}
              changeRating={handleChangeRating}
              starRatedColor='red'
              numberOfStars={10}
              rating={item.rating}
              starDimension='20px'
              starSpacing='5px'
            />
            <hr></hr>
          </div>
        ))}
      <div>
        <h4>And how was the overall service today?</h4>
        <StarRatings
          name={'serviceRating'}
          starHoverColor='blue'
          starRatedColor='blue'
          changeRating={handleChangeServiceRating}
          numberOfStars={10}
          rating={serviceRating}
          starDimension='20px'
          starSpacing='5px'
        />
      </div>
      <hr></hr>
      <Button onClick={handleSubmitRating}>Submit Rating</Button>
      or
      <Button onClick={handleSkipRating}>Skip Rating</Button>
    </>
  );
};

const mapStateToProps = (state) => ({
  order: state.order,
});

export default connect(mapStateToProps)(RateOrder);
