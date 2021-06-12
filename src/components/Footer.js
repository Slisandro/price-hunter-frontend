import React from "react";
import { Link } from "react-router-dom";
import "./styles/Footer.css";

function Footer() {
  return (
    <>
      <div className="container-footer">
        <div className="title">
          <h3>Price Hunter</h3>
        </div>
        <div className="rights">
          <h6>All rights reserved &copy; {new Date().getFullYear()}</h6>
        </div>
        <div>
          <h4>Soporte</h4>
          <h6>
            <Link to="">Contáctanos</Link>
          </h6>
          <h6>
            <Link to="/Ayuda">Preguntas Frecuentes</Link>
          </h6>
          <h6>
            <Link to="">Política de Privacidad</Link>
          </h6>
        </div>
        <div>
          <h4>Price Hunter</h4>
          <h6>
            <Link to="/SobreNosotros">Sobre Nosotros</Link>
          </h6>
          <h6>
            <Link to="/SobreNosotros">Nuestra Historia</Link>
          </h6>
        </div>
        <div>
          <h4 className="suscripcion">Suscríbase</h4>
          <input
            className="inputfooter"
            type="text"
            name="name"
            placeholder="Ingrese su email"
          />
          <br></br>
          <button className="send">Enviar</button>
        </div>
      </div>
    </>
  );
}

// color general: #353553

export default Footer;