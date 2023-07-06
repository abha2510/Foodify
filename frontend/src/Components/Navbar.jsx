import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{display:"flex",justifyContent:"space-evenly",height:"80px",width:"100%",backgroundColor:"darksalmon"}}>
      
          <Link to="/" style={{textDecoration:"none",color:"white"}}>Home</Link>
       
          <Link to="/menu" style={{textDecoration:"none",color:"white"}}>Menu</Link>

          <Link to="/takeorder" style={{textDecoration:"none",color:"white"}}>Take Order</Link>

          <Link to="/add" style={{textDecoration:"none",color:"white"}}>AddDish</Link>
       
          <Link to="/orders" style={{textDecoration:"none",color:"white"}}>Orders</Link>

          <Link to="/feedback" style={{textDecoration:"none",color:"white"}}>Feedback</Link>

          <Link to="/addfeedback" style={{textDecoration:"none",color:"white"}}>AddFeedback</Link>

          <Link to="/chat" style={{textDecoration:"none",color:"white"}}>Chat</Link>
        
    </nav>
  );
}

export default Navbar;
