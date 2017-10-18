import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
      <div>
        <h1>The Margaret Hamilton Interplanetary Academy for Space Learning</h1>
        <Link to="/">
            <button>Home</button>
        </Link>
        <Link to="/campuses">
            <button>Campuses</button>
        </Link>
        <Link to="/students">
            <button>Students</button>
        </Link>
      </div>
    )
  }
  
  export default Navbar;