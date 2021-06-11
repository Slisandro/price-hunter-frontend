import React, { useState } from "react";
import data from "./utils/data";
import SingleQuestion from "./utils/Preguntas";
import { Link } from "react-router-dom";
import "./styles/Ayuda.css";

function Ayuda() {
  const [questions, setQuestions] = useState(data);
  return (
    <main className="mainA">
      <div className="containerA">
        <h3>Preguntas Frecuentes</h3>
        <section className="infoA">
          {questions.map((question) => {
            return (
              <SingleQuestion key={question.id} {...question}></SingleQuestion>
            );
          })}
        </section>
        <Link to="/">Regresar</Link>
      </div>
    </main>
  );
}

export default Ayuda;
