import React, { useState, useEffect } from "react";
import './FormPostPrice.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import swal from 'sweetalert';
import { URL } from '../../Redux/actions';

var geolocation = require('geolocation');


function FormPostPrice({ setModal, modal, referencia, ubicacion }) {
    const [errors, setErrors] = useState({
        // nombre_negocio: true,
        // direccion_negocio: true,
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
        precio: "", // Usuario
        desafioId: "", // Usuario
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })

        if (e.target.name === "precio") {
            setState({
                ...state,
                precio: parseFloat(e.target.value)
            })

            if (e.target.value <= 0) {
                setErrors({
                    precio: true
                })
            } else {
                setErrors({
                    precio: false
                })
            }
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).filter(x => x === true).length === 0) {
            setModal(!modal)
            const token = localStorage.getItem("token");
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ubicacion.latitud},${ubicacion.longitud}&key=AIzaSyAPEpC-G7gntZsFjZd4KvHx3KWqcT9Yy3c`)
                .then(resp => {
                    console.log(resp)
                    const body = {
                        ...state,
                        arrayApi: searchCity(resp.data)
                    }
                    console.log(body)
                    axios.post(`${URL}precios`, body, { headers: { "Authorization": `Bearer ${token}` } })
                        .then(resp => {
                            console.log(resp)
                            if (!resp.data.aceptado) {
                                swal(resp.data.msj, " ", "error");
                            } else {
                                swal(`${resp.data.msj}. . . . . . ${resp.data.rptaPuntos}`, " ", "success")
                            }
                            setState({
                                latitud: "",
                                longitud: "",
                                nombre_negocio: "", // Usuario
                                direccion_negocio: "", // Usuario
                                precio: 0, // Usuario
                                desafioId: "", // Usuario
                            })
                        })
                })

        } else {
            swal("Debes ingresar el precio. Captura no valida")
        }
    }

    return (
        <form className="FormPostPrice" onSubmit={handleSubmit}>
            <h2 className="h2">Publicar precio</h2>
            <button className="closeModal" onClick={e => setModal(!modal)}>X</button>
            <Form.Group>
                <Form.Label className="label">Nombre del negocio (opcional)</Form.Label>
                <Form.Control
                    name="nombre_negocio"
                    onChange={(e) => handleChange(e)}
                    value={state.nombre_negocio}
                    type="text"
                    placeholder="Ingresé nombre del negocio"
                    className="control"
                />
                {/* <Form.Text className={errors.nombre_negocio ? "errors" : "inputSinError"}>
                    Este campo no puede estar vacío
                </Form.Text> */}
            </Form.Group>
            <Form.Group>
                <Form.Label className="label">Dirección del negocio (opcional)</Form.Label>
                <Form.Control
                    name="direccion_negocio"
                    onChange={(e) => handleChange(e)}
                    value={state.direccion_negocio}
                    type="text"
                    placeholder="Ingresé dirección del negocio"
                    className="control"
                />
                {/* <Form.Text className={errors.direccion_negocio ? "errors" : "inputSinError"}>
                    Este campo no puede estar vacío
                </Form.Text> */}
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
                <Form.Text className={errors.precio ? "errors" : "inputSinError"}>
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

function searchCity(obj) {
    let arr = []
    obj.results[0].address_components.map(el => {
        if (el.types.includes("country") && el.types.includes("political")) {
            return arr[0] = el
        } else if (el.types.includes("administrative_area_level_1") && el.types.includes("political")) {
            return arr[1] = el
        } else if (el.types.includes("administrative_area_level_2") && el.types.includes("political")) {
            return arr[2] = el
        } else if (el.types.includes("locality") && el.types.includes("political")) {
            return arr[3] = el
        }
    })
    return arr;
}