import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putProducto, getProductos, getSubcategoria } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
// import "./FormUnidadMedida.css";

function PutProductos() {
  const dispatch = useDispatch();
  const productos = useSelector((store) => store.productos);
  const subcategoria = useSelector((store) => store.subcategoria);
  
  console.log(subcategoria)

  const [state, setState] = useState({
    id: "",
    nombre: "",
    contenido_neto: "",
    subcategoriumId: "",
    unidadMedidaCodigoUnidadMedida: "",
  });

  useEffect(() => {
    dispatch(getProductos());
    dispatch(getSubcategoria());
  }, [dispatch]);

  
  const ChangeInput = (e) => {
    const value = e.target.value;
    // const name = e.target.name;
   
    for (let i = 0; i < productos.length; i++) {
      if (parseInt(value) === parseInt(productos[i].id)) {
        setState({
          id: productos[i].id,
          nombre: productos[i].nombre,
          contenido_neto: productos[i].contenido_neto,
          subcategoriumId: productos[i].subcategoriumId,
          unidadMedidaCodigoUnidadMedida:
            productos[i].unidadMedidaCodigoUnidadMedida,
        });
      }
    }   

    for(let i=0; i<subcategoria.length; i++) {
      if(parseInt(state.subcategoriumId) === parseInt(subcategoria[i].id)){
        setState({
          ...state,
          subcategoriumId: subcategoria[i].nombre_subcategoria,
          
        });
      }
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit =  (data, e) => {
    
    if(state.id){
  
   dispatch(putProducto(data))
  
   data = {
      id: "",
      nombre: "",
      contenido_neto: "",
      subcategoriumId: "",
      unidadMedidaCodigoUnidadMedida: "",
    }
   
    e.target.reset();
    swal({
      title: "Los datos se modificaron con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    }).then(r => dispatch(getProductos()))
  } else {
    swal({
      title: "Debe seleccionar un producto para modificar!",
      icon: "error",
      button: "Aceptar",
      timer: "5000",
    });
  }
  setState({
    id: "",
    nombre: "",
    contenido_neto: "",
    subcategoriumId: "",
    unidadMedidaCodigoUnidadMedida: "",
  });
  

};

  return (
    <>
      <div className="contenedorFAM">
        <header>
          <h1 id="title">Seleccionar Producto</h1>
        </header>
        <form
          id="survey-form"
          className="form"
          noValidate
          onChange={(e) => ChangeInput(e)}
          onSubmit={handleSubmit(submit)}
        >
          <div>
            <label className="text-label">Original</label>
            <select
              name="id"
              className="inp"
              onChange={(e) => ChangeInput(e)}
              
              {...register("id", {
                required: {
                  value: true,
                  message: "Debe seleccionar un Producto",
                },
              })}
            >
              <option></option>
              {productos.map((f, index) => (
                <option key={index} value={f.id}>
                  {f.nombre}
                </option>
              ))}
            </select>
            <span className="err">{errors?.id?.message}</span>
          </div>
       
          <div className="cont_prod">
            <div className="tiposProductos">
              <h6>id = {state.id}</h6>
              <h6>Nombre = {state.nombre}</h6>
              <h6>Cont Neto = {state.contenido_neto}</h6>
              <h6>Unidad Medida = {state.unidadMedidaCodigoUnidadMedida}</h6>
              <h6>Subcategoria = {state.subcategoriumId}</h6>
            </div>
          </div>

         
          <div>
            <label className="text-label">Nombre</label>
            <input
              className="inp"
              type="text"
              name="nombre"
              autoComplete="off"
              max="0"
              {...register("nombre", {
            
                maxLength: {
                  value: 15,
                  message: "El nombre debe tener menos de quince letras!",
                },
              
                max: {
                  value: 0,
                  message: "El nombre no puede comenzar con numeros",
                },
              })}
            />
            <span className="err">{errors?.nombre?.message}</span>
          </div>

          <div>
            <label className="text-label">Cont Neto</label>
            <input
              className="inp"
              type="number"
              min= "0"
              max
              name="contenido_neto"
              autoComplete="off"
             
              {...register("contenido_neto", {
                maxLength: {
                  value: 4,
                  message: "El contenido no debe tener mas de 4 caracteres"             },
                   min: {
                  value: 0,
                  message: "El contenido no puede ser negativo",
                },
              })}
            />
            <span className="err">{errors?.contenido_neto?.message}</span>
          </div>
          <div>
            <label className="text-label">Unidad Medida</label>
            <input
              className="inp"
              type="text"
              name="unidadMedidaCodigoUnidadMedida"
              autoComplete="off"
              max="0"
              {...register("unidadMedidaCodigoUnidadMedida", {
                maxLength: {
                  value: 4,
                  message: "La unidad debe tener menos de cuatro letras!",
                },
                max: {
                  value: 0,
                  message: "La unidad no puede comenzar con numeros",
                },
              })}
            />
            <span className="err">{errors?.unidadMedidaCodigoUnidadMedida?.message}</span>
          </div>



          <div>
            <label className="text-label">Subcategoria</label>
            <select
              name="subcategoriumId"
              className="inp"
              // value={paises.nombre_region}
              // onChange={(e) => ChangeInput(e)}
              {...register("subcategoriumId", {
          
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

          <div className="divForm">
         
            <button className="agregarModal" type="submit">
              Modificar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PutProductos;
