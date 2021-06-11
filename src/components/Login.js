import { Button } from 'react-bootstrap';
import React from 'react';
import './Login.css'
import Facebook from '../assets/logo-facebook.svg';
import Twitter from '../assets/logo-twitter.svg';
import Google from '../assets/logo-google.svg'
import Hunter from '../assets/img/slider/slider4.png'
import Usuario from '../assets/img/slider/usuario.png'
import Password from '../assets/img/slider/password.png'



function Login(){
    return(
        <div className="container">

        <div className="container-form">
            <h2 className="title">Creá tu cuenta</h2>
    
    <form className="form">
           
            <button className="facebook">
                 <img className="img-facebook" src={Facebook}/>  
                Ingresa con facebook
                </button>
                
                 <br></br>

            <button className="twitter"><img className="img-twitter" src={Twitter}/>Ingresa con twitter</button> <br></br>
            <button className="google"><img className="img-google" src={Google}/>Ingresa con google</button> <br></br>

            <div className="o">ó</div> <br></br>

            <div className="form-group"> 
            
            <input type="email" className="form-control-usuario" placeholder="Usuario o email" />
            <img className="img-usuario" src={Usuario}/>
            
            </div>

            <div className="form-group-password">
                
                <input type="password" className="form-control-contraseña" placeholder="Contraseña" />
                <img className="img-contraseña" src={Password}/>
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox"></div>  
                
            </div>

            <button type="submit" className="btn-submit">Submit</button>
            <p className="forgot-password">
                 <a className="simple" href="#">recuperar contraseña</a>
            </p>
            <p className="registrarse"><a className="simple" href="#">registrarse</a></p>
        </form>
            </div>
      

            <div className="container-2">
            <h1 className="price-hunter">PRICE</h1> <br></br>
            <h1 className="price-hunter2">HUNTER</h1>
              
            <img className="img-hunter" src={Hunter}/>
            </div>

            </div>


            <div>
                
            </div>

            </div>

    )
}
export default Login;

