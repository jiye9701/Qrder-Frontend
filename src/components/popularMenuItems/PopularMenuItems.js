import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const PopularMenuItems = (props) => {
  // Get all orders restaurnt by id
  // iterate through each record and add each item
  const [popularMenuItems, setPopularMenuItems] = useState([]);

  useEffect(() => {
    let unsortedMap = getRestaurantOrdersAndQuantity();
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
    <div>
      <Card border='gray'>
        <Card.Header as='h4'>Popular Menu Items</Card.Header>
        <Card.Body>
          {popularMenuItems.length > 1 ? (
            popularMenuItems.map(function (menuItem, index = 1) {
              return <h3>{index + 1 + '. ' + menuItem.data.name}</h3>;
            })
          ) : (
            <h1>Unable to retrieve most popular menu items...</h1>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PopularMenuItems;

const getRestaurantOrdersAndQuantity = async (restaurantId) => {
  var restaurantId = '6234e033b1323fc51f357de7';
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
