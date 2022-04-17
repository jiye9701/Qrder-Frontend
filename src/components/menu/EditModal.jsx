import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { updateItem } from '../../features/restaurant/restaurantSlice';

const EditModal = (props) => {
  const dispatch = useDispatch();

  const [updatedItem, setUpdatedItem] = useState({
    _id: '',
    restaurant: '',
    name: '',
    price: 0.0,
    description: '',
  });

  const handleCallbackHide = (e) => {
    setUpdatedItem({
      _id: '',
      restaurant: '',
      name: '',
      price: 0.0,
      description: ''
    });
    
    props.handleCallbackHide(false);
  };

  const handleChange = (e) => {
    setUpdatedItem({
      ...updatedItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log('menu item updated');
    dispatch(updateItem(updatedItem));

    handleCallbackHide();
  }

  useEffect(() => {
    setUpdatedItem({
      _id: props.menuItem._id,
      restaurant: props.menuItem.restaurant,
      name: props.menuItem.name,
      price: props.menuItem.price,
      description: props.menuItem.description ? props.menuItem.description : 'null',
    })

    console.log(updatedItem);
  }, [props.show]);

  return (
    <>
      <Modal
          show={props.show}
          onHide={handleCallbackHide}
          size='lg'
          aria-labelledby="contained-modal-title-vcenter"
          centered>

          <Modal.Header 
              closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                  Edit Menu Item
              </Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <Form.Group>
                  <Form.Label>Name: </Form.Label>
                  
                  <Form.Control 
                      name='name'
                      type='text' 
                      defaultValue={props.menuItem.name}
                      onChange={handleChange}/>

              </Form.Group>
              
              <Form.Group>
                  <Form.Label>Price: </Form.Label>
                  
                  <Form.Control 
                      name='price'
                      type='text' 
                      defaultValue={props.menuItem.price}
                      onChange={handleChange}/>

              </Form.Group>

              <Form.Group>
                  <Form.Label>Description: </Form.Label>
                  
                  <Form.Control 
                      name='description'
                      type='text' 
                      defaultValue={props.menuItem.description}
                      onChange={handleChange}/>

              </Form.Group>

          </Modal.Body>
          
          <Modal.Footer>
              <Button onClick={handleCallbackHide}>Close</Button>
              <Button onClick={handleUpdateSubmit}>Update</Button>
          </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditModal;