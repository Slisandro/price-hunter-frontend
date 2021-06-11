import React from 'react';
import "./Navbar.css";
import user from "../../assets/user (1).png";
// import notificacion from "../../assets/";

const Navbar = (props) => {
    return ( 
        <nav className="navbar">
            <div className="nav_icon" onClick={() => props.openSidebar()}>
                <i class="fas fa-bars"></i>
            </div>

            <div className="navbar__left">
                <a href='!#'>Mis desafios</a>
                <a href='!#'>Mis desafios</a>
                <a className="active_link" href='!#'>admin</a>
            </div>

            <div className="navbar__right">
                <a href='!#'>
                {/* camapana */}
                </a>

                <a href='!#'>
                    <img className="icon-user" width={22} src={user} alt="user"/>
                </a>

            </div>
        </nav>
    );
}

export default Navbar;