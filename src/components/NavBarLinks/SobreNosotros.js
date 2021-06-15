import React from "react";
import { Link } from "react-router-dom";
import "./styles/SobreNosotros.css";
import { sobrenosotros } from "./utils/constants";

function SobreNosotros() {
  return (
    <main className="backscreenS">
      <div className="services-center">
        {sobrenosotros.map((sobrenosotros) => {
          const { id, title, text } = sobrenosotros;
          return (
            <article key={id} className="sobrenosotros">
              <h4 className="sobrenosotrosTitle">{title}</h4>
              <p className="sobrenosotrosDescripcion">{text}</p>
            </article>
          );
        })}
        <div className="regresarConteiner">
          <Link to="/" className="regresar">
            Regresar
          </Link>
        </div>
      </div>
    </main>
  );
}

export default SobreNosotros;
