import React, {useState, useEffect} from 'react';
// import { connect } from 'react-redux';
// import {getMisDesafios} from "../../../Redux/actions";
import "./desafio.css"
import lapiz from "./lapiz.png";
import ojo from "./ver.png";


function Desafio({desafio}) {
  
  return (
    
        <div className="desafio-lista-misdesafios-cliente" >
            <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" > {desafio.nombre_desafio} </p> </div>
            <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" > {desafio.fecha_inicial} </p> </div>
            <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" > {desafio.fecha_final} </p> </div>
            <div className="conteiner-p-desafio" className="conteiner-img-desafio" >
                <div> <img className="icono-desafio-listadesafios-cliente" src={ojo} /> </div> 
                <div> <img  className="icono-desafio-listadesafios-cliente" src={lapiz} /> </div> 
            </div>
        </div>
    
  );
}




export default Desafio;