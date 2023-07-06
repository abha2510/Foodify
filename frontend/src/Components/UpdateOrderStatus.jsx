// import React, { useState } from 'react';
// import axios from 'axios';

// const UpdateOrderStatus = () => {
//   const [orderStatus, setOrderStatus] = useState({
//     order_id: '',
//     status: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setOrderStatus(prevState => ({ ...prevState, [name]: value }));
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://127.0.0.1:5000/orders/${orderStatus.order_id}`, orderStatus);
//       // Reset form fields after successful submission
//       setOrderStatus({
//         order_id: '',
//         status: ''
//       });
//       console.log('Order status updated successfully');
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div>
//       <h2>Update Order Status</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Order ID:</label>
//           <input type="number" name="order_id" value={orderStatus.order_id} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Status:</label>
//           <input type="text" name="status" value={orderStatus.status} onChange={handleChange} />
//         </div>
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// }

// export default UpdateOrderStatus;




import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const OrderStatusUpdates = () => {
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    const socket = io(`http://127.0.0.1:5000/orders`); // Replace with your actual backend URL

    // Listen for order status updates
    socket.on('order_status_update', (data) => {
      const { order_id, new_status } = data;
      setOrderStatus(`Order ${order_id} status: ${new_status}`);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Order Status Updates:</h2>
      <p>{orderStatus}</p>
    </div>
  );
};

export default OrderStatusUpdates;
