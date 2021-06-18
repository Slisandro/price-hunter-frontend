import React, { useState, useEffect } from "react";
import './FormPostPrice.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

var geolocation = require('geolocation');

geolocation.getCurrentPosition((err, position) => {
    return position.coords.longitude
})


function FormPostPrice({ setModal, modal, referencia }) {
    const [errors, setErrors] = useState({
        nombre_negocio: true,
        direccion_negocio: true,
        precio: true,
    });

    useEffect(() => {
        geolocation.getCurrentPosition((err, position) => {
            setState({
                ...state,
                longitud: position.coords.longitude + "",
                latitud: position.coords.latitude + "",
                desafioId: referencia.idDesafio,
            })
        })
    }, [])

    const [state, setState] = useState({
        latitud: "",
        longitud: "",
        nombre_negocio: "", // Usuario
        direccion_negocio: "", // Usuario
        precio: null, // Usuario
        desafioId: "", // Usuario
        usuarioId: 1,
        mtsTolera: 20,
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

        if (e.target.name === "precio") {
            setState({
                ...state,
                precio: parseInt(e.target.value)
            })
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(state)
        if (Object.values(errors).filter(x => x === true).length === 0) {
            axios.post("http://localhost:3001/precios", state)
                .then(resp => {
                    console.log(resp.data)
                    alert(resp.data.msj)
                    setModal(!modal)
                    setState({
                        latitud: "",
                        longitud: "",
                        nombre_negocio: "", // Usuario
                        direccion_negocio: "", // Usuario
                        precio: 0, // Usuario
                        desafioId: "", // Usuario
                        usuarioId: 1,
                        mtsTolera: 20,
                    })
                })
        }
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
