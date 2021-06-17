import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { paisPost } from "../../../Redux/actions";

function Paises() {
  const dispatch = useDispatch();

  const [pais, setPais] = useState({
    codigo_alfa: "",
    nombre_pais: "",
    regioneId: null,
    monedaCodigoMoneda: "",
  });

  const [buttonPaises, setButtonPaises] = useState(false);

  const handleButtonPaises = (e) => {
    e.preventDefault();
    setButtonPaises(!buttonPaises);
  };

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    // console.log(name);
    // console.log(target.value);
    if (name === "nombre_pais") {
      setPais({
        ...pais,
        [name]: target.value,
      });
    } else if (name === "monedaCodigoMoneda") {
      setPais({
        ...pais,
        [name]: target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoPais = {
      codigo_alfa: pais.codigo_alfa,
      nombre_pais: pais.nombre_pais,
      regioneId: pais.regioneId,
      monedaCodigoMoneda: pais.monedaCodigoMoneda,
    };
    if (!nuevoPais.nombre_pais) {
      alert("Por favor, ingrese un país");
      return;
    }
    dispatch(paisPost(nuevoPais));
    e.target.reset();
    alert("Ubicación agregada exitosamente!");
    setPais({
      codigo_alfa: "",
      nombre_pais: "",
      regioneId: null,
      monedaCodigoMoneda: "",
    });
  };
  return (
    <div>
      <form
        id="survey-form"
        // className="form"
        noValidate
        onChange={(e) => ChangeInput(e)}
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* <div className="divFormPAI"> */}
        <div>
          <label className="text-label">País</label>
          <input
            className="btm"
            type="text"
            name="nombre_pais"
            value={pais.nombre_pais}
          ></input>
        </div>
        <button type="submit">Agregar</button>
        {/* </div> */}
      </form>
    </div>
  );
}

export default Paises;
