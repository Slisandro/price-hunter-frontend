import React, { useState, useEffect } from "react";
import './FormPostPrice.css'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import swal from 'sweetalert';
import { URL } from '../../Redux/actions';
import {
    Card, CardHeader, CardBody, CardTitle, CardText, Button, Table,
    // Form, 
    Modal, ModalBody, Row, Input, FormFeedback, FormText
} from 'reactstrap';

var geolocation = require('geolocation');


function FormPostPrice({ setModal, modal, referencia, ubicacion }) {
    const [errors, setErrors] = useState({
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
                    axios.post(`${URL}precios`, body, { headers: { "Authorization": `Bearer ${token}` } })
                        .then(resp => {
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
        <Modal isOpen={modal}>
            <ModalBody style={{ padding: 0 }}>
                <Card className="card-chart" style={{ margin: "auto" }}>
                    <CardHeader style={{ margin: "auto" }}>
                        <span id="title">Publicar precio</span>
                    </CardHeader>
                    <CardBody style={{ margin: "auto", marginBottom: "5%" }}>
                        <Form onSubmit={e => handleSubmit(e)}>
                            <Row style={{ margin: "5% 0" }}>
                                <h6 className="title" style={{ fontSize: "1em" }}>Nombre del negocio (opcional)</h6>
                                {/* <FormText className="label">Nombre del negocio (opcional)</FormText> */}
                                <Input
                                    bsSize="lg"
                                    noValid
                                    name="nombre_negocio"
                                    onChange={(e) => handleChange(e)}
                                    value={state.nombre_negocio}
                                    type="text"
                                    placeholder="Ingresé nombre del negocio"
                                    style={{ paddingLeft: "2%" }}
                                // className="control"
                                />
                            </Row>
                            <Row style={{ margin: "5% 0" }}>
                                <h6 className="title" style={{ fontSize: "1em" }}>Dirección del negocio (opcional)</h6>
                                {/* <FormText className="label">Dirección del negocio (opcional)</FormText> */}
                                <Input
                                    bsSize="lg"
                                    noValid
                                    name="direccion_negocio"
                                    onChange={(e) => handleChange(e)}
                                    value={state.direccion_negocio}
                                    type="text"
                                    placeholder="Ingresé dirección del negocio"
                                    style={{ paddingLeft: "2%" }}
                                // className="control"
                                />
                            </Row>
                            <Row style={{ margin: "5% 0" }}>
                                <h6 className="title" style={{ fontSize: "1em" }}>Precio</h6>
                                {/* <FormText className="label">Precio</FormText> */}
                                <Input
                                    bsSize="lg"
                                    noValid
                                    type="number"
                                    name="precio"
                                    onChange={(e) => handleChange(e)}
                                    value={state.precio}
                                    placeholder="Ingresé precio cazado"
                                    style={{ paddingLeft: "2%" }}
                                />
                                <FormText style={{ fontSize: "1em", margin: "auto" }}>
                                    Este campo no puede estar vacío y debe ser un número
                                </FormText>
                            </Row>
                            <Row
                                style={{
                                    margin: "auto",
                                    display: "flex",
                                    justifyContent: "space-around"
                                }}
                            >
                                <Button
                                    className="btn-fill"
                                    color="primary"
                                    type="submit"
                                    // block
                                >
                                    Enviar
                                </Button>
                                <Button
                                    className="btn-fill"
                                    color="primary"
                                    type="submit"
                                    // block
                                    onClick={() => setModal(!modal)}>
                                    Cancelar
                                </Button>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </ModalBody>
        </Modal >
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