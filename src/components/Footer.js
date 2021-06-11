import React from "react";
import "./styles/Footer.css";

function Footer() {
  return (
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
          <a href="#">Contáctanos</a>
        </h6>
        <h6>
          <a href="#">Preguntas Frecuentes</a>
        </h6>
        <h6>
          <a href="#">Política de Privacidad</a>
        </h6>
      </div>
      <div>
        <h4>Price Hunter</h4>
        <h6>
          <a href="/SobreNosotros">Sobre Nosotros</a>
        </h6>
        <h6>
          <a href="#">Nuestra Historia</a>
        </h6>
      </div>
      <div>
        <h4 className="suscripcion">Suscríbase</h4>
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Ingrese su email"
        />
        <br></br>
        <button className="send">Enviar</button>
      </div>
    </div>
  );
}

// color general: #353553

export default Footer;
