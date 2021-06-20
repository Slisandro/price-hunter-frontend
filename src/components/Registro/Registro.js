import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mostrarError } from '../Redux/actions';
import { Link } from "react-router-dom";
import "./Registro.css";
import aguila from "../../assets/aguila.png";
import { registrarUsuario, getGeneros, getTipoUsuario, getPaises, getCiudades } from '../Redux/actions';

// import axios from 'axios';






const Registro = (props) => {

  const alerta = useSelector((store) => store.alerta);
  const generos = useSelector((store) => store.generos);
  const tipo_usuarios = useSelector((store) => store.tipo_usuarios);
  const paises = useSelector((store) => store.paises);
  const ciudades = useSelector((store) => store.ciudades);


  const mensaje = useSelector((store) => store.mensaje);
  const autenticado = useSelector((store) => store.autenticado);


  const dispatch = useDispatch();




  // const [ciudad , setCiudad] = useState(""); 

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
      props.history.push("/tablero")
    }
    if (mensaje) {
      dispatch(mostrarError('Error en el apellido enviado', 'alerta-error'))
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

    if (nombre.trim() === '' || nombre.length < 3) {
      dispatch(mostrarError('Error en el nombre enviado', 'alerta-error'));
      return;

    }

    if (apellido.trim() === '' || apellido.length < 3) {
      dispatch(mostrarError('Error en el apellido enviado', 'alerta-error'));
      return;

    }

    if (fecha_de_nacimiento.trim() === '' || fecha_de_nacimiento.length < 3) {
      dispatch(mostrarError('Error en la fecha de nacimiento enviada', 'alerta-error'));
      return;

    }


    if (email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
      dispatch(mostrarError('Todos los campos son obligatorios', 'alerta-error'));
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

    <section className="register">
      <section className="register__container">


        <div className="registro__start">
          <img src={aguila} alt="" className="logo__register" />
          <h2>Regístrate</h2>
          <p className="p">Y comenzá a cazar precios</p>
        </div>

        {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}


        <form className="register__container--form" onSubmit={handleSubmit}>

          <input
            className="input__registro"
            type="text"
            placeholder="Correo"
            name="email"
            value={email}
            onChange={handleInputRegister}
          />


          <input
            className="input__registro"
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={nombre}
            onChange={handleInputRegister}
          />


          <input
            className="input__registro"
            type="text"
            placeholder="Apellido"
            name="apellido"
            value={apellido}
            onChange={handleInputRegister}
          />



          <input
            className="input__registro"
            type="date"
            placeholder="Fecha de nacimiento"
            name="fecha_de_nacimiento"
            value={fecha_de_nacimiento}
            onChange={handleInputRegister}
          />









          <label>Genero</label>
          <select className="select" onChange={handleInputRegister} name="generoId">
            <option value="">-</option>
            {generos ? generos.map(genero => (
              <option key={genero.id} value={genero.id}>{genero.genero}</option>
            )) : ("")}
          </select>





          <label>Metodo de cobro</label>
          <select className="select" onChange={handleInputRegister} name="metodo_de_cobro">
            <option value="">-</option>
            <option value="Mercado Pago">Mercado Pago</option>
            <option value="CBU">CBU</option>
          </select>

          {
            metodo_de_cobro !== "" ?
              (metodo_de_cobro === "CBU" ? (
                <>
                  <label>Ingrese su banco</label>
                  <input
                    className="input__registro"
                    type="text"
                    placeholder="Ingrese su banco"
                    name="banco"
                    onChange={handleInputRegister}
                  />
                  <label>Ingrese su numero de cuenta</label>
                  <input
                    className="input__registro"
                    type="text"
                    placeholder="Ingrese su numero de cuenta"
                    name="numero_de_cuenta"
                    onChange={handleInputRegister}
                  />
                </>

              ) : (
                metodo_de_cobro === "Mercado Pago" ?
                  <input
                    className="input__registro"
                    type="text"
                    placeholder="Ingrese su cuenta de Mercado Libre"
                    name="numero_de_cuenta"
                    onChange={handleInputRegister}
                  />
                  : ("")
              )
              ) : ("")
          }









          <label>Tipo de usuario</label>
          <select className="select " onChange={handleInputRegister} name="tipoUsuarioId">
            <option value="">-</option>
            {tipo_usuarios ? tipo_usuarios.map(item => (
              <option key={item.id} value={item.id}>{item.tipo_usuario}</option>
            )) : ("")}
          </select>


          <label>Seleccione su pais</label>
          <select className="select" onChange={handleCity}>
            <option value="">-</option>{/*dispatch(getCiudades(item.codigo_alfa)*/}
            {paises ? paises.map(item => (
              <option key={item.codigo_alfa} value={item.codigo_alfa} >{item.nombre_pais}</option>
            )) : ("")}
          </select>




          <label>seleccione su ciudad</label>
          <select className="select last" onChange={handleInputRegister} name="ciudadId">
            <option value="">-</option>
            {ciudades ? ciudades.map(item => (
              <option key={item.id} value={item.id}>{item.ciudad}</option>
            )) : ("")}
          </select>




          <input
            className="input__registro"
            type="password"
            placeholder="Contraseña"
            name="password"
            value={password}
            onChange={handleInputRegister}
          />



          <input
            className="input__registro"
            type="password"
            placeholder="Confirmar contraseña"
            name="confirmar"
            value={confirmar}
            onChange={handleInputRegister}
          />


          <button className="button__registro">Registrarme</button>


        </form>

        <Link className="link__sesion" to="/login">Iniciar sesión</Link>

      </section>
    </section>

  )
}




export default Registro;

