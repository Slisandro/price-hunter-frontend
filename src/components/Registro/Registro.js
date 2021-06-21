import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mostrarError } from '../Redux/actions';
import { Link } from "react-router-dom";
import "./Registro.css";
import aguila from "../../assets/aguila.png";
import { registrarUsuario, getGeneros, getTipoUsuario, getPaises, getCiudades} from '../Redux/actions';
import Modal from './Modal';

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

  const { email, nombre, apellido, fecha_de_nacimiento,  metodo_de_cobro, password, confirmar,generoId, ciudadId,banco,numero_de_cuenta,tipoUsuarioId} = registro;







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
    <>
    <div className="register">
    
    <div class="container-register">
    <div className="encabezado">
        <p class="title">Registrarme</p>
        <img src={aguila} alt="" width={40} height={40} className="logo__register" />
    </div>
    <div class="content">

    {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
      <form onSubmit={handleSubmit}>
        <div class="user-details">

          
          <div class="input-box">
            <span class="details">Email</span>
            <input 
            class="input" 
            type="text" 
            placeholder="Email" 
            name="email"
            value={email}
            onChange={handleInputRegister}
          
            />
          </div>

          
          <div class="input-box">
            <span class="details">Nombre</span>
            <input 
              class="input"
              type="text" 
              placeholder="Nombre" 
              name="nombre"
              value={nombre}
              onChange={handleInputRegister}
            
              />
          </div>
         
      
          <div class="input-box">
            <span class="details">Apellido</span>
            <input 
              class="input" 
              type="text" 
              placeholder="apellido"
              name="apellido"
              value={apellido}
              onChange={handleInputRegister} 
           
              />
          </div>

          <div class="input-box">
            <span class="details">Fecha de nacimiento</span>
            <input 
              class="input" 
              type="date" 
              placeholder="Fecha de nacimiento" 
              name="fecha_de_nacimiento"
              value={fecha_de_nacimiento}
              onChange={handleInputRegister}
            
              />
          </div>


          <div class="input-box">
            <span class="details">Metodo de cobro</span>
            <select class="input-select" onChange={handleInputRegister} name="metodo_de_cobro">
              <option value="">-</option>
              <option value="Mercado Pago">Mercado Pago</option>
              <option value="CBU">CBU</option>
            </select>
      
          
              {
                metodo_de_cobro !== "" ?
                  (metodo_de_cobro === "CBU" ? (
                    <>
                    <div>
                    <input
                      className="input last"
                      type="text"
                      placeholder="Ingrese su banco"
                      name="banco"
                      onChange={handleInputRegister}
                    />
                    </div>
                    <div>
                      <input
                        className="input last"
                        type="text"
                        placeholder="Ingrese su numero de cuenta"
                        name="numero_de_cuenta"
                        onChange={handleInputRegister}
                      />
                    </div>
                    </>
                    
                  ) : (
    
                    metodo_de_cobro === "Mercado Pago" ?
                    <div>
                      <input
                        class="input last last-date"
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
          



          <div class="input-box">
            <span class="details">Tipo de usuario</span>
          <select class="input-select" onChange={handleInputRegister} name="tipoUsuarioId">
            <option value="">-</option>
            {tipo_usuarios ? tipo_usuarios.map(item => (
              <option key={item.id} value={item.id}>{item.tipo_usuario}</option>
            )):("")}
          </select>
          </div>




          <div class="input-box">
            <span class="details">Pais</span>
            <select class="input-select" onChange={handleCity}>
              <option value="">-</option>{/*dispatch(getCiudades(item.codigo_alfa)*/}
              {paises ? paises.map(item => (
                <option key={item.codigo_alfa} value={item.codigo_alfa} >{item.nombre_pais}</option>
              )) : ("")}
            </select>
          </div>




          <div class="input-box">
            <span class="details">Ciudad</span>
            <select class="input-select" onChange={handleInputRegister} name="ciudadId">
              <option value="">-</option>
              {ciudades ? ciudades.map(item => (
                <option key={item.id} value={item.id}>{item.ciudad}</option>
              )):("")}
            </select>
          </div>

               
 
          
          
  
          <div class="input-box">
            <span class="details">Contraseña</span>
            <input 
              class="input" 
              type="password" 
              placeholder="Contraseña" 
            
              name="password"
              value={password}
              onChange={handleInputRegister}
              />
          </div>
          
          
          <div class="input-box">
            <span class="details">Confirmar contraseña</span>
            <input 
              class="input" 
              type="password"
              placeholder="Confirmar contraseña" 
              
              name="confirmar"
              value={confirmar}
              onChange={handleInputRegister}
              />
          </div>

          <div class="input-box">
            <span class="details">Genero</span>
          <select className="input-select" onChange={handleInputRegister} name="generoId">
            <option value="">-</option>
            {generos ? generos.map(genero => (
              <option key={genero.id} value={genero.id}>{genero.genero}</option>
            )):("")}
          </select>
          </div>


          <div className="input-box-tyc">
            <input 
              class="input-policy" 
              type="checkbox"
              placeholder="Confirmar contraseña" 
              name="terms"
              // value={terms}
              // onChange={handleTerms}
              />
             <Link className="link__sesion" to="/terminos-condiciones">Acepto los términos y condiciones</Link> 
              
              
          </div>

         
        </div>
        
   


        

        <div class="button">
          <input type="submit" value="Registrarme"/>
        </div>
      </form>
      
      


      <div>

      <Link className="link__sesion" to="/login">Volver a iniciar sesión</Link> 
      

      </div>
    </div>
  </div>
  </div>


  
  </>
  )
}




export default Registro;
















