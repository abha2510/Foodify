import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [menu, setMenu] = useState([]);
  const [dishIds, setDishIds] = useState([]);
  const [personName, setPersonName] = useState('');

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/menu');
      setMenu(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDishIdChange = (event) => {
    const selectedDishIds = Array.from(event.target.selectedOptions, (option) => option.value);
    setDishIds(selectedDishIds);
  };

  const handlePersonNameChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (dishIds.length === 0) {
      alert('Please select at least one dish.');
      return;
    }

    if (personName.trim() === '') {
      alert('Please enter your name.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/orders', {
        dish_ids: dishIds,
        person_name: personName,
      });
      console.log(response.data); // Success message from the backend
      // Reset the form
      setDishIds([]);
      setPersonName('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Place an Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dishIds">Select Dishes:</label>
          <select id="dishIds" multiple value={dishIds} onChange={handleDishIdChange}>
            {menu.map((dish) => (
              <option key={dish.dish_id} value={dish.dish_id}>
                {dish.dish_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="personName">Your Name:</label>
          <input type="text" id="personName" value={personName} onChange={handlePersonNameChange} />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
