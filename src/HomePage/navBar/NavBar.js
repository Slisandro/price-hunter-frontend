import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../../components/Login/Login";
import aguila from "../../assets/aguila.png";
import close from "../../assets/cancel (1).png";

import "./NavBar.css";



function NavBar() {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="containerNavBar">
            <div className="logo__title">
                <img src={aguila} width={50} height={50} alt=""/>
                <h2 className="titleNavBar">Price Hunter</h2>
            </div>
            <div className="links__landing">
                <Link className="lkn-yellow"  to="/">Inicio</Link>
                <Link className="lkn"  to="/Marcas">Marcas</Link>
                <Link className="lkn-yellow"  to="Servicios">Servicios</Link>
                <Link className="lkn"  to="/Contacto">Contacto</Link>
                <Link className="lkn-yellow"  to="/SobreNosotros">Sobre nosotros</Link>
                <Link className="lkn"  to="/Ayuda">Ayuda</Link>
            </div>
            
            <div className="buttons-nav">
                <button 
                    onClick={handleModal} 
                    className="button-login">
                Ingresar
                </button>
                <button 
                    onClick={handleModal} 
                    className="button-register">
                Registrarse
                </button>
            </div>
                  {modal 
                  ? (
                      <div className="modal">
                          <button onClick={handleModal}><img width={20} src={close} alt=""/></button>
                          <Login />
                      </div>
                    ) 
                  : 
                  null}
    </div>
  );
}

export default NavBar;
