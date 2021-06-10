import React from 'react';
import "./Navbar.css";
import user from "../../assets/user (1).png";
// import notificacion from "../../assets/";

const Navbar = ({sidebar, openSidebar}) => {
    return ( 
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <i class="fas fa-bars"></i>
            </div>

            <div className="navbar__left">
                <a href='!#'>Mis desafios</a>
                <a href='!#'>Mis desafios</a>
                <a className="active_link" href='!#'>admin</a>
            </div>

            <div className="navbar__right">
                <a href='!#'>
                {/* <img width={22} src={notificacion} alt="user"/> */}
                </a>

                <a href='!#'>
                    <img width={22} src={user} alt="user"/>
                </a>

            </div>
        </nav>
    );
}

export default Navbar;