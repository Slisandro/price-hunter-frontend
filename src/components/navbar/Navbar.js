import React from "react";
import "./Navbar.css";
import user from "../../assets/user (1).png";
import { Link } from "react-router-dom";
// import notificacion from "../../assets/";

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => props.openSidebar()}>
        <i className="fas fa-bars"></i>
      </div>

      <div className="navbar__left">
        <Link Link to="/misdesafios">
          Mis desafios
        </Link>
        <Link to="/configuración">Configuración</Link>
        <a className="active_link" href="!#">
          admin
        </a>
      </div>

      <div className="navbar__right">
        <Link>{/* camapana */}</Link>

        <Link to="/configuración">
          <img className="icon-user" width={22} src={user} alt="user" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
