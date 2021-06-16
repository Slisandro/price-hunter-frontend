import React, { useState } from "react";
import './FormPostPrice.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

var geolocation = require('geolocation');

function FormPostPrice({ setModal, modal, desafio }) {
    const [errors, setErrors] = useState({
        nombre_negocio: true,
        direccion_negocio: true,
        precio: true,
    });

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


    const handleSubmit = async (e) => {
        e.preventDefault()

        await geolocation.getCurrentPosition((err, position) => {
            if (err) throw err
            setState({
                ...state,
                latitud: position.coords.latitude,
                longitud: position.coords.longitude,
                desafioId: desafio
            })
            // console.log(state) //POST
            if (Object.values(errors).filter(x => x === true).length === 0) {
                console.log("sin error")
                // axios.post(`ruta`, state)
                // .then(resp => resp.json())
                // .then(json => console.log(json.msj))  // Acá me trae el mensaje si se posteo correctamente o no 
            // Y deberia mostrarlo en un modal con el msj y setear el state
            } else {
                console.log("con error")
            }
        })
    }

    return (
        <form className="FormPostPrice" onSubmit={handleSubmit}>
            <button className="closeModal" onClick={e => setModal(!modal)}>X</button>
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
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </form>
    )
}

export default FormPostPrice;
