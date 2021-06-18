import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ciudadPost } from "../../../Redux/actions";

function Ciudades() {
  const dispatch = useDispatch();

  const [ciudad, setCiudad] = useState({
    ciudad: "",
    paiseCodigoAlfa: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    // console.log(name);
    // console.log(target.value);
    if (name === "ciudad") {
      setCiudad({
        ...ciudad,
        [name]: target.value,
      });
    } else if (name === "paiseCodigoAlfa") {
      setCiudad({
        ...ciudad,
        [name]: target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaCiudad = {
      ciudad: ciudad.ciudad,
      paiseCodigoAlfa: ciudad.paiseCodigoAlfa,
    };
    if (!nuevaCiudad.ciudad) {
      alert("Por favor, ingrese una ciudad");
      return;
    }
    dispatch(ciudadPost(nuevaCiudad));
    e.target.reset();
    alert("Ubicación agregada exitosamente!");
    setCiudad({
      ciudad: "",
      paiseCodigoAlfa: "",
    });
  };
  return (
    <div>
      <form>
        <div>
          <div>
            <label className="text-label">Ciudad</label>
            <input
              className="inp"
              type="text"
              name="ciudad"
              value={ciudad.ciudad}
            ></input>
          </div>
          <button className="btn4" type="submit">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Ciudades;
