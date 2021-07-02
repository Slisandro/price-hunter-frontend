import React, { useState } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Col } from 'reactstrap';

export default function CardsDesafios({ desafio, handleClickOpen }) {
    let id = 0;
    return (
        desafio.ciudads.map(x => {
            id = id + 1;
            return (
                <Col key={id} sm={6} md={4} lg={3}>
                    <Card>
                        <CardImg variant="top"
                            alt={desafio.nombre_desafio}
                            src={desafio.url_image}
                        />
                        <CardBody
                            style={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <CardTitle style={{ textAlign: "center", fontSize: "1.5em" }}>{desafio.nombre_desafio}</CardTitle>
                            <CardText style={{ textAlign: "center", fontSize: "1em" }}>{desafio.descripcion_desafio}</CardText>
                            <CardText className="info" style={{ textAlign: "center", fontSize: "1em" }}>Ciudad : {x.ciudad}</CardText>
                            <CardText className="info" style={{ textAlign: "center", fontSize: "1em" }}>Limite de precios : {x.detalle.cantidad_precios}</CardText>
                            <CardText className="info" style={{ textAlign: "center", fontSize: "1em" }}>Total de puntos : {x.detalle.puntos_ganar}</CardText>
                            <Button
                                value={desafio.id}
                                name={x.id}
                                style={{
                                    width: "100%",
                                    padding: "5% 0"
                                }}
                                onClick={e => handleClickOpen(e)}
                                className="btn-fill"
                                color="primary"
                                type="submit"
                                block
                            >Publicar precio
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            )
        })
    )
}