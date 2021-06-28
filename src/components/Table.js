import React, { useState } from "react";
import ReactTable from "react-table-6";
import './Table.css';
import MapUser from './Cazador/MapUser/MapUser'

function Table({ productos, ubicacion }) {
    const [state, setState] = useState(false);
    const [coord, setCoord] = useState([])

    const handleClick = (arr) => {
        setState(!state);
        setCoord(arr)
    }

    const handleClose = () => {
        setState(!state)
    }

    return (
        <>
            <ReactTable className="containerProductSearch"
                data={productos}
                columns={
                    [{
                        Header: `Presione sobre una columna para ordenar descendentemente`,
                        columns: [
                            {
                                Header: "Nombre",
                                accessor: "producto",
                                Cell: (row) => {
                                    return `${row.original.producto} de ${row.original.contenido_neto} ${row.original.unidad_medida}`
                                }
                            },
                            {
                                Header: "Precio",
                                accessor: "precio"
                            },
                            {
                                Header: "Desafio",
                                accessor: "desafio"
                            },
                            {
                                Header: "Fecha (YYYY/MM/DD)",
                                accessor: "fecha"
                            },
                            {
                                Header: "Distancia",
                                accessor: "distanciaPunto",
                                Cell: (row) => {
                                    return Math.floor(row.original.distanciaPunto) + " m"
                                }
                            },
                            {
                                Header: "Desafio publicado por",
                                accessor: "cliente"
                            },
                            {
                                Header: "Ver mapa",
                                accessor: "geoLatLong",
                                Cell: (row) => {
                                    return (
                                        <button
                                            onClick={() => handleClick(row.original.geoLatLong)}
                                        >
                                            Abrir
                                        </button>
                                    )
                                }
                            }
                        ]
                    }]
                }
                defaultSorted={
                    [{
                        id: "distanciaPunto",
                        desc: false
                    }]
                }
                defaultPageSize={5}
                className="-striped -highlight"
            />
            {
                !state ? null :
                    (
                        <div className="ContainerMapaTable">
                            <button onClick={() => handleClose()}>x</button>
                            <MapUser ubicacion={ubicacion} precio={coord}/>
                        </div>
                    )
            }
        </>
    );
}

export default Table;