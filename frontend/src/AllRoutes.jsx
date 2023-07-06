import React from 'react'
import {Routes,Route} from "react-router-dom";
import Home from './Components/Home';
import Menu from './Components/Menu';
import Orders from './Components/Order';
import Chatbot from './Components/Chatbot';
import AddDishForm from './Components/AddDish';
import TakeOrderForm from './Components/TakeOrder';
import FeedbackList from './Components/GetFeedback';
import FeedbackForm from './Components/Feedback';


const AllRoutes = () => {
  return (
    <div>
<Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/menu" element={<Menu/>}></Route>
    <Route path="/add" element={<AddDishForm/>}></Route>
    <Route path="/orders" element={<Orders/>}></Route>
    <Route path="/takeorder" element={<TakeOrderForm/>}></Route>
    <Route path="/feedback" element={<FeedbackList/>}></Route>
    <Route path="/chat" element={<Chatbot/>}></Route>
    <Route path="/addfeedback" element={<FeedbackForm/>}></Route>
</Routes>
    </div>
  )
}

export default AllRoutes