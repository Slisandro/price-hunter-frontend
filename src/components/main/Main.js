import React from 'react';
import "./Main.css";
import logo from "../../assets/mira.png";

const Main = () => {
    return ( 
        <main className="main">
            <div className="main__container">
                <div className="main__title">
                    <img src={logo} alt=""/>
                    <div className="main_welcome">
                        <h1>Bienvenido,  <span className="hunter">cazador</span></h1>
                        <p>Administra aquí tus precios</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Main;