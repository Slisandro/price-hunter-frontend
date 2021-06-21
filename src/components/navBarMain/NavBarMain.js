import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Categorias from '../categorias/Categorias';
import { getCategorias, getProductsByName } from "../Redux/actions";

function NavBarMain({ producto, setProducto, setState, ubicacion }) {
    const categorias = useSelector(store => store.categorias);
    const dispatch = useDispatch();
    const nombre = localStorage.getItem("nombre");

    useEffect(() => {
        dispatch(getCategorias())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getProductsByName(producto, ubicacion));
        setState("Search");
        setProducto("")
    }

    const handleChange = (e) => {
        setProducto(e.target.value)
    }
    console.log(categorias)
    return (
        <>

            {/* Animation */}
            <div id="container-welcome">
                <div className="discount-chart">
                    <div className="circle">
                        <div className="pie">
                            <svg>
                                <circle cx="60" cy="60" r="50"></circle>
                            </svg>
                        </div>
                        <div className="counter"> $ </div>
                    </div>
                </div>

                <div className="main_welcome">
                    <h1>Bienvenido, <span className="hunter" id="nameUser">{nombre}</span></h1>
                    <p>Administra aquí tus precios</p>
                </div>
            </div>





            {/* Categories */}
            <Categorias categorias={categorias} setState={setState} />
            {/* SearchBar */}



            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input__text"
                    placeholder="Buscar productos por nombre"
                    onChange={handleChange}
                    value={producto}
                    name={producto}
                />
                <input type="submit" className="btn__main" value="Buscar" />
            </form>




        </>
    )
}


export default NavBarMain;