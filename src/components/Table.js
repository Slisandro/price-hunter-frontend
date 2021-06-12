import React from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

function Table() {

    const data = [{
        firstName: "hola",
        lastName: "chau",
        age: 10
    }];

    return (
        <div>
            <ReactTable
                data={data}
                columns={[
                    {
                        Header: "Name",
                        columns: [
                            {
                                Header: "First Name",
                                accessor: "firstName"
                            },
                            {
                                Header: "Last Name",
                                accessor: "lastName"
                            }
                        ]
                    },
                    {
                        Header: "Info",
                        columns: [
                            {
                                Header: "Age",
                                accessor: "age"
                            }
                        ]
                    }
                ]}
                defaultSorted={[
                    {
                        id: "age",
                        desc: true
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
        </div>
    );
}

export default Table;