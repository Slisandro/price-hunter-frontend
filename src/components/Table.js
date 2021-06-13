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
                            Header: "Desafio",
                            accessor: "desafio"
                        },
                        {
                            Header: "Precio",
                            accessor: "precio"
                        }
                    ]
                }]
            }
            defaultSorted={
                [{
                    id: "preoducto",
                    desc: true
                }]
            }
            defaultPageSize={5}
            className="-striped -highlight"
        />
    );
}

export default Table;