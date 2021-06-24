import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFamilia, familiaPost, mostrarError } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

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

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
   

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
    
    swal({
      title: "Familia agregada con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    });

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
          onSubmit={handleSubmit(submit)}
        >
          {alerta ? (
            <span className={`alerta ${alerta.categoria}`}>{alerta.msg}</span>
          ) : null}
          <div className="divFormFamilia">
            <div>
              <label className="text-label">Familia</label>
              <input
                name="agregar_familia"
                placeholder="Agregar Familia"
                className="inp"
                autoComplete="off"
                max ='0'
                      {...register("agregar_familia", {
                        required: {
                          value: true,
                          message: "Debe ingresar un familia ",
                        },
                        maxLength: {
                          value: 15,
                          message:
                            "La familia debe tener menos de quince letras!",
                        },
                        minLength: {
                          value: 3,
                          message: "La familia debe tener tres letras!",
                        },
                        max: {
                          value: 0,
                          message: "La familia no puede comenzar con numeros",
                        },
                      })}
                    />
                    <span className="err">{errors?.agregar_familia?.message}</span>
             
            </div>
          </div>
          <div className="divFormFamilia">
            <div>
              <label className="text-label-desc">* Descripción</label>
              <input
                className="inp6"
                type="text"
                name="descripcion"
                autoComplete="off"
                max ='0'
                      {...register("descripcion", {
                        // required: {
                        //   value: true,
                        //   message: "Debe ingresar un descripcion ",
                        // },
                        maxLength: {
                          value: 256,
                          message:
                            "La descripcion no debe tener mas de 256 caracteres!",
                        },
                        minLength: {
                          value: 5,
                          message: "La descripcion debe tener al menos cinco letras!",
                        },
                        max: {
                          value: 0,
                          message: "La descripcion no puede comenzar con numeros",
                        },
                      })}
                    />
                    <span className="err">{errors?.descripcion?.message}</span>
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
