import React from "react";
import ReactTable from "react-table-6";
import './Table.css'

function Table({ name, productos }) {

    return (
        <ReactTable className="containerProductSearch"
            data={productos}
            columns={
                [{
                    Header: `Presione sobre una columna para ordenar descendentemente`,
                    columns: [
                        {
                            Header: "Nombre",
                            accessor: "preoducto",
                            Cell: (row) => {
                                return `${row.original.preoducto} de ${row.original.contenido_neto} ${row.original.unidad_medida}`
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
                                return row.original.distanciaPunto.toFixed(1) + " m"
                            }
                        },
                        {
                            Header: "Desafio publicado por",
                            accessor: "cliente"
                        }
                    ]
                }]
            }
            defaultSorted={
                [{
                    id: "distanciaPunto",
                    desc: true
                }]
            }
            defaultPageSize={5}
            className="-striped -highlight"
        />
    );
}

export default Table;