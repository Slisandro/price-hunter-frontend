import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { mostrarError} from '../Redux/actions';
import {Link} from "react-router-dom";
import "./Registro.css";
import aguila from "../../assets/aguila.png";

const Registro = () => {

  const alerta = useSelector((store) => store.alerta);
  const dispatch = useDispatch();
  
  const [registro, guardarRegistro] = useState({
    email: "",
    nombre:"",
    password:"",
    confirmar:""  
  })

  const {email, nombre, password, confirmar} = registro;
  




  const handleInputRegister = e => {
    guardarRegistro({
      ...registro,
      [e.target.name] : e.target.value
    })
  }




  const handleSubmit = e => {
    e.preventDefault();
    
    if( nombre.trim() === ''   || 
        email.trim() === ''    || 
        password.trim() === '' || 
        confirmar.trim() === '' ) {
                dispatch(mostrarError('Todos los campos son obligatorios'));
                return;
        }
    // Password minimo de 6 caracteres
    if(password.length < 6) {
      dispatch(mostrarError('El password debe ser de al menos 6 caracteres'));
      return;
    }

  // Los 2 passwords son iguales
    if(password !== confirmar) {
      dispatch(mostrarError('Los passwords no son iguales'));
      return;
    }
    
    // dispatch(  (registro))
    

  }
  




  return (
 
    <section className="register">
      <section className="register__container">
        <div className="registro__start">
            <img src={aguila} alt="" className="logo__register"/>
            <h2>Regístrate</h2>
            <p className="p">Y comenzá a cazar precios</p>
        </div>

        {/* {alerta ? : null } */}
          <form className="register__container--form" onSubmit={handleSubmit}>
            
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
            placeholder="Correo"
            name="email"
            value={email}
            onChange={handleInputRegister}
            />

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

