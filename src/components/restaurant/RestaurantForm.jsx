import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRestaurant } from '../../features/restaurant/restaurantSlice';

const RestaurantForm = () => {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: '',
        isOpen: true
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addRestaurant({form}));

        setForm({
            name: '',
            isOpen: false
        });
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Restaurant Name:
                    <input type='text'
                        id='name'
                        name='name'
                        value={form.name}
                        onChange={handleChange}/>
                </label> 
            </div>
            <div>
                <label>
                    Is Currently Open?
                    <select 
                        name='isOpen'
                        value={form.isOpen}
                        onChange={handleChange}>
                        <option default value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </label>
            </div>
            <button type='submit'>Add Restaurant</button>
        </form>
    );
}

export default RestaurantForm;