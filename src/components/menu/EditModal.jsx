import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { 
  updateItem,
  addItem,
} from '../../features/restaurant/restaurantSlice';

const EditModal = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  const [itemData, setItemData] = useState({
    _id: '',
    restaurant: params.restaurant_id,
    name: '',
    price: 0.0,
    description: '',
  });

  const handleCallbackHide = (e) => {
    setItemData({
      _id: '',
      restaurant: '',
      name: '',
      price: 0.0,
      description: ''
    });
    
    props.handleCallbackHide(false);
  };

  const handleChange = (e) => {
    setItemData({
      ...itemData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    // if create mode then dispatch addItem
    // if not create mode then dispatch updateItem
    if (!!props.createMode) {
      dispatch(addItem(itemData));
    } else {
      dispatch(updateItem(itemData));
    }

    handleCallbackHide();
  }

  useEffect(() => {
    // if create mode is false 
    // then set default values from props
    if(props.createMode) {
      setItemData({
        restaurant: params.restaurant_id,
        name: '',
        price: 0,
        description: '',
      });
    } else {
      setItemData({
        _id: props.menuItem._id,
        restaurant: props.menuItem.restaurant,
        name: props.menuItem.name,
        price: props.menuItem.price,
        description: props.menuItem.description ? props.menuItem.description : '',
      })
    }

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
              {!!props.createMode ? (
                <Modal.Title id="contained-modal-title-vcenter">
                  Create Menu Item
                </Modal.Title>
              ) : ( 
                <Modal.Title id="contained-modal-title-vcenter">
                  Edit Menu Item
                </Modal.Title>
              )}
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
                      as='textarea'
                      rows={3}
                      defaultValue={props.menuItem.description}
                      onChange={handleChange}/>

              </Form.Group>

          </Modal.Body>
          
          <Modal.Footer>
              <Button onClick={handleCallbackHide}>Close</Button>
              {!!props.createMode ? (
                <Button onClick={handleUpdateSubmit}>
                  Add Item
                </Button>
              ) : (
                <Button onClick={handleUpdateSubmit}>
                  Update
                </Button>
              )}
          </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditModal;