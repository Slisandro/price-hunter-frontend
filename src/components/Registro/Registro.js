import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mostrarError } from '../Redux/actions';
import { Link } from "react-router-dom";
import "./Registro.css";
import { registrarUsuario, getGeneros, getTipoUsuario, getPaises, getCiudades } from '../Redux/actions';
import {
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  Col,
  Row
} from "reactstrap";
import NavRegister from "./NavRegister";









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
    //Confirmar NO SE ENVIA.
    confirmar: ""


  })

  const { email,
    nombre,
    apellido,
    fecha_de_nacimiento,
    metodo_de_cobro,
    password,
    confirmar,
    generoId,
    ciudadId,
    banco,
    numero_de_cuenta,
    tipoUsuarioId
  } = registro;




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




  /*************AQUI HACEMOS EL SUBMIT CON LOS DATOS RECOLECTADOS EN EL FORM**************************************/

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

    //Limpiamos el formulario
    guardarRegistro({
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
      confirmar: ""
    })

  }

  <Row></Row>





  return (
    <div>
      <NavRegister />
      <div className="registerContent">

      <p className="welcome-login">Bienvenido</p>
      <p className="register__description">Aqui podrás crear tu cuenta y comenzar a cazar precios !</p>
            
            <Card className="col-md-6">
            {mensaje ? (<div className={`alerta ${mensaje.categoria} text-center` }> {mensaje.msg} </div>) : null}
              <CardBody >
              {alerta ? (<div className={`alerta ${alerta.categoria} text-center`}> {alerta.msg} </div>) : null}
                
                <form onSubmit={handleSubmit}>
                  <Col md="12">
                    <div className="form-row">
                      
                      <FormGroup className="col-md-6">
                        <Label for="inputEmail">Email</Label>
                        <Input
                          bsSize="md"
                          type="email"
                          id="inputEmail"
                          placeholder="Email"
                          name="email"
                          value={email}
                          onChange={handleInputRegister}
    
                        />
                      </FormGroup>
    
                      <FormGroup className="col-md-6">
                        <Label for="inputEmail">Nombre</Label>
                        <Input
                          bsSize="md"
                          type="text"
                          id="inputNombre"
                          placeholder="Nombre"
                          name="nombre"
                          value={nombre}
                          onChange={handleInputRegister}
    
                        />
                      </FormGroup>
                    </div>
    

                    <div className="form-row">
                      <FormGroup className="col-md-6">
                        <Label for="inputApellido">Apellido</Label>
                        <Input
                          bsSize="md"
                          type="text"
                          id="inputApellido"
                          placeholder="Apellido"
                          name="apellido"
                          value={apellido}
                          onChange={handleInputRegister}
    
                        />
                      </FormGroup>
    
                      <FormGroup className="col-md-6">
                        <Label for="inputFecha">Fecha de nacimiento</Label>
                        <Input
                          bsSize="md"
                          type="date"
                          id="inputFecha"
                          placeholder="Fecha de nacimiento"
                          name="fecha_de_nacimiento"
                          value={fecha_de_nacimiento}
                          onChange={handleInputRegister}
    
                        />
                      </FormGroup>
                    </div>
    
  
                    <div className="form-row">
                      <FormGroup className="col-md-6">
                        <Label for="inputGenero">Genero</Label>
                        <Input
                          bsSize="md"
                          type="select"
                          id="inputGenero"
                          placeholder="genero"
                          name="generoId"
                          value={generoId}
                          onChange={handleInputRegister}
                        >
                          {generos ? generos.map(genero => (
                            <option key={genero.id} value={genero.id}>{genero.genero}</option>
                          )) : ("")}
                        </Input>
                      </FormGroup>
    
                      <FormGroup className="col-md-6">
                        <Label for="inputPais">Pais</Label>
                        <Input
                          bsSize="md"
                          type="select"
                          id="inputPais"
                          name="pais"
                          onChange={handleCity}
                        >
                          {paises ? paises.map(item => (
                            <option key={item.codigo_alfa} value={item.codigo_alfa} >{item.nombre_pais}</option>
                          )) : ("")}
                        </Input>
                      </FormGroup>
    
                    </div>
    
    
  
                    <FormGroup>
                      <Label for="inputCiudad">Ciudad</Label>
                      <Input
                        bsSize="md"
                        type="select"
                        id="inputCiudad"
                        name="ciudadId"
                        value={ciudadId}
                        onChange={handleInputRegister}
                      >
                        {ciudades ? ciudades.map(item => (
                          <option key={item.id} value={item.id}>{item.ciudad}</option>
                        )) : ("")}
                      </Input>
                    </FormGroup>
    
                    <FormGroup>
                      <Label for="inputCobro">Seleccione un metodo de cobro</Label>
                      <Input
                        bsSize="md"
                        type="select"
                        id="inputCobro"
                        onChange={handleInputRegister}
                        name="metodo_de_cobro"
                      >
                        <option value="">-</option>
                        <option value="Mercado Pago">Mercado Pago</option>
                        <option value="CBU">CBU</option>
                      </Input>
    
    
                      {
                        metodo_de_cobro !== "" ?
                          (metodo_de_cobro === "CBU" ? (
                            <>
                              <div className="form-row">
                                <FormGroup className="col-md-6">
                                  <Input
                                    bsSize="sm"
                                    type="text"
                                    placeholder="Banco"
                                    name="banco"
                                    onChange={handleInputRegister}
    
    
                                  />
                                </FormGroup>
    
                                <FormGroup className="col-md-6">
                                  <input
                                    bsSize="sm"
                                    type="text"
                                    placeholder="Nº de cuenta"
                                    name="numero_de_cuenta"
                                    onChange={handleInputRegister}
                                  />
                                </FormGroup>
    
                              </div>
                            </>
    
                          ) : (
    
                            metodo_de_cobro === "Mercado Pago" ?
                              <div className="form-row">
                                <FormGroup className="col-md-6">
                                  <input
                                    bsSize="sm"
                                    type="text"
                                    placeholder="Ingrese su usuario"
                                    name="numero_de_cuenta"
                                    onChange={handleInputRegister}
                                  />
                                </FormGroup>
    
                              </div>
                              : ("")
                          )
                          ) : ("")
                      }
    
                    </FormGroup>
    
    
    
    
    
    
    
                    <div className="form-row">
    
                      <FormGroup className="col-md-6">
                        <Label for="inputPassword">Contraseña</Label>
                        <Input
                          bsSize="sm"
                          type="password"
                          id="inputPassword"
                          name="password"
                          value={password}
                          onChange={handleInputRegister}
    
                        />
                      </FormGroup>
    
                      <FormGroup className="col-md-6">
                        <Label for="inputConfirmar">Confirmar contraseña</Label>
                        <Input
                          bsSize="sm"
                          type="password"
                          id="inputConfirmar"
                          name="confirmar"
                          value={confirmar}
                          onChange={handleInputRegister}
    
                        />
                      </FormGroup>
    
    
                    </div>
    
    
    
    
                    <Button bsSize="sm" type="submit" color="primary" block>Registrarme</Button>
                  </Col>
                </form>
              </CardBody>
            </Card>


      </div>
      </div>
  );
}

export default Registro;
































// {mensaje ? (<div className={`alerta ${mensaje.categoria}`}> {mensaje.msg} </div>) : null}
// <div className="container_form_register">
//     <header>Registrarme</header>


//     <div className="form-outer">

//     {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}

//       <form onSubmit={handleSubmit}>


//           <div className="page">
//             {/* <div className="title">Sobre usted</div> */}

//                           <div className="field">
//                               <div className="label">Email</div>
//                                   <input
//                                       className="inputRegister"
//                                       type="text"
//                                       placeholder="Email" 
//                                       name="email"
//                                       value={email}
//                                       onChange={handleInputRegister}

//                                   />
//                           </div>




//                           <div className="field">
//                               <div className="label">Nombre</div>
//                                   <input
//                                       className="inputRegister"
//                                       type="text"
//                                       placeholder="Nombre" 
//                                       name="nombre"
//                                       value={nombre}
//                                       onChange={handleInputRegister}

//                                   />
//                           </div>




//                           <div className="field">
//                               <div className="label">Apellido</div>
//                                   <input
//                                       className="inputRegister"
//                                       type="text"
//                                       placeholder="Apellido" 
//                                       name="apellido"
//                                       value={apellido}
//                                       onChange={handleInputRegister}

//                                   />
//                           </div>





