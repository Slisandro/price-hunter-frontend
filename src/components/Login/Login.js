
import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Login.css";
import aguila from "../../assets/aguila.png";
// import Twitter from '../../assets/twitter.png';
import Google from '../../assets/google.png';
import { iniciarSesion, mostrarError } from "../Redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import GoogleLogin from "react-google-login";







const Login = (props) => {
  console.log(props)
  
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
    if (autenticado) {
      props.history.push('/tablero');
    }
    if (mensaje) {
      mostrarError(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);






  /******************************************************************************************************************************/
  const responseGoogle  =  (response)  => {
    console.log(response)

  }


  /*******************************************************************************************************************************/

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
                          <input className="check" type="checkbox" id="cbox1" value="first_checkbox"/>Recuérdame
                        </label>
                        <label>
                          <a href="/">Olvidé mi contraseña</a>
                        </label>
                      </div>
                </form>
                
                <section className="login__container--social-media">
                    <GoogleLogin
                        clientId="765999495814-0tujavs1lfj62o58ror1b28c39ackvam.apps.googleusercontent.com"
                        render={renderProps => (
                        <button className="button__login__google"  onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={Google} width={30} height={30} alt=""/><p>Iniciar sesion con Google</p></button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    
                </section>
                
                <div className="register__login">
                    <p className="login__container--register"> No tienes cuenta ?</p>
                    <p className="login__container--register .link"><Link className="link" to="/registro">Regístrate</Link></p>
                </div>
          
          </section>
    </section>
  );
};

export default Login;
