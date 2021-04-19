import React from 'react'
import { Link } from 'react-router-dom';

const NavLink = (props) =>{
    return (
        <div className="nav-link">
            <Link to={props.to}  className="text-white">{props.children}</Link>
        </div>
    )
}

export default NavLink
