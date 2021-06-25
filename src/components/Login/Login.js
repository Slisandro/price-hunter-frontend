
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Login.css";
import aguila from "../../assets/aguila.png";
import Google from '../../assets/google.png';
import { iniciarSesion, mostrarError, iniciarSesionGoogle } from "../Redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import GoogleLogin from "react-google-login";







const Login = (props) => {
  console.log(props)
  const alerta = useSelector((store) => store.alerta);
  const mensaje = useSelector((store) => store.mensaje);
  const autenticado = useSelector((store) => store.autenticado);
  const cliente = useSelector((store) => store.cliente);
  const isAdmin = useSelector((store) => store.isAdmin);

  const dispatch = useDispatch();

  /*****************************************************************************************************************************/



  /* Con este useEffect lo que hacemos es; Si autenticado pasa a true porque el user se logueo exitosamente,
  lo enviamos hacia su panel de control. Si mensaje pasa a true, es porque hubo un error, por ende se dispara la action
  mostrar error, la cual va  mostrar el mensaje de error que viene del back y ademas, una categoria, que no es mas que una clase 
  que le da estilo al mensaje ("alerta-error" en el css)*/
  useEffect(() => {
    if (autenticado) {
      if (cliente) {
        props.history.push('/tablerocliente/principal');
      } else {
        if (isAdmin) {
          props.history.push('/admin');
        } else {
          props.history.push('/tablero');
        }
      }
      // if (!cliente) {
      //   props.history.push('/tablero');
      // } else {
      //   if (isAdmin) {
      //     props.history.push('/admin');
      //   } else {
      //     props.history.push('/tablerocliente/principal');
      //   }
      // }
    }
    if (mensaje) {
      mostrarError(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);






/******************************************************************************************************************************/


const onSuccessGoogle = (googleUser) => {
  // var datos = googleUser.profileObj;
  var datos = googleUser;
  // console.log(googleUser)
  dispatch(iniciarSesionGoogle(datos))
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
    if (email.trim() === '' || password.trim() === '') {
      dispatch(mostrarError('Todos los campos son obligatorios', 'alerta-error'));
      return;
    }

    if(password < 6){
      dispatch(mostrarError('La contraseña debe tener mas de 6 caracteres', 'alerta-error'));
      return;

    }

    dispatch(iniciarSesion({
      email,
      password
    })
    )

    guardarUser({
      email: "",
      password: ""
    })



  }



  return (
    <section className="loginHunter">
     {mensaje ? (<div className={`alerta ${mensaje.categoria}`}> {mensaje.msg} </div>) : null}
      <section className="loginContainer_hunter">
        <img src={aguila} alt="" id="logologin" />
        <h2 className="h2Title">Iniciar sesión</h2>

       
        {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}

        <form className="loginContainer_hunter--form" onSubmit={handleSubmit}>
          <input
            name="email"
            id="input_login"
            type="text"
            placeholder="Correo"
            onChange={handleInputLogin}
            value={email}
          />
          <input
            name="password"
            id="input_login"
            type="password"
            placeholder="Contraseña"
            onChange={handleInputLogin}
            value={password}
          />

          <button className="button__login" type="submit" >Iniciar sesión</button>



          <div className="loginContainer_hunter--remember-me">
            <label>
              <input className="check" type="checkbox" id="cbox1" value="first_checkbox" />Recuérdame
            </label>
            <label>
              <a href="/">Olvidé mi contraseña</a>
            </label>
          </div>
        </form>

        <section className="loginContainer_hunter--social-media">
          
          
          
          <GoogleLogin
            clientId="765999495814-0tujavs1lfj62o58ror1b28c39ackvam.apps.googleusercontent.com"
            render={renderProps => (
              <button className="button__login__google" onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={Google} width={30} height={30} alt="" /></button>
            )}
            onSuccess={onSuccessGoogle}
            onFailure={onSuccessGoogle}
            cookiePolicy={'single_host_origin'}
          />




        </section>

        <div className="register__loginHunter">
          <p className="loginContainer_hunter--register"> No tienes cuenta ?</p>
          <p className="loginContainer_hunter--register .link"><Link className="link" to="/registro">Regístrate</Link></p>
        </div>

      </section>
    </section>
  );
};

export default Login;
