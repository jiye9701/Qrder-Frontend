import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import './popularMenuItems.css';

const PopularMenuItems = (props) => {
  const [restaurant, setRestaurant] = useState(props.restaurant);
  const [popularMenuItems, setPopularMenuItems] = useState([]);

  useEffect(() => {
    let unsortedMap = getRestaurantOrdersAndQuantity(restaurant._id);
    unsortedMap.then(function (result) {
      const sortedOrdersMap = new Map([...result].sort((a, b) => b[1] - a[1]));
      getMostPopularItems(sortedOrdersMap).forEach(function (promise) {
        promise.then(function (menuItem) {
          setPopularMenuItems((popularMenuItems) => [
            ...popularMenuItems,
            menuItem,
          ]);
        });
      });
    });
  }, []);

  return (
    <Card border='gray'>
      <Card.Header as='h4' className='page-title'>
        Today's Most Popular Items
      </Card.Header>
      <Card.Body>
        <div className='popular-items'>
          {popularMenuItems.length > 1 ? (
            popularMenuItems.map(function (menuItem, index = 1) {
              return <h3>{menuItem.data.name}</h3>;
            })
          ) : (
            <h1>Unable to retrieve most popular menu items...</h1>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PopularMenuItems;

const getRestaurantOrdersAndQuantity = async (restaurantId) => {
  try {
    const orders = await axios.get(`/api/orders/${restaurantId}`);
    let mappedMenuItemsToOrderQuanitity = new Map();
    // Iterates through each menuItem and quanittiy and maps it to mappedMenuItemsToOrderQuanitity to add up total amount ordered
    for (const { menuItems } of orders.data) {
      for (const { menuItem, quantity } of menuItems) {
        if (mappedMenuItemsToOrderQuanitity.has(menuItem)) {
          mappedMenuItemsToOrderQuanitity.set(
            menuItem,
            quantity + mappedMenuItemsToOrderQuanitity.get(menuItem)
          );
        } else {
          mappedMenuItemsToOrderQuanitity.set(menuItem, quantity);
        }
      }
    }
    return mappedMenuItemsToOrderQuanitity;
  } catch (error) {
    return error.message;
  }
};

const getMostPopularItems = (mapOfMenuItems) => {
  const currentMenuItem = mapOfMenuItems.entries();
  var counter = 0;
  var arrayOfPopularItemNames = [];
  while (counter != 3) {
    if (currentMenuItem) {
      arrayOfPopularItemNames.push(
        getMenuItemName(currentMenuItem.next().value[0])
      );
    }
    counter++;
  }
  return arrayOfPopularItemNames;
};

const getMenuItemName = async (menuItemId) => {
  const menuItem = await axios.get(`/api/menu-items/${menuItemId}`);
  return menuItem;
};
