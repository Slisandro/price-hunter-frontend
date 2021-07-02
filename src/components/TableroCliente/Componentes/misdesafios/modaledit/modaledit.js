import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
// import "./modaledit.css";
import "../../misdesafios/modaledit/modaledit.css";

import {Button, Modal, ModalBody} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
import axios from "axios";
import {URL, refreshMisDesafiosCliente} from "../../../../Redux/actions";





function ModalEdilDesafio({abierto, abrirModal2, desafio}){
    const [state, setState] = useState({ fechafinal:"", descripcion:"", id:desafio.id });
    const [msg, setMsg] = useState( "" );


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
    //----------------------------------------------------------//
    //----------------------------------------------------------//

    //--------------------fecha inicial acumulada--------------//
    const año_des = (parseInt(desafio.fecha_inicial.slice(0,2))+2000)*1000;
    const mes_des = parseInt( desafio.fecha_inicial.slice(3,5) )*100;
    const dia_des = parseInt( desafio.fecha_inicial.slice(6,8) );
    const fecha_inicial_desafio_acumulada = año_des + mes_des + dia_des;

    //---------------------------------------------------------//


    function handleChange(e){
        const name = e.target.name;
        setState({
            ...state,
            [name]: e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        console.log(state)

        const token = localStorage.getItem("token");
        const respuesta = await axios.put(`${URL}editdesafio`, state, {
            headers: { Authorization: `Bearer ${token}` },
        });
        
        setMsg(respuesta.data.msg)
    }
    const dispatch = useDispatch();
    const funcionMarco = () => {
        setMsg('');
        abrirModal2();
        dispatch(refreshMisDesafiosCliente());
    }

    return(

        
            
        <Modal isOpen={abierto} >
            <Button onClick={()=>{funcionMarco()}} >X</Button>
            <ModalBody>

            {
                msg ? <p> {msg} </p> 

                :
            
                <div className="conteiner-edit-desafio-cliente" >
                    <h4 className="titulo-nombre-edit-desafio-cliente" > {desafio.nombre_desafio} </h4>
                    
                    <form className="conteiner-edit-desafio-cliente" >
                        <p>Nueva fecha de finalización:</p>
                        <input type="date" min={fecha_inicial_desafio_acumulada < fecha_min_acumulada? fecha_min : "20"+desafio.fecha_inicial } name="fechafinal" onChange={(e)=>{handleChange(e)}} />
                        
                        <p>Nueva descripción del desafio:</p>
                        <textarea placeholder="Descripción..." name="descripcion" onChange={(e)=>{handleChange(e)}} />

                        <Button onClick={(e)=>{handleSubmit(e)}} >Aplicar cambios.</Button>
                    </form>
                </div>
            }


            </ModalBody>
        </Modal>
            

        

    );
}

export default ModalEdilDesafio;