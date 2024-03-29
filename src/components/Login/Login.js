
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Login.css";
// import aguila from "../../assets/aguila.png";
import Google from '../../assets/google.png';
import { iniciarSesion, mostrarError, iniciarSesionGoogle } from "../Redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import GoogleLogin from "react-google-login";
// import svg from "../../assets/undraw_personal_finance_tqcd.svg";
import {
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Card,
  CardBody,
  Col
} from "reactstrap";
import NavLogin from "./NavLogin";








const Login = (props) => {
  console.log(props)
  const alerta = useSelector((store) => store.alerta);
  const mensaje = useSelector((store) => store.mensaje);
  const autenticado = useSelector((store) => store.autenticado);
  const cliente = useSelector((store) => store.cliente);
  const isAdmin = useSelector((store) => store.isAdmin);
  const isUser = useSelector((store) => store.isUser)

  const dispatch = useDispatch();

  /*****************************************************************************************************************************/



  /* Con este useEffect lo que hacemos es; Si autenticado pasa a true porque el user se logueo exitosamente,
  lo enviamos hacia su panel de control. Si mensaje pasa a true, es porque hubo un error, por ende se dispara la action
  mostrar error, la cual va  mostrar el mensaje de error que viene del back y ademas, una categoria, que no es mas que una clase 
  que le da estilo al mensaje ("alerta-error" en el css)*/
  useEffect(() => {
    if (autenticado) {
      if (cliente) {
        props.history.push('/cliente/bienvenida');
      } else {
        if (isAdmin) {
          props.history.push('/admin');
        } else {
          if (isUser) {
            props.history.push('/cazador');
          }
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
    email: "pedroperez@correo.com",
    password: "abc1234",
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
    <div className="Totallogin">
      <NavLogin />

      <div className="loger_cont">
        <p className="welcome-login">Bienvenido</p>
        {mensaje ? (<div className={`alerta ${mensaje.categoria} text-center`}> {mensaje.msg} </div>) : null}
        {alerta ? (<div className={`alerta ${alerta.categoria} text-center`}> {alerta.msg} </div>) : null}
        <div className="global-container__log">



  
          <Card style={{backgroundColor:"black"}}>
           
            <CardBody>
              
              <form className="login__form" onSubmit={handleSubmit}>
                <Col md="12">
                  <FormGroup row>
                    <Label for="correo"> Correo </Label>
                    <Input
                      type="email"
                      name="email"
                      id="correo"
                      placeholder="Ingrese su correo"
                      onChange={handleInputLogin}
                      value={email}
                    />

                  </FormGroup>


                  <FormGroup row>
                    <Label for="examplePassword">Contraseña</Label>
                    <Input

                      type="password"
                      name="password"
                      id="examplePassword"
                      placeholder="Ingrese su contraseña"
                      autoComplete="off"
                      onChange={handleInputLogin}
                      value={password}
                    />
                  </FormGroup>
                  <div className=" text-center google__log">
                    <FormText color="muted">
                      <p>Iniciar sesion con Google</p>
                      <GoogleLogin
                        clientId="765999495814-0tujavs1lfj62o58ror1b28c39ackvam.apps.googleusercontent.com"
                        render={renderProps => (
                          <button className="button__google" onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={Google} alt="" width={25} /></button>
                        )}
                        onSuccess={onSuccessGoogle}
                        onFailure={onSuccessGoogle}
                        cookiePolicy={'single_host_origin'}
                      />

                    </FormText>
                  </div>


                  <Button className="button__login" type="submit" block>
                    Iniciar sesion
                  </Button>

                </Col>
              </form>



            </CardBody>
          </Card>


        </div>
      </div>
    </div>

  );
};

export default Login;








