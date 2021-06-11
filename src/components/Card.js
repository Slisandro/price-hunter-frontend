import React from 'react';

function Card({props}) {
    return (
        <li>
            <img src={props.img} class="card__image" alt="" />
            <div class="card__overlay">
                <div class="card__header">                    
                <img class="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" />
                <div class="card__header-text">
                    <h3 class="card__title">Nombre: {props.nombre_producto}</h3>            
                    <span class="card__status">Precio: {props.price}</span>
                </div>
                <div class="card__header-text">
                    <h3 class="card__title">Contenido Neto: {props.contenido_neto} {props.cod_u_medida}</h3>            
                </div>
                </div>
                <p class="card__description">Descripción: 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis</p>
            </div>      
        </li>
    )
}

export default Card;