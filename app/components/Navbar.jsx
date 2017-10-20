import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-inverse">
            <Link to="/">
                <h1 className="navbar-brand">The Margaret Hamilton Interplanetary Academy for Space Learning</h1>
            </Link>
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/campuses">Campuses</Link></li>
                <li><Link to="/students">Students</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;

