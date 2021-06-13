import React from "react";
import ReactTable from "react-table-6";
import './Table.css'

function Table({ name, productos }) {

    return (
        <ReactTable className="containerProductSearch"
            data={productos}
            columns={
                [{
                    Header: `Resultado de la búsqueda "${name}"`,
                    columns: [
                        {
                            Header: "Nombre",
                            accessor: "preoducto"
                        },
                        {
                            Header: "Contenido neto",
                            accessor: "contenido_neto"
                        },
                        {
                            Header: "Unidad de Medida",
                            accessor: "unidad_medida"
                        },
                        {
                            Header: "Precio",
                            accessor: "precio"
                        },
                        {
                            Header: "Desafio",
                            accessor: "desafio"
                        }
                    ]
                }]
            }
            defaultSorted={
                [{
                    id: "nombre",
                    desc: true
                }]
            }
            defaultPageSize={5}
            className="-striped -highlight"
        />
    );
}

export default Table;