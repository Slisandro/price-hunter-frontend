import { Button } from 'react-bootstrap';
import React from 'react';
import './Login.css'


function Login(){
    return(
        <form className="form">
                <h3 className="title">creá tu cuenta</h3>
                <button className="facebook">ingresa con facebook</button> <br></br>
                <button className="twitter">ingresa con twitter</button> <br></br>
                <button className="google">ingresa con google</button> <br></br>

                <div className="o">ó</div> <br></br>

                <div className="form-group">
                    
                    <input type="email" className="form-control" placeholder="usuario o email" />
                </div>

                <div className="form-group-password">
                    
                    <input type="password" className="form-control" placeholder="contraseña" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox"></div>  
                    
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    olvidaste tu  <a href="#">contraseña?</a>
                </p>
            </form>

    )
}
export default Login;

