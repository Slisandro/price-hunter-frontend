import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMoneda, getRegion, paisPost } from "../../../Redux/actions";
import { useForm } from "react-hook-form";

function Paises() {
  const dispatch = useDispatch();
  const region = useSelector((store) => store.region)
  const moneda = useSelector(store => store.moneda)
console.log(region)

  const [pais, setPais] = useState({
    codigo_alfa: "",
    nombre_pais: "",
    regioneId: "",
    monedaCodigoMoneda: "",
  });

  

  useEffect(() => {
    dispatch(getRegion());
    dispatch(getMoneda())
  }, [dispatch]);

  const [paises, setPaises] = useState(false);

  // const handleButtonPaises = (e) => {
  //   e.preventDefault();
  //   setPaises(!paises);
  // };

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    // console.log(target);
    // console.log(target.value);
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
      let id= region.find(id => id.nombre_region === e.target.value)
      let idRegion = id.id
      setPais({
        ...pais,
        regioneId: idRegion
      });
    }
    if (name === "codigo_moneda") {
      let id= moneda.find(id => id.codigo_moneda === e.target.value)
      let idMoneda = id.codigo_moneda
      setPais({
        ...pais,
        monedaCodigoMoneda: idMoneda
      });
    }
  };
 console.log(pais)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const alerta = useSelector((store) => store.alerta); 

  const submit = (data, e) => {
    // e.preventDefault();
    console.log(data) 
 if(pais.codigo_alfa && pais.nombre_pais){
    const nuevoPais = {
      codigo_alfa: pais.codigo_alfa.toLocaleUpperCase(),
      nombre_pais: pais.nombre_pais,
      regioneId: pais.regioneId,
      monedaCodigoMoneda: pais.monedaCodigoMoneda,
    };

    // if (!nuevoPais.nombre_pais) {
    //   alert("Por favor, ingrese un país");
    //   return;
    // }


    dispatch(paisPost(nuevoPais));
    // e.target.reset();
    e.target.reset();
    alert("Pais agregado exitosamente!");
    setPais({
      codigo_alfa: "",
      nombre_pais: "",
      regioneId: '',
      monedaCodigoMoneda: "",
    });
  }
  };
  return (
    <div>
      <form
        id="survey-form"
        // className="form"
        noValidate
        onChange={(e) => ChangeInput(e)}
        onSubmit={handleSubmit(submit)}
      >
         {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
        {/* <div className="divFormPAI"> */}
        <div>
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
            className="btm"
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
             <label className="text-label">Region</label>
             <select
                  name="nombre_region"
                  className="selectTransAgregar"
                  value={paises.nombre_region}
                  onChange={(e) => ChangeInput(e)}
                  >
                  <option></option>
                  {region.map((f) => (
                    <option value={f.nombre_region}>{f.nombre_region}</option>
                  ))}
                </select>
             </div>
             <div>
             <label className="text-label">Moneda</label>
             <select
                  name="codigo_moneda"
                  className="selectTransAgregar"
                  value={paises.nombre_region}
                  onChange={(e) => ChangeInput(e)}
                  >
                  <option></option>
                  {moneda.map((f) => (
                    <option value={f.codigo_moneda}>{f.codigo_moneda}</option>
                  ))}
                </select>        
           
        </div>
        <button className="agregarModal" type="submit">
          Agregar
        </button>
        {/* </div> */}
      </form>
    </div>
  );
}

export default Paises;
