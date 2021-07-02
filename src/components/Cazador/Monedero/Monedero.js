import React, { useState, useEffect } from 'react';
import './Monedero.css';
import axios from 'axios';
import swal from 'sweetalert';
import { URL } from '../../Redux/actions';
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, Table, Form, Modal, ModalBody, Row, Input, FormFeedback, FormText } from 'reactstrap';

let totalPoints;

function actualPoints(arr) {
    const suma = arr.slice().filter(x => x.tipo_transaccion.id === 1).reduce(((acc, cur) => acc + cur.puntos), 0);
    const resta = arr.slice().filter(x => x.tipo_transaccion.id === 2).reduce(((acc, cur) => acc + cur.puntos), 0);
    totalPoints = suma - resta;
    return suma - resta
}

function Monedero() {
    const [state, setState] = useState(false);
    const [movimiento, setMovimientos] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [puntos, setPuntos] = useState(0);
    const [error, setError] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${URL}transacciones/consulta/`, { headers: { "Authorization": `Bearer ${token}` } })
            .then(json => {
                OrderByDate(json.data)
                setMovimientos(OrderByDate(json.data))
                setLoading(false);
            })
    }, [state]);

    const handleChange = (e) => {
        setPuntos(parseInt(e.target.value));
        if (e.target.value > totalPoints) {
            setError({
                bol: true,
                msg: "No tienes suficientes hunterCoins"
            })
        } if (e.target.value <= 0) {
            setError({
                bol: true,
                msg: "Debe ingresar un número mayor a 0"
            })
        } else {
            setError({
                bol: false
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token");
        const body = {
            puntosRetiro: puntos
        }
        if (puntos > totalPoints) {
            setError({
                bol: true,
                msg: "No tienes suficientes hunterCoins"
            })
            return setPuntos(0)
        } if (puntos <= 0) {
            setError({
                bol: true,
                msg: "Debe ingresar un número mayor a 0"
            })
        } else {
            if (!error.bol) {
                axios.post(
                    `${URL}transacciones/retirapuntos`,
                    body,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                )
                    .then(resp => {
                        swal(resp.data.rptaPuntos, " ", "success");
                        setModal(false)
                        setPuntos(0);
                        setState(!state)
                    })
            }
        }
    }

    return (
        loading ?
            <div className="containerMessageBack">Cargando movimientos...</div>
            :
            <>
                <Card className="miMonedero">
                    <CardHeader className="misPuntos">
                        <h2>Mis puntos</h2>
                        <div className="actual">
                            <p className="pointsActual">{actualPoints(movimiento)}</p>
                            <p className="puntos">puntos</p>
                        </div>
                    </CardHeader>
                    <CardBody className="movimientos">
                        <h2 className="titleMovimientos">Mis movimientos</h2>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Descripción</th>
                                    <th>Cantidad de puntos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    movimiento.map(transaccion => {
                                        return (
                                            <tr key={transaccion.id} className="transaccion">
                                                <th className="title">{transaccion.observacion}</th>
                                                {
                                                    transaccion.tipo_transaccion.id === 2 ?
                                                        <th className="puntos menos">- {transaccion.puntos}</th> :
                                                        <th className="puntos mas">+ {transaccion.puntos}</th>
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        <Button
                            variant="primary"
                            type="submit"
                            // block
                            style={{
                                width: "100% !important",
                                margin: "auto"
                            }}
                            onClick={() => setModal(!modal)}
                        >
                            Canjear puntos
                        </Button>
                    </CardBody>
                </Card>
                {
                    !modal ? null :
                        <Modal isOpen={modal}>
                            <ModalBody style={{ padding: 0 }}>
                                <Card className="card-chart" style={{ margin: "auto" }}>
                                    <CardHeader style={{ margin: "auto", marginBottom: "5%" }}>
                                        <span id="title">Retirar Puntos</span>
                                    </CardHeader>
                                    <CardBody style={{ margin: "auto", marginBottom: "5%" }}>
                                        <Form onSubmit={e => handleSubmit(e)}>
                                            <Row>
                                                <Input
                                                    bsSize="lg"
                                                    noValid
                                                    type="number"
                                                    value={puntos}
                                                    autoComplete="off"
                                                    style={{ paddingLeft: "5%" }}
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                <FormText style={{ fontSize: "1.2em", margin: "auto" }}>
                                                    {error.msg}
                                                </FormText>
                                            </Row>
                                            <Row>
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    block
                                                    style={{
                                                        width: "100% !important"
                                                    }}
                                                >
                                                    Retirar
                                                </Button>
                                                <Button
                                                    // className="btn-fill"
                                                    // color="primary"
                                                    variant="primary"
                                                    type="submit"
                                                    // style={{
                                                    //     width: "100% !important"
                                                    // }}
                                                    block
                                                    onClick={() => {
                                                        setModal(!modal)
                                                        setPuntos(0)
                                                    }}>
                                                    Cancelar
                                                </Button>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </ModalBody>
                        </Modal>
                }
            </>
    )
}

export default Monedero;


function OrderByDate(arr) {
    let array = [];
    arr.map(el => {
        const date = new Date(el.createdAt);
        const year = date.getFullYear() + ""
        const mes = "0" + date.getMonth() + "";
        const dia = date.getDate();
        const hora = date.getHours() + "";
        const minutos = date.getMinutes() + "";
        const segundos = date.getSeconds() + "";
        const milisegundos = date.getMilliseconds();

        array.push({
            ...el,
            "order": year + mes + dia + hora + minutos + segundos + milisegundos
        })
    })

    array.sort((a, b) => a.order < b.order ? 1 : -1)
    return array;
}