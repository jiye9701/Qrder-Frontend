import React from "react";

function CartSingleItem(props) {
  return (
    <>
      <div className="product-item">
        <h4 className="item-id">{props.itemId}</h4>
        <h4 className="item-name">{props.itemTitle}</h4>
        <h4 className="item-price">$ {props.itemPrice}</h4>
      </div>
    </>
  );
}

export default CartSingleItem;