//                           <div className="field">
//                               <div className="label">Fecha de nacimiento</div>
//                               <input 
//                                       className="inputRegister"
//                                       type="date" 
//                                       placeholder="Fecha de nacimiento" 
//                                       name="fecha_de_nacimiento"
//                                       value={fecha_de_nacimiento}
//                                       onChange={handleInputRegister}
//                               />
//                           </div>






//                           <div className="field">
//                               <div className="label">Genero</div>
//                               <select onChange={handleInputRegister} name="generoId">
//                                   <option value="">-</option>
//                                   {generos ? generos.map(genero => (
//                                   <option key={genero.id} value={genero.id}>{genero.genero}</option>
//                                   )) : ("")}
//                                   </select>
//                           </div>






//                           <div className="field">
//                               <div className="label">Pais</div>
//                               <select onChange={handleCity}>
//                                   <option value="">-</option>
                                  // {paises ? paises.map(item => (
                                  //   <option key={item.codigo_alfa} value={item.codigo_alfa} >{item.nombre_pais}</option>
                                  // )) : ("")}
//                               </select>
//                           </div>






//                           <div className="field">
//                               <div className="label">Ciudad</div>
//                               <select onChange={handleInputRegister} name="ciudadId">
//                                   <option value="">-</option>
                                  // {ciudades ? ciudades.map(item => (
                                  //   <option key={item.id} value={item.id}>{item.ciudad}</option>
                                  // )):("")}
//                               </select>
//                           </div>







//                           <div className="field">
//                               <div className="label">Metodo de cobro</div>
//                               <select onChange={handleInputRegister} name="metodo_de_cobro">
//                                   <option value="">-</option>
//                                   <option value="Mercado Pago">Mercado Pago</option>
//                                   <option value="CBU">CBU</option>
//                               </select>

                              // {
                              //   metodo_de_cobro !== "" ?
                              //     (metodo_de_cobro === "CBU" ? (
                              //       <>
                              //       <div className="field">
                              //       <input
                              //         className="inputRegister"
                              //         type="text"
                              //         placeholder="Banco"
                              //         name="banco"
                              //         onChange={handleInputRegister}
                              //       />
                              //       </div>
                              //       <div className="field">
                              //         <input
                              //           className="inputRegister"
                              //           type="text"
                              //           placeholder="Nº de cuenta"
                              //           name="numero_de_cuenta"
                              //           onChange={handleInputRegister}
                              //         />
                              //       </div>
                              //       </>

                              //     ) : (

                              //       metodo_de_cobro === "Mercado Pago" ?
                              //       <div className="field">
                              //         <input
                              //           className="inputRegister"
                              //           type="text"
                              //           placeholder="Ingrese su usuario"
                              //           name="numero_de_cuenta"
                              //           onChange={handleInputRegister}
                              //         />
                              //         </div>
                              //         : ("")
                              //     )
                              //     ) : ("")
                              // }
//                           </div>






//                           <div className="field">
//                               <div className="label">Contraseña</div>
//                                 <input
//                                       className="inputRegister"
//                                       type="password"
//                                       placeholder="contraseña" 
//                                       name="password"
//                                       value={password}
//                                       onChange={handleInputRegister}
//                                       />
//                           </div>






//                           <div className="field">
//                               <div className="label">Confirmar contraseña</div>
//                               <input
//                                   className="inputRegister" 
//                                   type="password"
//                                   placeholder="Confirmar contraseña" 
//                                   name="confirmar"
//                                   value={confirmar}
//                                   onChange={handleInputRegister}
//                                   />
//                           </div>




//                           <div className="field">
//                               <button>Registrarme</button>
//                           </div>


//             </div>  
//         </form>
//     <Link className="linklogin" to="/login" >Volver a iniciar sesion</Link>
// </div>
// </div>

