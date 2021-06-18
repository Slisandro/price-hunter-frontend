import React, { useState,useEffect } from 'react';
// import { Button } from 'react-bootstrap';
// import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import "./Login.css";
import aguila from "../../assets/aguila.png";


import Twitter from '../../assets/twitter.png';
import Google from '../../assets/google.png';
import {iniciarSesion, mostrarError} from "../Redux/actions";
import {useSelector, useDispatch} from 'react-redux';





{/*
 import Twitter from "../../assets/twitter.png";
 import Google from "../../assets/google.png";
 import { mostrarError } from "../Redux/actions";
 import { useSelector, useDispatch } from "react-redux";
*/}

const Login = (props) => {
  
  const alerta = useSelector((store) => store.alerta);
  const mensaje = useSelector((store) => store.mensaje);
  const autenticado = useSelector((store) => store.autenticado);

  const dispatch = useDispatch();

/*****************************************************************************************************************************/



  /* Con este useEffect lo que hacemos es; Si autenticado pasa a true porque el user se logueo exitosamente,
  lo enviamos hacia su panel de control. Si mensaje pasa a true, es porque hubo un error, por ende se dispara la action
  mostrar error, la cual va  mostrar el mensaje de error que viene del back y ademas, una categoria, que no es mas que una clase 
  que le da estilo al mensaje ("alerta-error" en el css)*/
  useEffect(() => {
    if(autenticado) {
        props.history.push('/tablero');
    }
    if(mensaje) {
        mostrarError(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
}, [mensaje, autenticado, props.history]);






/******************************************************************************************************************************/

  
const [user, guardarUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

    const handleInputLogin = e => {
      guardarUser({
        ...user,
        [e.target.name]: e.target.value
      })
    }
    
  
    const handleSubmit = e => {
      e.preventDefault();

       // Validar que no haya campos vacios
       if(email.trim() === '' || password.trim() === '') {
        dispatch(mostrarError('Todos los campos son obligatorios', 'alerta-error'));
    }

    dispatch(iniciarSesion({
      email,
      password
      })
    )

    }
  

  {/* const handleInputLogin = (e) => {
    guardarUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if (email.trim() === "" || password.trim() === "") {
      dispatch(
        mostrarError("Todos los campos son obligatorios", "alerta-error")
      );
    }

    // dispatch(loginRequest(user));
  }; */}

  return (
    <section className="login">
          <section className="login__container">
              <img src={aguila} alt="" className="logo__login" />
              <h2>Iniciar sesión</h2>
              
              { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null }

                <form className="login__container--form" onSubmit={handleSubmit}>
                      <input 
                        name="email"
                        className="input_login" 
                        type="text" 
                        placeholder="Correo"
                        onChange={handleInputLogin}
                        value={email}
                        />
                      <input 
                        name="password"
                        className="input_login" 
                        type="password" 
                        placeholder="Contraseña"
                        onChange={handleInputLogin}
                        value={password}
                        />
              
                        <button className="button__login">Iniciar sesión</button>
                  
                      
                      
                      <div className="login__container--remember-me">
                        <label>
                          <input type="checkbox" id="cbox1" value="first_checkbox"/>Recuérdame
                        </label>
                        <label>
                          <a href="/">Olvidé mi contraseña</a>
                        </label>
                      </div>
                </form>
                
                <section className="login__container--social-media">
                    <div><img src={Google} alt=""/> Inicia sesión con Google</div>
                    <div><img src={Twitter} alt=""/> Inicia sesión con Twitter</div>
                </section>
                
                <div className="register__login">
                    <p className="login__container--register"> No tienes cuenta ?</p>
                    <p className="login__container--register .link"><Link className="link" to="/registro">Regístrate</Link></p>
                </div>
          
          </section>

       {/* <section className="login__container">
         <img src={aguila} alt="" className="logo__login" />
         <h2>Iniciar sesión</h2>
         {alerta ? (
           <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
         ) : null}
         <form className="login__container--form" onSubmit={handleSubmit}>
           <input
             name="email"
             className="input_login"
             type="text"
             placeholder="Correo"
             onChange={handleInputLogin}
             value={email}
           />
           <input
             name="password"
             className="input_login"
             type="password"
             placeholder="Contraseña"
             onChange={handleInputLogin}
             value={password}
           />

           <button className="button__login">Iniciar sesión</button>
           <div className="login__container--remember-me">
             <label>
               <input type="checkbox" id="cbox1" value="first_checkbox" />
               Recuérdame
             </label>
             <label>
               <a href="/">Olvidé mi contraseña</a>
             </label>
           </div>
         </form>

         <section className="login__container--social-media">
           <div>
             <img src={Google} alt="" /> Inicia sesión con Google
           </div>
           <div>
             <img src={Twitter} alt="" /> Inicia sesión con Twitter
           </div>
         </section>

         <div className="register__login">
           <p className="login__container--register"> No tienes cuenta ?</p>
           <p className="login__container--register .link">
             <Link className="link" to="/registro">
               Regístrate
             </Link>
           </p>
         </div>
       </section>

    </section> */}
  );
};

export default Login;
