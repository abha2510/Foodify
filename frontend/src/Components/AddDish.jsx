import React, { useState } from 'react';
import axios from 'axios';

const AddDishForm = () => {
  const [dish, setDish] = useState({
    dish_id: 0,
    dish_name: '',
    price: 0,
    availability: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDish((prevDish) => ({
      ...prevDish,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the dish data to the server using the API
    axios.post('http://127.0.0.1:5000/add', dish)
      .then((response) => {
        console.log(response.data); 
        alert(response.data);
        // Log the response from the server
        // Clear the form after successfully adding the dish
        setDish({
          dish_id: 0,
          dish_name: '',
          price: 0,
          availability: '',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Add Dish</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dish_id">Dish ID:</label>
        <input
          type="number"
          id="dish_id"
          name="dish_id"
          value={dish.dish_id}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="dish_name">Dish Name:</label>
        <input
          type="text"
          id="dish_name"
          name="dish_name"
          value={dish.dish_name}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={dish.price}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="availability">Availability:</label>
        <select
          id="availability"
          name="availability"
          value={dish.availability}
          onChange={handleChange}
          required
        >
          <option value="">-- Select --</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <br />
        <button type="submit">Add Dish</button>
      </form>
    </div>
  );
};

export default AddDishForm;
