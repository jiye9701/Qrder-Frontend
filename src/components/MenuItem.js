import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
// import { addorder } from '../Controller/api';
// //import axios from 'axios';

import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../redux/actions";

function Todo(props) {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function deleteHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  const handleAddCart = () => {
    dispatch({
      type: "ADD_CART",
      title: props.dishTitle,
      price: props.dishDescription,
    });
    closeModalHandler();
  };

  return (
    <div className="card">
      <h2>{props.dishTitle}</h2>
      <p>{props.dishDescription}</p>
      <div className="actions">
        <button className="btn" onClick={deleteHandler}>
          Add to cart
        </button>
      </div>
      {modalIsOpen && (
        <Modal onCancel={closeModalHandler} onConfirm={() => handleAddCart()} />
      )}
      {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
    </div>
  );
}

// export default connect(
//   null,
//   { addCart }
// )(Todo);
export default Todo;
