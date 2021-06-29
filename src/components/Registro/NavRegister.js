import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import aguila from "../../assets/aguila.png";



const NavLogin = () => {
    return (

        <div className="navbar__landing">
            <div className="containerLanding__hunter flexing">
                <img className="aguilaLanding" src={aguila} alt="" />

                <Nav className="justify-content-center">

                    <NavItem>
                        <i class="fas fa-home"></i>
                        <Link to="/">Volver al inicio</Link>
                    </NavItem>
                    <NavItem>
                        <i class="fas fa-user"></i>
                        <Link to="/login">Iniciar sesion</Link>
                    </NavItem>
                    <NavItem>
                        <i class="fas fa-user-tie"></i>
                        <Link to="/registro-cliente">Registro Empresas</Link>
                    </NavItem>
                </Nav>



            </div>
        </div>

    );
}

export default NavLogin;