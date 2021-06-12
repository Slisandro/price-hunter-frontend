import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getCategorias,getProductsByName } from "../Redux/actions";
// import {Link} from "react-router-dom";
import Categorias from '../categorias/Categorias';
import "./Main.css";
// import logo from "../../assets/mira.png";




const Main = () => {
    const categorias = useSelector(store => store.categorias)
    const productos = useSelector(store => store.productos)
    // const loading = useSelector(store => store.loading)
    // useSelector()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategorias())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [producto, setProducto] = useState("");
    
        
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getProductsByName(producto))
    }
    
    const handleChange = (e) => {
        setProducto(e.target.value) 
    }
    
    return ( 
        <main className="main">
            <div className="main__container">
                
                
                <div className="main__title">
                        <div id="container-welcome">
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
                        </div>
    
    
                            <Categorias categorias={categorias}/>
                                
                                <form onSubmit={ handleSubmit}>
                                    <input
                                        type="text" 
                                        placeholder="Buscar productos por nombre"
                                        onChange={handleChange}
                                        value={producto}
                                        name={producto}
                                    /> 
                                    <input type="submit" className="btn" value="Buscar"/> 
                                </form>
                                {/* {
                                    productos.map(producto => (
                                        <div>
                                            <p>{producto.precio}</p>
                                            <p>{producto.preoducto}</p>
                                        </div>
                                    ))
                                } */}
                                
                        
                </div>
            </div>
        </main>
    );
}



export default Main;