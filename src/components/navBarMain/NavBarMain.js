import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Categorias from '../categorias/Categorias';
import { getCategorias, getProductsByName } from "../Redux/actions";

function NavBarMain({producto, setProducto, setState}) {
    const categorias = useSelector(store => store.categorias);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategorias())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getProductsByName(producto));
        setState("Search");
    }

    const handleChange = (e) => {
        setProducto(e.target.value)
    }

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
                    <h1>Bienvenido, <span className="hunter"> cazador</span></h1>
                    <p>Administra aquí tus precios</p>
                </div>
            </div>
            {/* Categories */}
            <Categorias categorias={categorias} setProducto={setProducto} />
            {/* SearchBar */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Buscar productos por nombre"
                    onChange={handleChange}
                    value={producto}
                    name={producto}
                />
                <input type="submit" className="btn" value="Buscar" />
            </form>
        </>
    )
}

export default NavBarMain;