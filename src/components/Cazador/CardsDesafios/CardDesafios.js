import React, { useState } from 'react';

export default function CardsDesafios({ desafio, handleClickOpen }) {
    let id = 0;
    return (
        desafio.ciudads.map(x => {
            id = id + 1;
            return (
                //  CARDS DESAFIOS
                <div key={id} id="container">
                    <div class="product-details">
                        <h1>{desafio.nombre_desafio}</h1>
                        <p class="information">{desafio.descripcion_desafio}</p>
                        <p>Ciudad : {x.ciudad}</p>
                        <p>Limite de precios : {x.detalle.cantidad_precios}</p>
                        <p>Total de puntos : {x.detalle.puntos_ganar}</p>
                        <div class="control">
                            <button
                                value={desafio.id}
                                name={x.id}
                                onClick={e => handleClickOpen(e)}
                                class="btn"
                            >
                                {/* <span
                                    class="buy"
                                > */}
                                    Publicar precio
                                {/* </span> */}
                            </button>
                        </div>
                    </div>
                    <div class="product-image">
                        <img src={desafio.url_image} alt={desafio.nombre_desafio} />
                    </div>

                </div>
            )
        })
    )
}