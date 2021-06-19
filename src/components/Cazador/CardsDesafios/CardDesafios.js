import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function CardsDesafios({ desafio, handleClickOpen }) {
    let id = 0;
    return (
        desafio.ciudads.map(x => {
            id = id + 1;
            return (
                //  CARDS DESAFIOS
                // <div key={id} id="container">
                //     <div class="product-details">
                //         <h1>{desafio.nombre_desafio}</h1>
                //         <p class="information">{desafio.descripcion_desafio}</p>
                //         <p>Ciudad : {x.ciudad}</p>
                //         <p>Limite de precios : {x.detalle.cantidad_precios}</p>
                //         <p>Total de puntos : {x.detalle.puntos_ganar}</p>
                //         <div class="control">
                //             <button
                // value={desafio.id}
                // name={x.id}
                // onClick={e => handleClickOpen(e)}
                // class="btn"
                //             >
                //                 Publicar precio
                //             </button>
                //         </div>
                //     </div>
                //     <div class="product-image">
                //         <img src={desafio.url_image} alt={desafio.nombre_desafio} />
                //     </div>

                // </div>
                <Card>
                    <Card.Img variant="top"
                        alt={desafio.nombre_desafio}
                        src={desafio.url_image}
                    />
                    <Card.Body>
                        <Card.Title>{desafio.nombre_desafio}</Card.Title>
                        <Card.Text>{desafio.descripcion_desafio}</Card.Text>
                        <Card.Text className="info">Ciudad : {x.ciudad}</Card.Text>
                        <Card.Text className="info">Limite de precios : {x.detalle.cantidad_precios}</Card.Text>
                        <Card.Text className="info">Total de puntos : {x.detalle.puntos_ganar}</Card.Text>
                        <Button
                            value={desafio.id}
                            name={x.id}
                            onClick={e => handleClickOpen(e)}
                            class="btn"
                            variant="primary">Publicar precio</Button>
                    </Card.Body>
                </Card>
            )
        })
    )
}