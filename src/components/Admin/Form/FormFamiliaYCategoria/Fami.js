import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFamilia, familiaPost, mostrarError } from "../../../Redux/actions";

function Fami({ setSwitcher }) {
  const dispatch = useDispatch();
  const familia = useSelector((store) => store.familia);
  const alerta = useSelector((store) => store.alerta);

  // var mapeado = familia.map((fa) => fa.nombre_familia);

  useEffect(() => {
    dispatch(getFamilia());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [fam, setFam] = useState({
    nombre_familia: "",
    descripcion: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "nombre_familia") {
      var fa = familia.find((f) => f.nombre_familia === e.target.value);
      var final = fa.id;
      setFam({
        ...fam,
        [name]: target.value,
        id: final,
      });
    } else if (name === "agregar_familia") {
      setFam({
        ...fam,
        nombre_familia: target.value,
        id: final,
      });
    } else if (name === "descripcion") {
      setFam({
        ...fam,
        descripcion: target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaFamilia = {
      nombre_familia: fam.nombre_familia,
      descripcion: fam.descripcion,
    };

    if (!nuevaFamilia.nombre_familia) {
      alert("Por favor, ingrese una familia de producto");
      return;
    }

    if (familia.includes(fam.nombre_familia)) {
      alert("Familia de producto existente");
      return;
    }

    if (!isNaN(parseInt(nuevaFamilia.nombre_familia))) {
      dispatch(
        mostrarError("El nombre solo puede contener letras", "alerta-error")
      );
      return;
    }

    dispatch(familiaPost(nuevaFamilia));

    e.target.reset();
    alert("Familia agregada con éxito!");

    setFam({
      nombre_familia: "",
      descripción: "",
    });
  };

  return (
    <>
      <div>
        <form
          className="formFamilia"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={(e) => handleSubmit(e)}
        >
          {alerta ? (
            <span className={`alerta ${alerta.categoria}`}>{alerta.msg}</span>
          ) : null}
          <div className="divFormFamilia">
            <div>
              <label className="text-label">Familia</label>
              <input
                name="agregar_familia"
                className="inp"
                placeholder="Agregar Familia"
              ></input>
            </div>
          </div>
          <div className="divFormFamilia">
            <div>
              <label className="text-label-desc">* Descripción</label>
              <input
                className="inp6"
                type="text"
                name="descripcion"
                value={fam.descripcion}
              ></input>
            </div>
          </div>
          <button className="agregarModal" type="submit">
            Agregar Familia
          </button>
        </form>
      </div>
    </>
  );
}

export default Fami;
