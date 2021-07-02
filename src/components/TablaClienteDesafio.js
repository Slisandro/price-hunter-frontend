import React, { useState } from "react";
import ReactTable from "react-table-6";
import './Table.css';
// import MapUser from './Cazador/MapUser/MapUser'
function TablaClientesDesafio({desafios, setIdSelect}) {
    // console.log('aqui toy', precios)
    // const [idSelect, setIdSelect] = useState();
    
    function handleId(valor){
        if(valor){
            setIdSelect(valor)
            // console.log(idSelect)
        }
    }
    
    return (
        <>
            <ReactTable className="containerProductSearch"
                data={desafios}
                columns={
                    [{
                        Header: `Presione sobre una columna para ordenar ascendente o descendentemente`,
                        columns: [
                            {
                                Header: "id Desafío",
                                accessor: "id",
                                Cell: (row) => {
                                    return (
                                        <button
                                            onClick={() => handleId(row.original.id)}
                                        >
                                            {row.original.id + ' ver'}
                                        </button>
                                    )
                                }
                            },
                            {
                                Header: "Nombre Desafío",
                                accessor: "nombre_desafio"
                            },
                            {
                                Header: "Descripción",
                                accessor: "descripcion_desafio",
                                
                            },
                            {
                                Header: "Fecha Inicial",
                                accessor: "fecha_inicial"
                            },
                            {
                                Header: "Fecha Final",
                                accessor: "fecha_final"
                            },
                            
                        ]
                    }]
                }
                defaultSorted={
                    [{
                        id: "id",
                        desc: false
                    }]
                }
                defaultPageSize={5}
                className="-striped -highlight"
            />
        </>
    );
}

export default TablaClientesDesafio;