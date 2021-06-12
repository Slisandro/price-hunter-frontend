import React from "react";
import "./styles/Testimonios.css";

function Testimonios({ people }) {
  return (
    <div className="containerTestimonios">
      <h2 id="title">Testimonios</h2>
      <section className="testimonios">
        {people.map((person) => {
          const { id, name, testimonio, image } = person;
          return (
            <article key={id} className="testimonio">
              <img className="userImage" src={image} alt={name} />
              <div id="inside">
                <h4 id="name">{name}</h4>
                <p>{testimonio}</p>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default Testimonios;
