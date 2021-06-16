import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { paisPost, regionPost, ciudadPost } from "../../../Redux/actions";
// import { Link } from "react-router-dom";
// import logo from "../../assets/aguila.png";
import "./FormUbicacion.css";

function FormUbicacion() {
  const dispatch = useDispatch();
  const ubicaciones = useSelector((store) => store.ubicaciones);

  const [pais, setPais] = useState({
    codigo_alfa: "",
    nombre_pais: "",
    regioneId: null,
    monedaCodigoMoneda: "",
  });

  const [ciudad, setCiudad] = useState({
    ciudad: "",
    paiseCodigoAlfa: "",
  });

  const [region, setRegion] = useState({
    nombre_region: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    console.log(name);
    console.log(target.value);
    if (name === "nombre_pais") {
      setPais({
        ...pais,
        [name]: target.value,
      });
    } else if (name === "ciudad") {
      setCiudad({
        ...ciudad,
        [name]: target.value,
      });
    } else if (name === "nombre_region") {
      setRegion({
        ...region,
        [name]: target.value,
      });
    }
  };

  useEffect(() => {
    // dispatch(getUbicaciones());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoPais = {
      codigo_alfa: pais.codigo_alfa,
      nombre_pais: pais.nombre_pais,
      regioneId: pais.regioneId,
      monedaCodigoMoneda: pais.monedaCodigoMoneda,
    };

    const nuevaCiudad = {
      ciudad: ciudad.ciudad,
      paiseCodigoAlfa: ciudad.paiseCodigoAlfa,
    };

    const nuevaRegion = {
      nombre_region: region.nombre_region,
    };

    if (!nuevoPais.nombre_pais) {
      alert("Por favor, ingrese un país");
      return;
    }
    if (!nuevaCiudad.ciudad) {
      alert("Por favor, ingrese una ciudad");
      return;
    }
    if (!nuevaRegion.nombre_region) {
      alert("Por favor, ingrese una región");
      return;
    }

    dispatch(paisPost(nuevoPais));
    dispatch(ciudadPost(nuevaCiudad));
    dispatch(regionPost(nuevaRegion));
    e.target.reset();
    alert("Ubicación agregada exitosamente!");

    setPais({
      codigo_alfa: "",
      nombre_pais: "",
      regioneId: null,
      monedaCodigoMoneda: "",
    });
    setCiudad({
      ciudad: "",
      paiseCodigoAlfa: "",
    });
    setRegion({
      nombre_region: "",
    });
  };

  return (
    <>
      <div className="containerForm">
        <header>
          <h1 id="title">Agregar Ubicación</h1>
        </header>
        <form
          id="survey-form"
          className="form"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="divForm">
            <div>
              <label className="text-label">País</label>
              <input
                className="btm"
                type="text"
                name="nombre_pais"
                value={pais.nombre_pais}
              ></input>
            </div>
            <div>
              <label className="text-label">Ciudad</label>
              <input
                className="btm"
                type="text"
                name="ciudad"
                value={ciudad.ciudad}
              ></input>
            </div>
            <div>
              <label className="text-label">Región</label>
              <input
                className="btm"
                type="text"
                name="nombre_region"
                value={region.nombre_region}
              ></input>
            </div>
            {/* <div>
                <ul className="ulubi">
                  {ubicaciones.map((t) => (
                    <li key={t.id}>
                      <input
                        className="input"
                        type="checkbox"
                        name="ubicacion"
                        value={t.nombre}
                      ></input>
                      <label nombre={t}>{t.nombre}</label>
                    </li>
                  ))}
                </ul>
              </div> */}
            <button type="submit">Agregar</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormUbicacion;
