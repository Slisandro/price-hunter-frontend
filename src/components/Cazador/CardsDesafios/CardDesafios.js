import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function CardsDesafios({ desafio, handleClickOpen }) {
    let id = 0;
    return (
        desafio.ciudads.map(x => {
            id = id + 1;
            return (
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