import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [dishId, setDishId] = useState('');


  const handleChange = (e) => {
    setDishId(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://127.0.0.1:5000/menu/${dishId}`);
      // Reset form field after successful deletion
      setDishId('');
      //console.log('Dish deleted from the menu');
      alert('Dish deleted from the menu');
    } catch (error) {
      console.log(error);
    }
}

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/menu');
      setMenuItems(response.data);
    } catch (error) {
      console.log(error);
    }

  
  }

  return (
    <div>
      <h2>Menu</h2>
      <div style={{display:"flex",justifyContent:"space-evenly",flexDirection:"row-reverse"}}>
      {menuItems.map(item => (
        <div key={item.dish_id} style={{border:"2px dotted black",padding:"50px"}}>
          <p>{item.dish_id}</p>
          <h3>{item.dish_name}</h3>
          <p>Price: {item.price}</p>
          <p>Availability: {item.availability}</p>
          <button>Feeback</button>
        </div>
      ))}

      </div>
       <form onSubmit={handleSubmit}>
        <div>
          <label>Dish ID:</label>
          <input type="number" value={dishId} onChange={handleChange} />
        </div>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default Menu;
