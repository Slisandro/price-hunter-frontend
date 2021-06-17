import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFamilia, familiaPost } from "../../../Redux/actions";

function Fami({ setSwitcher }) {
  const dispatch = useDispatch();
  const [buttonFAM, setButtonFAM] = useState(false);
  const familia = useSelector((store) => store.familia);

  console.log(familia);

  useEffect(() => {
    dispatch(getFamilia());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonFAM = (e) => {
    e.preventDefault();
    setButtonFAM(!buttonFAM);
  };

  const [fam, setFam] = useState({
    nombre_familia: "",
    descripcion: "",
    id: null,
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
    console.log(fam);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaFamilia = {
      nombre_familia: fam.nombre_familia,
      descripcion: fam.descripcion,
    };

    // console.log(nuevaFamilia);

    if (!nuevaFamilia.nombre_familia) {
      alert("Por favor, ingrese una familia de producto");
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
      <div className="divFAM">
        <h6 id="title3">Familia</h6>
        <button className="btn4" onClick={handleButtonFAM}>
          Agregar Familia
        </button>
        <button className="btn4" onClick={handleButtonFAM}>
          Familia Existente
        </button>
        {buttonFAM ? (
          <form
            className="formFAM"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="divFormFAM">
              <div>
                <label className="text-label">Familia</label>
                <select
                  name="nombre_familia"
                  className="selectTrans"
                  value={fam.nombre_familia}
                  onChange={(e) => ChangeInput(e)}
                >
                  {familia.map((f) => (
                    <option value={f.nombre_familia}>{f.nombre_familia}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="divFormFAM">
              <div>
                <label className="text-label-desc">* Descripción</label>
                <input
                  className="btm-desc"
                  type="text"
                  name="descripcion"
                  value={fam.descripcion}
                ></input>
              </div>
            </div>
            <button type="submit">Agregar</button>
          </form>
        ) : (
          <form
            className="formFAM"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="divFormFAM">
              <div>
                <label className="text-label">Familia</label>
                <input
                  name="agregar_familia"
                  className="inp"
                  placeholder="Agregar Familia"
                ></input>
              </div>
            </div>
            <div className="divFormFAM">
              <div>
                <label className="text-label-desc">* Descripción</label>
                <input
                  className="btm-desc"
                  type="text"
                  name="descripcion"
                  value={fam.descripcion}
                ></input>
              </div>
            </div>
            <button type="submit">Agregar</button>
          </form>
        )}
      </div>
    </>
  );
}

export default Fami;
