import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { updateRestaurant } from '../../features/restaurant/restaurantSlice';

const EditResModal = (props) => {
    const dispatch = useDispatch();

    const handleCallbackHide = (e) => {
        props.handleCallbackHide(false);
    }

    const { restaurantToUpdate, systemMessage } = useSelector((state) => state.restaurants);

    const handleChange = (e) => {
        setUpdatedRestaurant({
            ...updatedRestaurant,
            [e.target.name]: e.target.value,
        });
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        console.log(updatedRestaurant);
        
        dispatch(updateRestaurant(updatedRestaurant));

        handleCallbackHide();
    }

    const [updatedRestaurant, setUpdatedRestaurant] = useState({
        _id: '',
        name: '',
        isOpen: false,
    });

    useEffect(() => {
        if (systemMessage) {
            console.log(systemMessage);
        }
        
        setUpdatedRestaurant({
            _id: restaurantToUpdate._id,
            name: restaurantToUpdate.name,
            isOpen: restaurantToUpdate.isOpen,
        })
    }, [ restaurantToUpdate, systemMessage ])

    return (
        <>
            <Modal
                show={props.show}
                size='lg'
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Restaurant
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name: </Form.Label>
                        
                        <Form.Control 
                            name='name'
                            type='text' 
                            defaultValue={restaurantToUpdate.name}
                            onChange={handleChange}/>

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Is Open?</Form.Label>
                        <Form.Select 
                            name='isOpen'
                            defaultValue={restaurantToUpdate.isOpen}
                            onChange={handleChange}>
                            <option value={true}>Yes</option>
                            <option value={false}>Nope</option>
                        </Form.Select>
                            
                    </Form.Group>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button onClick={handleCallbackHide}>Close</Button>
                    <Button onClick={handleUpdateSubmit}>Update</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default EditResModal;