import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Categorias from '../categorias/Categorias';
import { getCategorias, getProductsByName } from "../Redux/actions";

function NavBarMain({ producto, setProducto, setState, ubicacion, setUbicacion }) {
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
        setUbicacion({
            ...ubicacion,
            dis: 0
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        setUbicacion({
            ...ubicacion,
            dis: e.target.value
        })
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
                    <h1>Bienvenido, <span className="hunter" id="nameUser">{nombre}</span></h1>
                    <p>Administra aquí tus precios</p>
                </div>
            </div>





            {/* Categories */}
            <Categorias categorias={categorias} setState={setState} />
            {/* SearchBar */}



            <form className="formSearchUser" onSubmit={handleSubmit}>
                <div className="containerInputSearch">
                    <input
                    id="inputSearchBarText"
                        type="text"
                        className="input__text"
                        placeholder="Buscar precios cercanos"
                        onChange={handleChange}
                        value={producto}
                        name={producto}
                    />
                    <input type="submit" id="inputSearchBarSubmit" className="btn__main" value="Buscar" />
                </div>
                <select onClick={e => handleClick(e)} id="selectSearchBarUser">
                    <option default>Seleccione el radio para su busqueda</option>
                    <option value={1000}>1 km</option>
                    <option value={50000}>50 km</option>
                    <option value={100000}>100 km</option>
                </select>
            </form>




        </>
    )
}


export default NavBarMain;