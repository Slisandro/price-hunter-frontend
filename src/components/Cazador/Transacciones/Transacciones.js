import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transacciones.css';
import { Card, Col, Row, CardTitle } from 'reactstrap';
import Ingreso from '../../../assets/ingreso_transacciones.png';
import Retiro from '../../../assets/retiro_transacciones.png';
import { URL } from '../../Redux/actions';

export default function Transacciones() {
    const [movimiento, setMovimiento] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${URL}transacciones/consulta/`, { headers: { "Authorization": `Bearer ${token}` } })
            .then(json => {
                setMovimiento(OrderByDate(json.data).slice(0, 5))
            })
    }, []);

    return (
        <Card className="containerTransaccionesUser">
            <CardTitle className="titleUltMov">Últimos 5 movimientos</CardTitle>
            <ul className="listTransaccionesUser">
                {
                    movimiento.length === 0 ?
                        <li className="itemListTransacciones">Todavía no hay información</li>
                        :
                        movimiento.map(mov => {
                            return (
                                <li key={mov.id} className="itemListTransacciones">
                                    {
                                        mov.tipo_transaccion.id === 2
                                            ?
                                            (
                                                <>
                                                    <img src={Retiro} alt="icon-retiro" className="imgTransaccionesUser" />
                                                    <p className="observacionTransaccionesUser">{mov.observacion}</p>
                                                    <p className="puntosTransaccionesUser">- {mov.puntos}</p>
                                                </>
                                            )
                                            :
                                            (
                                                <>
                                                    <img src={Ingreso} alt="icon-retiro" className="imgTransaccionesUser" />
                                                    <p className="observacionTransaccionesUser">{Recortar(mov.observacion)}</p>
                                                    <p className="puntosTransaccionesUser">+ {mov.puntos}</p>
                                                </>
                                            )
                                    }

                                </li>
                            )
                        })
                }
            </ul>
                {/* </Col> */}
            {/* </Row> */}
        </Card>
    )
}

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

        return array.push({
            ...el,
            "order": year + mes + dia + hora + minutos + segundos + milisegundos
        })
    })

    array.sort((a, b) => a.order < b.order ? 1 : -1)
    return array;
}

function Recortar(st) {
    const array = st.split("-");
    return array[1] + " -" + array[2];
}