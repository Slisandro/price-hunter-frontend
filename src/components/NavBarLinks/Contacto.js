import React from "react";
import { Link } from "react-router-dom";
import "../styles/Contacto.css";

function Contacto() {
  return (
    <>
      <main className="backscreen">
        <form class="form-style-9">
          <ul>
            <li>
              <input
                type="text"
                name="field1"
                class="field-style field-split align-left"
                placeholder="Nombre"
              />
              <input
                type="email"
                name="field2"
                class="field-style field-split align-right"
                placeholder="Email"
              />
            </li>
            <li>
              <input
                type="text"
                name="field3"
                class="field-style field-split align-left"
                placeholder="Teléfono"
              />
              <input
                type="url"
                name="field4"
                class="field-style field-split align-right"
                placeholder="Empresa"
              />
            </li>
            <li>
              <input
                type="text"
                name="field3"
                class="field-style field-full align-none"
                placeholder="Tema"
              />
            </li>
            <li>
              <textarea
                name="field5"
                class="field-style"
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
      </main>
    </>
  );
}

export default Contacto;
