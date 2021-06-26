
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Login.css";
// import aguila from "../../assets/aguila.png";
import Google from '../../assets/google.png';
import { iniciarSesion, mostrarError, iniciarSesionGoogle } from "../Redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import GoogleLogin from "react-google-login";
import svg from "../../assets/undraw_personal_finance_tqcd.svg";








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
    var datos = googleUser.profileObj;
    console.log(datos)
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

    if (password < 6) {
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
    <div className="loger_cont">

      <div className="global-container__log">

        <img className="img__Login text-center" src={svg} alt="" width={350} />
       
        <div className="card login-form">
        {mensaje ? (<div className={`alerta ${mensaje.categoria}`}> {mensaje.msg} </div>) : null}
          <div className="card-body">

            <h1 className="card-title text-center">Iniciar Sesion</h1>
            <div className="card-text">
              {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Correo</label>
                  <input
                    name="email"
                    type="email"
                    className="logput form-control form-control-sm"
                    onChange={handleInputLogin}
                    value={email}
                  />

                </div>

                <div className="form-group">
                  <label>Contraseña</label>
                  <a className="a-log" href="!#" >Olvidó su contraeña</a>
                  <input

                    type="password"
                    className="logput form-control form-control-sm"
                    name="password"
                    onChange={handleInputLogin}
                    value={password}
                  />

                </div>

                <button type="submit" className="btn btn-block">Iniciar sesion</button>

                <GoogleLogin
                  clientId="765999495814-0tujavs1lfj62o58ror1b28c39ackvam.apps.googleusercontent.com"
                  render={renderProps => (
                    <button className="btn_google btn-block" onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={Google} width={30} height={30} alt="" /></button>
                  )}
                  onSuccess={onSuccessGoogle}
                  onFailure={onSuccessGoogle}
                  cookiePolicy={'single_host_origin'}
                />



                <div className="singup">
                  No tiene una cuenta? <Link className="a-new" to="/registro">Crear aquí</Link>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;




