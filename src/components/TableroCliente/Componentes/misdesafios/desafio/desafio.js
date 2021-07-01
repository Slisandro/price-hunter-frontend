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
                <div> <button onClick={()=>{abrirModal2()}} ><img  className="icono-desafio-listadesafios-cliente" src={lapiz} /></button>  </div> 
            </div>

            <ModalDetalleDesafio desafio={desafio} abierto={stateModal.abierto} abrirModal={abrirModal} />
            <ModalEdilDesafio desafio={desafio} abierto={stateModal2.abierto} abrirModal2={abrirModal2}  />
        </div>
    
  );
}




export default Desafio;