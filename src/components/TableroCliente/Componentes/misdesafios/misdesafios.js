import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {getMisDesafios} from "../../../Redux/actions";
import "./misdesafios.css"
import Desafio from "./desafio/desafio";
import Select from 'react-select';


function MisDesafios({misdesafios, getmisdesafios}) {

  useEffect(async ()=>{
    await getmisdesafios()
  }, []);

  const estados = [
    {value:"programados", label:"programados"},
    {value:"avtivos", label:"avtivos"},
    {value:"finalizados", label:"finalizados"}
  ]
  
  return (
    <div id="conteiner-lista-misdesafios-cliente" >

      <div  >
          <Select
            options={estados}
          />
        <div>
          <Select
            options={}
          /> 
        </div>
      </div>

      <div className="desafio-lista-misdesafios-cliente" >
        <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" >Desafío</p> </div>
        <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" >Fecha Inicio</p> </div>
        <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" >Fecha Fin</p> </div>
        <div className="conteiner-img-desafio" ></div>
      </div>

        {
          misdesafios ?
            misdesafios.map((desafio)=> <Desafio desafio={desafio} ></Desafio> )
          :
            <p>Cargando...</p>
        }
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    misdesafios: state.misdesafios 
  }
}

const mapDispatchToProps = function(dispatch){
  return{
    getmisdesafios: ()=>{dispatch(getMisDesafios())},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MisDesafios);