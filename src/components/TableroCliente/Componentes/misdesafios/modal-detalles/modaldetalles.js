import React, {useState, useEffect} from 'react';
// import "./modaldetalles.css";
import {Button, Modal, ModalBody} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"


function ModalDetalleDesafio({abierto, abrirModal, desafio}){

    return(
            
        <Modal isOpen={abierto} >
            <Button onClick={()=>{abrirModal()}} >X</Button>
            <ModalBody>
                <div className="conteiner-detalle-desafio-cliente" >
                    <div className="conteiner-img-fechas-detalle-desafio" >
                        <p className="div-img-fechas-detalle-desafio" >Desafío:</p>
                        <p className="div-img-fechas-detalle-desafio" >{desafio.nombre_desafio}</p>
                    </div>

                    <div className="conteiner-img-fechas-detalle-desafio" >
                        <p className="div-img-fechas-detalle-desafio" >ID Desafío:</p>
                        <p className="div-img-fechas-detalle-desafio" > {desafio.id} </p>
                    </div>

                    <div>
                        <p>Descripción Desafío:</p>
                        <p> {desafio.descripcion_desafio} </p>
                    </div>

                    <div className="conteiner-img-fechas-detalle-desafio" >
                        <div className="div-img-fechas-detalle-desafio" >
                            <div className="fechas-detalle-desafio-estilo" >
                                <p>Fecha Inicial:</p>
                                <p> {desafio.fecha_inicial} </p>
                            </div>

                            <div className="fechas-detalle-desafio-estilo" >
                                <p>Fecha Final:</p>
                                <p> {desafio.fecha_final} </p>
                            </div>
                        </div>
                        <img src={desafio.url_image} className="detalle-desafio-img-estilos" ></img>
                    </div>

                </div>

            </ModalBody>
        </Modal>
            

        

    );
}

export default ModalDetalleDesafio;