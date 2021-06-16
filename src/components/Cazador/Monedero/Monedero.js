import React, { useState } from 'react';
import './Monedero.css';

function actualPoints(arr) {
    const suma = arr.slice().filter(x => x.tipoTransaccionId === 1).reduce(((acc, cur) => acc + cur.puntos), 0);
    const resta = arr.slice().filter(x => x.tipoTransaccionId === 2).reduce(((acc, cur) => acc + cur.puntos), 0);
    return suma - resta
}

function Monedero() {

    const state = [
        { observacion: "Price Hunter Asociados ARG / COL - canasta familiar arroz- Buenos Aires", usuarioId: 1, puntos: 2, tipoTransaccionId: 1 },
        { observacion: "Price Hunter Asociados ARG / COL - canasta familiar arroz- Córdoba", usuarioId: 1, puntos: 2, tipoTransaccionId: 1 },
        { observacion: "Price Hunter Asociados ARG / COL - canasta familiar arroz- Bahía Blanca", usuarioId: 1, puntos: 2, tipoTransaccionId: 1 },
        { observacion: "Price Hunter Asociados ARG / COL - canasta familiar arroz- Paraná", usuarioId: 1, puntos: 2, tipoTransaccionId: 1 },
        { observacion: "Price Hunter Asociados ARG / COL - canasta familiar arroz- La Plata", usuarioId: 1, puntos: 2, tipoTransaccionId: 1 },
        { observacion: "Price Hunter Asociados ARG / COL - canasta familiar papa- Buenos Aires", usuarioId: 1, puntos: 2, tipoTransaccionId: 1 },
        { observacion: "Price Hunter Asociados ARG / COL - canasta familiar arroz- Buenos Aires", usuarioId: 1, puntos: 2, tipoTransaccionId: 1 },
        { observacion: "Price Hunter Asociados ARG / COL - canasta familiar arroz- Córdoba", usuarioId: 1, puntos: 2, tipoTransaccionId: 1 },
        { observacion: "Price Hunter Asociados ARG / COL - canasta familiar arroz- Bahía Blanca", usuarioId: 1, puntos: 2, tipoTransaccionId: 1 },
        { observacion: "Price Hunter Asociados ARG / COL - canasta familiar arroz- Paraná", usuarioId: 1, puntos: 2, tipoTransaccionId: 1 },
        { observacion: "Price Hunter Asociados ARG / COL - canasta familiar arroz- La Plata", usuarioId: 1, puntos: 2, tipoTransaccionId: 1 },
        { observacion: "Price Hunter Asociados ARG / COL - canasta familiar papa- Buenos Aires", usuarioId: 1, puntos: 2, tipoTransaccionId: 1 },
        { observacion: "Price Hunter Asociados ARG / COL - canasta familiar papa- Córdoba", usuarioId: 1, puntos: 2, tipoTransaccionId: 1 },
        { observacion: "Price Hunter Asociados ARG / COL - canasta familiar papa- Bahía Blanca", usuarioId: 1, puntos: 2, tipoTransaccionId: 1 },
        { observacion: "PSE - CITY-BANK Cta: ****6789", usuarioId: 1, puntos: 1, tipoTransaccionId: 2 },
        { observacion: "PSE - DAVIVIENDA Cta: ****8911", usuarioId: 1, puntos: 3, tipoTransaccionId: 2 },
        { observacion: "PSE - MERCADO PAGO Cta: ****3147", usuarioId: 1, puntos: 2, tipoTransaccionId: 2 },
        { observacion: "PSE - MERCADO PAGO Cta: ****1987", usuarioId: 1, puntos: 1, tipoTransaccionId: 2 },
        { observacion: "PSE - MERCADO PAGO Cta: ****6478", usuarioId: 1, puntos: 4, tipoTransaccionId: 2 },
        { observacion: "PSE - CITY-BANK Cta: ****6789", usuarioId: 1, puntos: 1, tipoTransaccionId: 2 },
        { observacion: "PSE - DAVIVIENDA Cta: ****8911", usuarioId: 1, puntos: 1, tipoTransaccionId: 2 },
    ]

    return (
        <div className="miMonedero">
            <div className="misPuntos">
                <h2>Mis puntos</h2>
                <p className="pointsActual">{actualPoints(state)}</p>
                <p>puntos</p>
            </div>
            <div className="movimientos">
                <h2 className="titleMovimientos">Mis movimientos</h2>
                <ul className="listTransaccion">
                    {state.map(transaccion => {
                        return (
                            <li className="transaccion">
                                <p className="title">{transaccion.observacion}</p>
                                {
                                    transaccion.tipoTransaccionId === 2 ?
                                        <h2 className="puntos menos">- {transaccion.puntos}</h2> :
                                        <h2 className="puntos mas">+ {transaccion.puntos}</h2>
                                }
                            </li>
                        )
                    }
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Monedero;