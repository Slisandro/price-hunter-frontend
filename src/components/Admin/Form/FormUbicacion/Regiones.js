import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { regionPost } from "../../../Redux/actions";

function Regiones() {
  const dispatch = useDispatch();

  const [region, setRegion] = useState({
    nombre_region: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    // console.log(name);
    // console.log(target.value);
    if (name === "nombre_region") {
      setRegion({
        ...region,
        [name]: target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaRegion = {
      nombre_region: region.nombre_region,
    };
    if (!nuevaRegion.nombre_region) {
      alert("Por favor, ingrese una región");
      return;
    }
    dispatch(regionPost(nuevaRegion));
    e.target.reset();
    alert("Ubicación agregada exitosamente!");

    setRegion({
      nombre_region: "",
    });
  };
  return (
    <div>
      <form>
        <div>
          <div>
            <label className="text-label">Región</label>
            <input
              className="inp"
              type="text"
              name="nombre_region"
              value={region.nombre_region}
            ></input>
          </div>
          <button className="agregarModal" type="submit">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Regiones;
