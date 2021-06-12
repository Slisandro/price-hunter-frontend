import React from 'react';

function Card({props}) {
    return (
        <li>
            <img src={props.img} className="card__image" alt="" />
            <div className="card__overlay">
                <div className="card__header">                    
                <img className="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" />
                <div className="card__header-text">
                    <h3 className="card__title">Nombre: {props.nombre_producto}</h3>            
                    <span className="card__status">Precio: {props.price}</span>
                </div>
                <div className="card__header-text">
                    <h3 className="card__title">Contenido Neto: {props.contenido_neto} {props.cod_u_medida}</h3>            
                </div>
                </div>
                <p className="card__description">Descripción: 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, blanditiis</p>
            </div>      
        </li>
    )
}

export default Card;