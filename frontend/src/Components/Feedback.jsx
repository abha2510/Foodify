import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    dish_id: '',
    order_id: '',
    rating: '',
    review: '',
    customer_id: '',
    timestamp: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/feedback', feedback);
      // Reset form fields after successful submission
      setFeedback({
        dish_id: '',
        order_id: '',
        rating: '',
        review: '',
        customer_id: '',
        timestamp: ''
      });
      console.log('Feedback submitted successfully');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Dish ID:</label>
          <input type="number" name="dish_id" value={feedback.dish_id} onChange={handleChange} />
        </div>
        <div>
          <label>Order ID:</label>
          <input type="number" name="order_id" value={feedback.order_id} onChange={handleChange} />
        </div>
        <div>
          <label>Rating:</label>
          <input type="number" name="rating" value={feedback.rating} onChange={handleChange} />
        </div>
        <div>
          <label>Review:</label>
          <textarea name="review" value={feedback.review} onChange={handleChange}></textarea>
        </div>
        <div>
          <label>Customer ID:</label>
          <input type="number" name="customer_id" value={feedback.customer_id} onChange={handleChange} />
        </div>
        <div>
          <label>Timestamp:</label>
          <input type="text" name="timestamp" value={feedback.timestamp} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
