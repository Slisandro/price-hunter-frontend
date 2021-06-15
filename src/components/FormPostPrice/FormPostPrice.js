import React, { useState } from "react";
import './FormPostPrice.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

var geolocation = require('geolocation');

function FormPostPrice() {
    const [errors, setErrors] = useState({});

    const [state, setState] = useState({
        latitud: "",
        longitud: "",
        nombre_negocio: "", // Usuario
        direccion_negocio: "", // Usuario
        precio: "", // Usuario
        desafioId: "", // Usuario
        usuarioId: "",
        mtsTolera: "",
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })

        if (e.target.value === "") {
            setErrors({
                ...errors,
                [e.target.name]: true
            })
        } else {
            setErrors({
                ...errors,
                [e.target.name]: false
            })
        }
        console.log(errors)
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        geolocation.getCurrentPosition((err, position) => {
            if (err) throw err
            setState({
                ...state,
                latitud: position.coords.latitude,
                longitud: position.coords.longitude
            })
            // PREGUNTAR
            console.log(state) //POST
        })

    }

    return (
        <form className="FormPostPrice" onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label className="label">Nombre del negocio</Form.Label>
                <Form.Control
                    name="nombre_negocio"
                    onChange={(e) => handleChange(e)}
                    value={state.nombre_negocio}
                    type="text"
                    placeholder="Ingresé nombre del negocio"
                    className="control"
                />
                <Form.Text className={errors.nombre_negocio ? "errors" : "p"}>
                    Este campo no puede estar vacío
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label className="label">Dirección del negocio</Form.Label>
                <Form.Control
                    name="direccion_negocio"
                    onChange={(e) => handleChange(e)}
                    value={state.direccion_negocio}
                    type="text"
                    placeholder="Ingresé dirección del negocio"
                    className="control"
                />
                <Form.Text className={errors.direccion_negocio ? "errors" : "p"}>
                    Este campo no puede estar vacío
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label className="label">Precio</Form.Label>
                <Form.Control
                    name="precio"
                    onChange={(e) => handleChange(e)}
                    value={state.precio}
                    type="number"
                    placeholder="Ingresé precio cazado"
                    className="control"
                />
                <Form.Text className={errors.precio ? "errors" : "p"}>
                    Este campo no puede estar vacío y debe ser un número
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label className="label">Nombre del negocio</Form.Label>
                <Form.Control
                    name="desafioId"
                    onChange={(e) => handleChange(e)}
                    value={state.desafioId}
                    type="text"
                    placeholder="Ingresé desafioId"
                    className="control"
                />
                <Form.Text className={errors.desafioId ? "errors" : "p"}>
                    Este campo no puede estar vacío y debe ser un número
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </form>
    )
}

export default FormPostPrice;
