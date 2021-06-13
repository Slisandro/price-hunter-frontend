import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MisDesafios from '../desafios/MisDesafios';
import NavBarMain from '../navBarMain/NavBarMain';
import Table from '../Table.js'
import "./Main.css";

const Main = ({ state, setState }) => {
    const productos = useSelector(store => store.productos)
    const subcategorias = useSelector(store => store.subcategorias)
    const [producto, setProducto] = useState("");

    return (
        <main className="main">
            <div className="main__container">
                {
                    state === "Desafios" ?
                        null :
                        <div className="main__title">
                            <NavBarMain producto={producto} setProducto={setProducto} setState={setState} />
                        </div>
                }
                <div className="containerTableSearch">
                    {
                        state === "Search" ? <Table productos={productos} name={producto} /> :
                            state === "SubCategorias" ? <Table productos={subcategorias} name={producto}/> :
                                state === "Desafios" ? <MisDesafios /> :
                                    state === "Configuracion" ? <div>Configuración</div> : null
                    }
                </div>
            </div>
        </main>
    );
}



export default Main;