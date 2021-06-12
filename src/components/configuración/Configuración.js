import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
import "./Configuración.css";

const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function Configuración() {
  const [person, setPerson] = useState({
    Imégen: "https://randomuser.me/api/portraits/men/75.jpg",
    Teléfono: "+57 324 432 43",
    Email: "CarlosHenry@mail.com",
    Contraseña: "ProyectoFinal",
    Edad: "34",
    Calle: "Puente La Gloria",
    Nombre: "Carlos",
  });
  const [value, setValue] = useState("Carlos");
  const [title, setTitle] = useState("Nombre");

  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };
  return (
    <main className="conte">
      <div className="block bcg-grad"></div>
      <div className="container">
        <img
          src={(person && person.Imágen) || defaultImage}
          alt="random user"
          className="user-img"
        />
        <p className="user-title">Mi {title} es</p>
        <p className="user-value">{value}</p>
        <div className="values-list">
          <button
            className="icon"
            data-label="Nombre"
            onMouseOver={handleValue}
          >
            <FaUser />
          </button>
          <button className="icon" data-label="Email" onMouseOver={handleValue}>
            <FaEnvelopeOpen />
          </button>
          <button className="icon" data-label="Edad" onMouseOver={handleValue}>
            <FaCalendarTimes />
          </button>
          <button className="icon" data-label="Calle" onMouseOver={handleValue}>
            <FaMap />
          </button>
          <button
            className="icon"
            data-label="Teléfono"
            onMouseOver={handleValue}
          >
            <FaPhone />
          </button>
          <button
            className="icon"
            data-label="Contraseña"
            onMouseOver={handleValue}
          >
            <FaLock />
          </button>
        </div>
        <Link className="btn" to="/tablero">
          Regresar al Tablero
        </Link>
      </div>
    </main>
  );
}

export default Configuración;
