import React from "react";
import { Link } from "react-router-dom";
import "../styles/Contacto.css";

function Contacto() {
  return (
    <>
      <form className="form-style-9">
        <ul>
          <li>
            <input
              type="text"
              name="field1"
              className="field-style field-split align-left"
              placeholder="Nombre"
            />
            <input
              type="email"
              name="field2"
              className="field-style field-split align-right"
              placeholder="Email"
            />
          </li>
          <li>
            <input
              type="text"
              name="field3"
              className="field-style field-split align-left"
              placeholder="Teléfono"
            />
            <input
              type="url"
              name="field4"
              className="field-style field-split align-right"
              placeholder="Empresa"
            />
          </li>
          <li>
            <input
              type="text"
              name="field3"
              className="field-style field-full align-none"
              placeholder="Tema"
            />
          </li>
          <li>
            <textarea
              name="field5"
              className="field-style"
              placeholder="Mensaje..."
            ></textarea>
          </li>
          <li>
            <input type="submit" value="Enviar Mensaje" />
          </li>
        </ul>
      </form>
      <Link to="/" className="regresar">
        Regresar
      </Link>
    </>
  );
}

export default Contacto;
