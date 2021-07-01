// import React, { useState } from "react";
import ReactTable from "react-table-6";
import './Table.css';
// import MapUser from './Cazador/MapUser/MapUser'

function TablaClientes({precios}) {
    // console.log('aqui toy', precios)

    return (
        <>
            <ReactTable className="containerProductSearch"
                data={precios}
                columns={
                    [{
                        Header: `Presione sobre una columna para ordenar ascendente o descendentemente`,
                        columns: [
                            {
                                Header: "Fecha AAAAMMMDD",
                                accessor: "fecha",
                            },
                            {
                                Header: "Ciudad",
                                accessor: "ciudad"
                            },
                            {
                                Header: "Precio",
                                accessor: "precio"
                            },
                            {
                                Header: "Latitud",
                                accessor: "latitud"
                            },
                            {
                                Header: "Longitud",
                                accessor: "longitud",
                                
                            },
                            {
                                Header: "Nombre Negocio",
                                accessor: "nombre_negocio"
                            },
                            {
                                Header: "Dirección Negocio",
                                accessor: "direccion_negocio"
                            },
                            
                        ]
                    }]
                }
                defaultSorted={
                    [{
                        id: "fecha",
                        desc: false
                    }]
                }
                defaultPageSize={5}
                className="-striped -highlight"
            />
        </>
    );
}

export default TablaClientes;