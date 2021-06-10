import { Button } from 'react-bootstrap';
import React from 'react';
import './Login.css'
import Facebook from '../assets/logo-facebook.svg'


function Login(){
    return(
        <div className="container">
       <h2 className="title">crea tu cuenta</h2>
    
        <form className="form">
               
                <button className="facebook">
                     <img className="img-facebook" src={Facebook}/>  
                    ingresa con facebook
                    </button>
                    
                     <br></br>

                <button className="twitter">ingresa con twitter</button> <br></br>
                <button className="google">ingresa con google</button> <br></br>

                <div className="o">ó</div> <br></br>

                <div className="form-group">
                    
                    <input type="email" className="form-control-usuario" placeholder="usuario o email" />
                </div>

                <div className="form-group-password">
                    
                    <input type="password" className="form-control-contraseña" placeholder="contraseña" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox"></div>  
                    
                </div>

                <button type="submit" className="btn-submit">Submit</button>
                <p className="forgot-password">
                     <a href="#">recuperar contraseña?</a>
                </p>
                <p className="registrarse"><a href="#">registrarse</a></p>
            </form>

            <div>
                
            </div>

            </div>

    )
}
export default Login;

