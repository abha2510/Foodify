import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/orders');
      setOrders(response.data);
    // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Orders</h2>
      {orders.map(order => (
      <div key={order._id}>
         {
          order.orders.map((el)=>{
             return(
          <div key={el.id}>
          <h3>Order ID: {el.id}</h3>
          <p>Person Name: {el.person_name}</p>
          <p>Status: {el.status}</p>
          <p>Total Price: {el.total_price}</p>
        </div>
             )
          })
         }
         </div>
      
      ))}
    </div>
  );
}

export default Orders;
