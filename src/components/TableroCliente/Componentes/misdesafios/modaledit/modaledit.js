import React, {useState, useEffect} from 'react';
// import "./modaledit.css";
import "../../misdesafios/modaledit/modaledit.css";

import {Button, Modal, ModalBody} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"


function ModalEdilDesafio({abierto, abrirModal2, desafio}){


    return(
            
        <Modal isOpen={abierto} >
            <Button onClick={()=>{abrirModal2()}} >X</Button>
            <ModalBody>
                <p>HOLA !!</p>

            </ModalBody>
        </Modal>
            

        

    );
}

export default ModalEdilDesafio;