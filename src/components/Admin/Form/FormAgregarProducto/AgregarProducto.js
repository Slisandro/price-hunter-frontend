import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  productoPost,
  getSubcategoria,
  getUnidadMedida,
} from "../../../Redux/actions";
import { useForm } from "react-hook-form";

import close from "../../../../assets/cancel (1).png";
import "./AgregarProducto.css";

function FormAgregarProducto() {
  const [modal, setModal] = useState(true);

  const handleModal = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubcategoria());
    dispatch(getUnidadMedida());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subcategoria = useSelector((store) => store.subcategoria);
  const unidad_medida = useSelector((store) => store.unidad_medida);

  const [state, setState] = useState({
    nombre: "",
    contenido_neto: "",
    unidadMedidaCodigoUnidadMedida: "",
    subcategoriumId: "",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "nombre") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "contenido_neto") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "unidadMedidaCodigoUnidadMedida") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "subcategoriumId") {
      setState({
        ...state,
        [name]: target.value,
      });
    }
  };

  const submit = (data, e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre: state.nombre,
      contenido_neto: state.contenido_neto,
      unidadMedidaCodigoUnidadMedida: state.unidadMedidaCodigoUnidadMedida,
      subcategoriumId: state.subcategoriumId,
    };

    if (!nuevoProducto.nombre) {
      alert("Por favor, ingrese un nombre");
      return;
    }

    if (!nuevoProducto.subcategoriumId) {
      alert("Por favor, ingrese una sub-categoria");
      return;
    }

    if (!nuevoProducto.unidadMedidaCodigoUnidadMedida) {
      alert("Por favor, ingrese una unidad de medida");
      return;
    }

    if (!nuevoProducto.contenido_neto) {
      alert("Por favor, ingrese un contenido neto");
      return;
    }

    dispatch(productoPost(nuevoProducto));
    e.target.reset();
    alert("Producto agregado con éxito!");

    setState({
      nombre: "",
      subcategoriumId: "",
      unidadMedidaCodigoUnidadMedida: "",
      contenido_neto: "",
    });
  };

  return (
    <>
      <div>
        <div className="contenedorFAM">
          {modal ? (
            <div>
              {/* <button className="buttonModal" onClick={() => handleModal()}>
                <img width={30} src={close} alt="x" />
              </button> */}
              <header>
                <h1 id="title">Agregar Producto</h1>
              </header>
              <form
                id="survey-form"
                className="form"
                noValidate
                onChange={(e) => ChangeInput(e)}
                onSubmit={handleSubmit(submit)}
              >
                <div className="divModalFAM">
                  <div>
                    {/* ------------------------ */}
                    <label className="text-label">Nombre</label>
                    <input
                      className="inp"
                      type="text"
                      name="nombre"
                      max ='0'
                      autoComplete="off"
                      {...register("nombre", {
                        required: {
                          value: true,
                          message: "Debe ingresar un nombre ",
                        },
                        maxLength: {
                          value: 15,
                          message:
                            "El nombre no debe tener mas de quince letras!",
                        },
                        minLength: {
                          value: 3,
                          message: "El nombre debe tener al menos tres letras!",
                        },
                        max: {
                          value: 0,
                          message: "El nombre no puede comenzar con numeros",
                        },
                      })}
                    />
                    <span className="err">{errors?.nombre?.message}</span>
                  </div>
                  <div className="divForm">
                    <div>
                      {/* ------------------------ */}
                      <label className="text-label">Unidad de Medida</label>
                      <select
                        name="unidadMedidaCodigoUnidadMedida"
                        className="inp2"
                        onChange={(e) => ChangeInput(e)}
                        {...register("unidadMedidaCodigoUnidadMedida", {
                          required: {
                            value: true,
                            message: "Debe seleccionar una unidad de medida",
                          },
                        })}
                      >
                        <option></option>
                        {unidad_medida.map((f, index) => (
                          <option key={index} value={f.codigo_unidad_medida}>
                            {f.codigo_unidad_medida}
                          </option>
                        ))}
                      </select>
                      <span className="err">
                        {errors?.unidadMedidaCodigoUnidadMedida?.message}
                      </span>
                    </div>
                  </div>
                  <div>
                    {/* ------------------------ */}
                    <label className="text-label">Contenido Neto</label>
                    <input
                      className="inp"
                      type="number"
                      min = '0'
                      name="contenido_neto"
                      autoComplete="off"
                      {...register("contenido_neto", {
                        required: {
                        
                          value: true,
                          message: "Debe ingresar un valor ",
                        },
                        maxLength: {
                          value: 4,
                          message:
                            "El contenido no debe tener mas de 4 caracteres!",
                        },
                        min: {
                          value:1,
                          message: "No puede ingresar valores negativos"
                        }
                      })}
                    />
                    <span className="err">{errors?.contenido_neto?.message}</span>
                    
                  </div>
                  <div>
                    {/* ------------------------ */}
                    <label className="text-label">Sub-Categoría</label>
                    <select
                      name="subcategoriumId"
                      className="inp5"
                      // value={state.nombre}
                      onChange={(e) => ChangeInput(e)}
                      {...register("subcategoriumId", {
                        required: {
                          value: true,
                          message: "Debe seleccionar una subcategoria",
                        },
                      })}
                    >
                      <option></option>
                      {subcategoria.map((f, index) => (
                        <option key={index} value={f.id}>
                          {f.nombre_subcategoria}
                        </option>
                      ))}
                    </select>
                    <span className="err">{errors?.subcategoriumId?.message}</span>
                  </div>
                  <button className="agregarModal" type="submit">
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default FormAgregarProducto;
