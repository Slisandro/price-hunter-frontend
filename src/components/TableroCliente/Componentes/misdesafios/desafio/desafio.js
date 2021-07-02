import React, {useState, useEffect} from 'react';
// import { connect } from 'react-redux';
// import {getMisDesafios} from "../../../Redux/actions";
import "./desafio.css"
import lapiz from "./lapiz.png";
import ojo from "./ver.png";
import { Button, Modal } from "reactstrap";
import ModalDetalleDesafio from "../modal-detalles/modaldetalles";
import ModalEdilDesafio from "../modaledit/modaledit";



function Desafio({desafio}) {
  const [stateModal, setStateModal] = useState({ abierto: false });
  const [stateModal2, setStateModal2] = useState({ abierto: false });


  //-----funcion para limitar las fechas min en el form-------//
//----------------------------------------------------------//
function chequeofecha(val) {
  let str = val.toString()
  if (str.length < 2) {
    return str = "0" + str;
  }
  return str
}

const año_min = new Date().getFullYear();
const mes_min = new Date().getMonth() + 1;
const dia_min = new Date().getDate();
const fecha_min = año_min.toString() + "-" + chequeofecha(mes_min) + "-" + chequeofecha(dia_min);
const fecha_min_slice = fecha_min.slice(2,10)


const año_des_min = (parseInt(fecha_min_slice.slice(0,2))+2000)*1000;
const mes_des_min = parseInt( fecha_min_slice.slice(3,5) )*100;
const dia_des_min = parseInt( fecha_min_slice.slice(6,8) );
const fecha_min_acumulada = año_des_min + mes_des_min + dia_des_min;
// console.log(fecha_min_acumulada)
//----------------------------------------------------------//
//----------------------------------------------------------//
 
//--------------------fecha final acumulada--------------//
const año_des = (parseInt(desafio.fecha_final.slice(0,2))+2000)*1000;
const mes_des = parseInt( desafio.fecha_final.slice(3,5) )*100;
const dia_des = parseInt( desafio.fecha_final.slice(6,8) );
const fecha_final_desafio_acumulada = año_des + mes_des + dia_des;
// console.log(fecha_final_desafio_acumulada)
//---------------------------------------------------------//


  //-------FUNCIONES CALLBACK PARA MODAL DETALLE------//
  //--------------------------------------------------//
  function abrirModal() {
    setStateModal({ abierto: !stateModal.abierto })
  }

  function abrirModal2() {
    setStateModal2({ abierto: !stateModal2.abierto })
  }
  //--------------------------------------------------//
  //--------------------------------------------------//
  
  return (
    
        <div className="desafio-lista-misdesafios-cliente" >
            <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" > {desafio.nombre_desafio} </p> </div>
            <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" > {desafio.fecha_inicial} </p> </div>
            <div className="conteiner-p-desafio" > <p className="p-desafio-misdesafios-cliente" > {desafio.fecha_final} </p> </div>
            <div className="conteiner-p-desafio" className="conteiner-img-desafio" >
                {/* <div> <Button style={styles_buttn} ><img className="icono-desafio-listadesafios-cliente" src={ojo} /></Button>  </div> 
                <div> <Button style={styles_buttn} ><img  className="icono-desafio-listadesafios-cliente" src={lapiz} /></Button>  </div>  */}
                <div> <button onClick={()=>{abrirModal()}} ><img className="icono-desafio-listadesafios-cliente" src={ojo} /></button>  </div> 

                {
                  (fecha_final_desafio_acumulada < fecha_min_acumulada ) ? null 
                  :
                <div> <button onClick={()=>{abrirModal2()}} ><img  className="icono-desafio-listadesafios-cliente" src={lapiz} /></button>  </div> 
                }
            </div>

            <ModalDetalleDesafio desafio={desafio} abierto={stateModal.abierto} abrirModal={abrirModal} />
            <ModalEdilDesafio desafio={desafio} abierto={stateModal2.abierto} abrirModal2={abrirModal2}  />
        </div>
    
  );
}




export default Desafio;