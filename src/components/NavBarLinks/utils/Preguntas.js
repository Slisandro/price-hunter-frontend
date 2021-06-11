import React, { useState } from "react";
import "../styles/Ayuda.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Preguntas = ({ title, info }) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <article className="question">
      <header>
        <h4>{title}</h4>
        <button className="btnA" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {showInfo && <p>{info}</p>}
    </article>
  );
};

export default Preguntas;
