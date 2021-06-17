import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import FormPostPrice from '../FormPostPrice/FormPostPrice';
import './MisDesafios.css'

function MisDesafios() {
    const [modal, setModal] = useState(false);
    const [desafio, setDesafio] = useState();

    const state = [
        {
            puntos_ganar: 200,
            cantidad_precios: 100,
            ciudadId: 1,
            desafioId: 1,
            nombre_desafio: "canasta familiar arroz",
            descripcion_desafio: "comparte los precios de los productos con tu comunidad  para beneficio de todos",
            productoId: 1,
            clienteId: 1,
            url_image: "https://www.latinflores.com/imagenes/productos/CANAVI004_L.jpg",
            // fecha_inicial: [2021, 06, 10],
            // fecha_final: [2021, 12, 31],
            ciudad: "Buenos Aires",
            paiseCodigoAlfa: "ARG"
        },
        {
            puntos_ganar: 200,
            cantidad_precios: 100,
            ciudadId: 1,
            desafioId: 2,
            nombre_desafio: "canasta familiar papa",
            descripcion_desafio: "comparte los precios de los productos con tu comunidad  para beneficio de todos",
            productoId: 2,
            clienteId: 1,
            url_image: "https://www.latinflores.com/imagenes/productos/CANAVI004_L.jpg",
            // fecha_inicial: [2021, 06, 10],
            // fecha_final: [2021, 12, 31],
            ciudad: "Buenos Aires",
            paiseCodigoAlfa: "ARG"
        },
        {
            puntos_ganar: 200,
            cantidad_precios: 100,
            ciudadId: 1,
            desafioId: 3,
            nombre_desafio: "canasta familiar leche_normal",
            descripcion_desafio: "comparte los precios de los productos con tu comunidad  para beneficio de todos",
            productoId: 3,
            clienteId: 1,
            url_image: "https://www.latinflores.com/imagenes/productos/CANAVI004_L.jpg",
            // fecha_inicial: [2021, 06, 10],
            // fecha_final: [2021, 12, 31],
            ciudad: "Buenos Aires",
            paiseCodigoAlfa: "ARG"
        },
        {
            puntos_ganar: 200,
            cantidad_precios: 100,
            ciudadId: 1,
            desafioId: 4,
            nombre_desafio: "canasta familiar huevos",
            descripcion_desafio: "comparte los precios de los productos con tu comunidad  para beneficio de todos",
            productoId: 4,
            clienteId: 1,
            url_image: "https://www.latinflores.com/imagenes/productos/CANAVI004_L.jpg",
            // fecha_inicial: [2021, 06, 10],
            // fecha_final: [2021, 12, 31],
            ciudad: "Buenos Aires",
            paiseCodigoAlfa: "ARG"
        },
        {
            puntos_ganar: 200,
            cantidad_precios: 100,
            ciudadId: 1,
            desafioId: 5,
            nombre_desafio: "canasta familiar harina_trigo",
            descripcion_desafio: "comparte los precios de los productos con tu comunidad  para beneficio de todos",
            productoId: 5,
            clienteId: 1,
            url_image: "https://www.latinflores.com/imagenes/productos/CANAVI004_L.jpg",
            // fecha_inicial: [2021, 06, 10],
            // fecha_final: [2021, 12, 31],
            ciudad: "Buenos Aires",
            paiseCodigoAlfa: "ARG"
        },
        {
            puntos_ganar: 200,
            cantidad_precios: 100,
            ciudadId: 1,
            desafioId: 6,
            nombre_desafio: "canasta familiar café",
            descripcion_desafio: "comparte los precios de los productos con tu comunidad  para beneficio de todos",
            productoId: 6,
            clienteId: 1,
            url_image: "https://www.latinflores.com/imagenes/productos/CANAVI004_L.jpg",
            // fecha_inicial: [2021, 06, 10],
            // fecha_final: [2021, 12, 31],
            ciudad: "Buenos Aires",
            paiseCodigoAlfa: "ARG"
        },
        {
            puntos_ganar: 200,
            cantidad_precios: 100,
            ciudadId: 1,
            desafioId: 7,
            nombre_desafio: "canasta familiar pan_tajado",
            descripcion_desafio: "comparte los precios de los productos con tu comunidad  para beneficio de todos",
            productoId: 7,
            clienteId: 1,
            url_image: "https://www.latinflores.com/imagenes/productos/CANAVI004_L.jpg",
            // fecha_inicial: [2021, 06, 10],
            // fecha_final: [2021, 12, 31],
            ciudad: "Buenos Aires",
            paiseCodigoAlfa: "ARG"
        },
        {
            puntos_ganar: 200,
            cantidad_precios: 100,
            ciudadId: 1,
            desafioId: 8,
            nombre_desafio: "canasta familiar pan_tajado",
            descripcion_desafio: "comparte los precios de los productos con tu comunidad  para beneficio de todos",
            productoId: 7,
            clienteId: 1,
            url_image: "https://www.latinflores.com/imagenes/productos/CANAVI004_L.jpg",
            // fecha_inicial: [2021, 06, 10],
            // fecha_final: [2021, 12, 31],
            ciudad: "Buenos Aires",
            paiseCodigoAlfa: "ARG"
        },
        {
            puntos_ganar: 200,
            cantidad_precios: 100,
            ciudadId: 1,
            desafioId: 9,
            nombre_desafio: "canasta familiar sal",
            descripcion_desafio: "comparte los precios de los productos con tu comunidad  para beneficio de todos",
            productoId: 9,
            clienteId: 1,
            url_image: "https://www.latinflores.com/imagenes/productos/CANAVI004_L.jpg",
            // fecha_inicial: [2021, 06, 10],
            // fecha_final: [2021, 12, 31],
            ciudad: "Buenos Aires",
            paiseCodigoAlfa: "ARG"
        },
    ]

    const handleClickOpen = (e) => {
        setDesafio(e.target.id)
        setModal(!modal)
    }

    const handleClickClose = (e) => {
        setModal(!modal)
    }

    return (
        <>
            <div className="cardsContainer">
                {state.map(desafio => {
                    return (
                        <div key={desafio.desafioId} id="container">
                            <div class="product-details">
                                <h1>{desafio.nombre_desafio}</h1>
                                <p class="information">{desafio.descripcion_desafio}</p>
                                <p>Ciudad : {desafio.ciudad}</p>
                                <p>Limite de precios : {desafio.cantidad_precios}</p>
                                <p>Total de puntos : {desafio.puntos_ganar}</p>
                                <div class="control">
                                    <button onClick={e => handleClickOpen(e)} class="btn">
                                        <span id={desafio.desafioId} class="buy">Publicar precio</span>
                                    </button>
                                </div>
                            </div>
                            <div class="product-image">
                                <img src={desafio.url_image} alt={desafio.nombre_desafio} />
                            </div>
                        </div>
                    )
                })}
            </div>
            {modal ? <FormPostPrice setModal={handleClickClose} modal={modal} desafio={desafio} /> : null}
        </>
    )
}

export default MisDesafios;


