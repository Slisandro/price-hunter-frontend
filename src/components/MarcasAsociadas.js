import React from "react";
import image from "./assets/coca-cola.png";
import image2 from "./assets/colgate.png";
import image3 from "./assets/chupa-chups.png";
import image4 from "./assets/unilever.png";
import image5 from "./assets/oreo.png";
import image6 from "./assets/pepsi.png";

function MarcasAsociadas() {
  return (
    <div>
      <h2 id="title">Marcas Asociadas</h2>
      <img src={image} alt="Not Found" />
      <img src={image2} alt="Not Found" />
      <img src={image3} alt="Not Found" />
      <img src={image4} alt="Not Found" />
      <img src={image5} alt="Not Found" />
      <img src={image6} alt="Not Found" />
    </div>
  );
}

export default MarcasAsociadas;
