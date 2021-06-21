import React, { useState, useEffect } from 'react';
import './Monedero.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';

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
    const [puntos, setPuntos] = useState();
    const [error, setError] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        axios.get(`https://price-hunter-api.herokuapp.com/transacciones/consulta/1`, { headers: { "Authorization": `Bearer ${token}` } })
            .then(json => {
                setMovimientos(json.data)
                setLoading(false);

            })
    }, [state]);

    const handleChange = (e) => {
        setPuntos(parseInt(e.target.value));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token");
        const body = {
            puntosRetiro: puntos
        }
        if (puntos >= totalPoints) {
            return setError({
                bol: true,
                msg: "No tienes suficientes hunterCoins"
            })
        } else {
            if (!error.bol) {
                axios.post(
                    "https://price-hunter-api.herokuapp.com/transacciones/retirapuntos",
                    body,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                ) //VERIFICAR RUTA
                .then(resp => {
                    swal(resp.data.rptaPuntos, " ", "success");
                    setModal(false)
                    setPuntos(0);
                    setState(true)
                })
            }
        }
    }

    return (
        loading ?
            <div className="containerMessageBack">Cargando movimientos...</div>
            :
            <>
                <div className="miMonedero">
                    <div className="misPuntos">
                        <h2>Mis puntos</h2>
                        <div className="actual">
                            <p className="pointsActual">{actualPoints(movimiento)}</p>
                            <p className="puntos">puntos</p>
                        </div>
                    </div>
                    <div className="movimientos">
                        <h2 className="titleMovimientos">Mis movimientos</h2>
                        <ul className="listTransaccion">
                            {movimiento.map(transaccion => {
                                return (
                                    <li key={transaccion.id} className="transaccion">
                                        <p className="title">{transaccion.observacion}</p>
                                        {
                                            transaccion.tipo_transaccion.id === 2 ?
                                                <h2 className="puntos menos">- {transaccion.puntos}</h2> :
                                                <h2 className="puntos mas">+ {transaccion.puntos}</h2>
                                        }
                                    </li>
                                )
                            }
                            )}
                        </ul>
                        <button onClick={e => setModal(!modal)}>Canjear puntos</button>
                    </div>
                </div>
                {
                    !modal ? null :
                        <div className="FormPostPrice" id="modalRetiroPoints">
                            <h2 className="h2">Retiro de Puntos</h2>
                            <button className="closeModal" onClick={() => setModal(!modal)}>X</button>
                            <Form.Group>
                                <Form.Label className="label">Puntos a retirar</Form.Label>
                                <Form.Control
                                    name="puntosRetiro"
                                    onChange={(e) => handleChange(e)}
                                    value={puntos}
                                    type="number"
                                    placeholder="Ingresé la cantidad de puntos a retirar"
                                    className="control"
                                />
                                <Form.Text className={error.bol ? "errors" : "p"}>
                                    {error.msg}
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>
                                Submit
                            </Button>
                        </div>
                }
            </>
    )
}

export default Monedero;
