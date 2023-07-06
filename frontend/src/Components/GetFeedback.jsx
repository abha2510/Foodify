import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/feedback');
      setFeedbacks(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Feedbacks</h2>
      {feedbacks.map(feedback => (
        <div key={feedback._id}>
          <h3>Feedback ID: {feedback._id}</h3>
          <p>Dish ID: {feedback.dish_id}</p>
          <p>Order ID: {feedback.order_id}</p>
          <p>Rating: {feedback.rating}</p>
          <p>Review: {feedback.review}</p>
          <p>Customer ID: {feedback.customer_id}</p>
          <p>Timestamp: {feedback.timestamp}</p>
        </div>
      ))}
    </div>
  );
}

export default FeedbackList;
