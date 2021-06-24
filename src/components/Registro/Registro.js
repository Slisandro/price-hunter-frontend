import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mostrarError } from '../Redux/actions';
import { Link } from "react-router-dom";
import "./Registro.css";
import { registrarUsuario, getGeneros, getTipoUsuario, getPaises, getCiudades} from '../Redux/actions';










const Registro = (props) => {
  const alerta = useSelector((store) => store.alerta);
  const generos = useSelector((store) => store.generos);
  const paises = useSelector((store) => store.paises);
  const ciudades = useSelector((store) => store.ciudades);
 


  const mensaje = useSelector((store) => store.mensaje);
  const autenticado = useSelector((store) => store.autenticado);
 


  const dispatch = useDispatch();




  

  const [registro, guardarRegistro] = useState({
    email: "",
    nombre: "",
    apellido: "",
    fecha_de_nacimiento: [],
    ciudadId: "",
    generoId: "",
    metodo_de_cobro: "",
    banco: "",
    numero_de_cuenta: "",
    tipoUsuarioId: "",
    password: "",

    confirmar: "",
    

  })

  const { email, nombre, apellido, fecha_de_nacimiento, metodo_de_cobro, password, confirmar, generoId, ciudadId, banco, numero_de_cuenta, tipoUsuarioId } = registro;







  useEffect(() => {
    if (autenticado) {
      props.history.push("/login")
      
    }
    if (mensaje) {
      dispatch(mostrarError(mensaje.msg, mensaje.categoria))
    }

  }, [mensaje, autenticado, props.history, dispatch])






  //Ejecutamos el llamado al back para traer las ciudades
  useEffect(() => {
    dispatch(getGeneros())
    dispatch(getTipoUsuario())
    dispatch(getPaises())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])






  const handleInputRegister = e => {
    guardarRegistro({
      ...registro,
      [e.target.name]: e.target.value
    })
  }


  const handleCity = e => {
    dispatch(getCiudades(e.target.value))
  }





  const handleSubmit = e => {
    e.preventDefault();

    if (nombre.trim() === '' || apellido.trim() === '' || fecha_de_nacimiento.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
      dispatch(mostrarError('Todos los campos son obligatorios', 'alerta-error'));
      return;

    }

    if (apellido.length < 3) {
      dispatch(mostrarError('Apellido debe contener mas de tres caracteres', 'alerta-error'));
      return;

    }

    // Password minimo de 6 caracteres
    if (password.length < 6) {
      dispatch(mostrarError('El password debe ser de al menos 6 caracteres', 'alerta-error'));
      return;
    }

    //Los 2 passwords son iguales
    if (password !== confirmar) {
      dispatch(mostrarError('Los passwords no son iguales', 'alerta-error'));
      return;
    }




    //Si pasamos todas las validacions: 
    dispatch(registrarUsuario({
      nombre,
      apellido,
      email,
      fecha_de_nacimiento,
      ciudadId,
      generoId,
      metodo_de_cobro,
      banco,
      numero_de_cuenta,
      tipoUsuarioId,
      password
    })
    )

  }

  return ( 

    <div className="registerContent">
    <div className="container_form_register">
      <header>Registrarme</header>








          <div className="form-outer">
          
          {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}

            <form onSubmit={handleSubmit}>
              
              
              
              <div className="page">
                  {/* <div className="title">Sobre usted</div> */}

                                <div className="field">
                                    <div className="label">Email</div>
                                        <input
                                            className="inputRegister"
                                            type="text"
                                            placeholder="Email" 
                                            name="email"
                                            value={email}
                                            onChange={handleInputRegister}
          
                                        />
                                </div>
          
                                
                                <div className="field">
                                    <div className="label">Nombre</div>
                                        <input
                                            className="inputRegister"
                                            type="text"
                                            placeholder="Nombre" 
                                            name="nombre"
                                            value={nombre}
                                            onChange={handleInputRegister}
          
                                        />
                                </div>

                                <div className="field">
                                    <div className="label">Apellido</div>
                                        <input
                                            className="inputRegister"
                                            type="text"
                                            placeholder="Apellido" 
                                            name="apellido"
                                            value={apellido}
                                            onChange={handleInputRegister}
          
                                        />
                                </div>


                                <div className="field">
                                    <div className="label">Fecha de nacimiento</div>
                                    <input 
                                            className="inputRegister"
                                            type="date" 
                                            placeholder="Fecha de nacimiento" 
                                            name="fecha_de_nacimiento"
                                            value={fecha_de_nacimiento}
                                            onChange={handleInputRegister}
                                    />
                                </div>



                                <div className="field">
                                    <div className="label">Genero</div>
                                    <select onChange={handleInputRegister} name="generoId">
                                        <option value="">-</option>
                                        {generos ? generos.map(genero => (
                                        <option key={genero.id} value={genero.id}>{genero.genero}</option>
                                        )) : ("")}
                                        </select>
                                </div>
          
          
                                <div className="field">
                                    <div className="label">Pais</div>
                                    <select onChange={handleCity}>
                                        <option value="">-</option>
                                        {paises ? paises.map(item => (
                                          <option key={item.codigo_alfa} value={item.codigo_alfa} >{item.nombre_pais}</option>
                                        )) : ("")}
                                    </select>
                                </div>
          
          
                                <div className="field">
                                    <div className="label">Ciudad</div>
                                    <select onChange={handleInputRegister} name="ciudadId">
                                        <option value="">-</option>
                                        {ciudades ? ciudades.map(item => (
                                          <option key={item.id} value={item.id}>{item.ciudad}</option>
                                        )):("")}
                                    </select>
                                </div>


                                <div className="field">
                                    <div className="label">Metodo de cobro</div>
                                    <select onChange={handleInputRegister} name="metodo_de_cobro">
                                        <option value="">-</option>
                                        <option value="Mercado Pago">Mercado Pago</option>
                                        <option value="CBU">CBU</option>
                                    </select>
          
                                    {
                                      metodo_de_cobro !== "" ?
                                        (metodo_de_cobro === "CBU" ? (
                                          <>
                                          <div className="field">
                                          <input
                                            className="inputRegister"
                                            type="text"
                                            placeholder="Banco"
                                            name="banco"
                                            onChange={handleInputRegister}
                                          />
                                          </div>
                                          <div className="field">
                                            <input
                                              className="inputRegister"
                                              type="text"
                                              placeholder="Nº de cuenta"
                                              name="numero_de_cuenta"
                                              onChange={handleInputRegister}
                                            />
                                          </div>
                                          </>
                                          
                                        ) : (
              
                                          metodo_de_cobro === "Mercado Pago" ?
                                          <div className="field">
                                            <input
                                              className="inputRegister"
                                              type="text"
                                              placeholder="Ingrese su usuario"
                                              name="numero_de_cuenta"
                                              onChange={handleInputRegister}
                                            />
                                            </div>
                                            : ("")
                                        )
                                        ) : ("")
                                    }
                                </div>


                                <div className="field">
                                    <div className="label">Contraseña</div>
                                      <input
                                            className="inputRegister"
                                            type="password"
                                            placeholder="contraseña" 
                                            name="password"
                                            value={password}
                                            onChange={handleInputRegister}
                                            />
                                </div>



                                <div className="field">
                                    <div className="label">Confirmar contraseña</div>
                                    <input
                                        className="inputRegister" 
                                        type="password"
                                        placeholder="Confirmar contraseña" 
                                        name="confirmar"
                                        value={confirmar}
                                        onChange={handleInputRegister}
                                        />
                                </div>
                    

                                <div className="field">
                                    <button>Siguiente</button>
                                </div>




                </div>  
          </form>
          <Link className="linklogin" to="/login" >Volver a iniciar sesion</Link>
        </div>
    </div>
    
    
    </div>

  );
}

export default Registro;












