import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMoneda, getRegion, paisPost, mostrarError, getPais } from "../../../Redux/actions";

import { useForm } from "react-hook-form";

function Paises() {
  const dispatch = useDispatch();
  const region = useSelector((store) => store.region);
  const moneda = useSelector((store) => store.moneda);

  const [pais, setPais] = useState({
    codigo_alfa: "",
    nombre_pais: "",
    regioneId: "",
    monedaCodigoMoneda: "",
  });

  useEffect(() => {
    dispatch(getRegion());
    dispatch(getMoneda())
    dispatch(getPais())
  }, [dispatch]);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "nombre_pais") {
      setPais({
        ...pais,
        [name]: target.value,
      });
    }
    if (name === "codigo_alfa") {
      setPais({
        ...pais,
        [name]: target.value,
      });
    }
    if (name === "nombre_region") {
      let id = region.find((id) => id.nombre_region === e.target.value);
      let idRegion = id.id;
      setPais({
        ...pais,
        regioneId: idRegion,
      });
    }
    if (name === "codigo_moneda") {
      let id = moneda.find((id) => id.codigo_moneda === e.target.value);
      let idMoneda = id.codigo_moneda;
      setPais({
        ...pais,
        monedaCodigoMoneda: idMoneda,
      });
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const alerta = useSelector((store) => store.alerta);

  const submit = (data, e) => {
    if (pais.codigo_alfa && pais.nombre_pais) {
      const nuevoPais = {
        codigo_alfa: pais.codigo_alfa.toLocaleUpperCase(),
        nombre_pais: pais.nombre_pais,
        regioneId: pais.regioneId,
        monedaCodigoMoneda: pais.monedaCodigoMoneda,
      };

      dispatch(paisPost(nuevoPais));

      e.target.reset();
      alert("Pais agregado exitosamente!");
      setPais({
        codigo_alfa: "",
        nombre_pais: "",
        regioneId: "",
        monedaCodigoMoneda: "",
      });
    }
  };
  return (
    <div>
      <form
        id="survey-form"
        onChange={(e) => ChangeInput(e)}
        onSubmit={handleSubmit(submit)}
      >
        {alerta ? (
          <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
        ) : null}
        <div className="separador">
          <label className="text-label">País</label>
          <input
            className="inp"
            type="text"
            name="nombre_pais"
            autoComplete="off"
            {...register("nombre_pais", {
              required: {
                value: true,
                message: "Debe ingresar un nombre para el pais",
              },
              maxLength: {
                value: 10,
                message: "El Nombre no debe tener mas de diez caracteres",
              },
              minLength: {
                value: 2,
                message: "El Nombre no debe tener menos de dos caracteres",
              },
            })}
          />
          <span className="err">{errors?.nombre_pais?.message}</span>
        </div>
        <div>
          <label className="text-label">Codigo</label>
          <input
            className="inp"
            type="text"
            name="codigo_alfa"
            autoComplete="off"
            {...register("codigo_alfa", {
              required: {
                value: true,
                message: "Debe ingresar un codigo para el pais ",
              },
              maxLength: {
                value: 3,
                message: "El codigo debe tener tres caracteres",
              },
              minLength: {
                value: 3,
                message: "El codigo debe tener tres caracteres",
              },
            })}
          />
          <span className="err">{errors?.codigo_alfa?.message}</span>
        </div>
        <div>
          <label className="text-label">Región</label>
          <select
            name="nombre_region"
            className="selectUbi"
            onChange={(e) => ChangeInput(e)}
            {...register("nombre_region", {
              required: {
                value: true,
                message: "Debe seleccionar una region",
              },
            })}
          >
            <option></option>
            {region.map((f) => (
              <option value={f.nombre_region}>{f.nombre_region}</option>
            ))}
          </select>
          <span className="err">{errors?.nombre_region?.message}</span>
        </div>
        <div>
          <label className="text-label">Moneda</label>
          <select
            name="codigo_moneda"
            className="selectUbi"
            onChange={(e) => ChangeInput(e)}
            {...register("codigo_moneda", {
              required: {
                value: true,
                message: "Debe seleccionar una moneda",
              },
            })}
          >
            <option></option>
            {moneda.map((f) => (
              <option value={f.codigo_moneda}>{f.codigo_moneda}</option>
            ))}
          </select>
          <span className="err">{errors?.codigo_moneda?.message}</span>
        </div>
        <button className="agregarModal" type="submit">
          Agregar
        </button>
      </form>
    </div>
  );
}

export default Paises;
