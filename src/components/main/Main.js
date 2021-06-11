import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getAllProductsByName } from "../Redux/actions";
import "./Main.css";
// import logo from "../../assets/mira.png";

// import Cards from '../Cards';


const Main = () => {
    const productos = useSelector(store => store.arrayPrueba)
    // console.log("STORE",productos)
    // useSelector()
    // useDispatch()

    const [producto, setProducto] = useState("");
    
        
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("producto", producto)
    }
    
    const handleChange = (e) => {
        setProducto(e.target.value) 
    }


    
    return ( 
        <main className="main">
            <div className="main__container">
                
                
                <div className="main__title">
                        <div class="discount-chart">
                            <div class="circle">
                                <div class="pie">
                                    <svg>
                                    <circle cx="60" cy="60" r="50"></circle>
                                    </svg>
                                </div>
                                <div class="counter"> $ </div>
                            </div>
                        </div>
                        
                        <div className="main_welcome">
                            <h1>Bienvenido, <span className="hunter"> cazador</span></h1>
                            <p>Administra aquí tus precios</p>
                        </div>
    
    
                        <div className="box">    
                                <form onSubmit={e => handleSubmit(e)}>
                                    <input
                                        type="text" 
                                        placeholder="Buscar productos por nombre"
                                        onChange={e => handleChange(e)}
                                        value={producto}
                                        name={producto}
                                    /> 
                                    <input type="submit" className="btn" value="Buscar"/> 
                                </form>

                                <div className="categorias">
                                    <ul className="menu-main">

                                        <li><a href="!#">Tabla 1</a>
                                            <div className="menu-sub">
                                                <h3>Frescos</h3>
                                                <ul>
                                                    <li className="sub"><a href="!#">Tabla 2</a></li>
                                                    <li className="sub"><a href="!#">Tabla 3</a></li>
                                                    <li className="sub"><a href="!#">Tabla 4</a></li>
                                                    <li className="sub"><a href="!#">Tabla 5</a></li>
                                                    <li className="sub"><a href="!#">Tabla 6</a></li>
                                                </ul>

                                                <h3>Carnes</h3>
                                                <ul>
                                                    <li className="sub"><a href="!#">Tabla 2</a></li>
                                                    <li className="sub"><a href="!#">Tabla 3</a></li>
                                                    <li className="sub"><a href="!#">Tabla 4</a></li>
                                                    <li className="sub"><a href="!#">Tabla 5</a></li>
                                                    <li className="sub"><a href="!#">Tabla 6</a></li>
                                                </ul>
                                            </div>
                                        
                                        
                                        
                                        </li>




                                        <li><a href="!#">Tabla 2</a></li>
                                        <li><a href="!#">Tabla 3</a></li>
                                        <li><a href="!#">Tabla 4</a></li>
                                        <li><a href="!#">Tabla 5</a></li>
        
                                    </ul>
                                </div>
                            
                        </div>

                    

                    

                        {/* <Cards productos={productos}/> */}

                </div>
            </div>
        </main>
    );
}



export default Main;