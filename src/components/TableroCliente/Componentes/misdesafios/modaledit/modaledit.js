import React, {useState, useEffect} from 'react';
import "./modaledit.css";
import {Button, Modal, ModalBody} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
import axios from "axios";
import {URL} from "../../../../Redux/actions";


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
  //----------------------------------------------------------//
  //----------------------------------------------------------//

function ModalEdilDesafio({abierto, abrirModal2, desafio}){
    const [state, setState] = useState({ fechafinal:"", descripcion:"", id:desafio.id });
    const [msg, setMsg] = useState( "" );


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



    return(

        
            
        <Modal isOpen={abierto} >
            <Button onClick={()=>{abrirModal2()}} >X</Button>
            <ModalBody>

            {
                msg ? <p> {msg} </p> 

                :
            
                <div className="conteiner-edit-desafio-cliente" >
                    <h4 className="titulo-nombre-edit-desafio-cliente" > {desafio.nombre_desafio} </h4>
                    
                    <form className="conteiner-edit-desafio-cliente" >
                        <p>Nueva fecha de finalización:</p>
                        <input type="date" min={fecha_min} name="fechafinal" onChange={(e)=>{handleChange(e)}} />
                        
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