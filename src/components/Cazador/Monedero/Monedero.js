import React, { useState, useEffect } from 'react';
import './Monedero.css';
import axios from 'axios';

function actualPoints(arr) {
    const suma = arr.slice().filter(x => x.tipo_transaccion.id === 1).reduce(((acc, cur) => acc + cur.puntos), 0);
    const resta = arr.slice().filter(x => x.tipo_transaccion.id === 2).reduce(((acc, cur) => acc + cur.puntos), 0);
    return suma - resta
}

function Monedero() {
    const [movimiento, setMovimientos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/transacciones/${1}`)
            .then(json => {
                console.log(json.data)
                setMovimientos(json.data)
                setLoading(false);
            })
    }, [])

    return (
        loading ?
            <div>Cargando movimientos...</div>
            :
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
                    <button>Canjear puntos</button>
                </div>
            </div>
    )
}

export default Monedero;