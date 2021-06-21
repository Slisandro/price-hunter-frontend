import React, {useState, useEffect} from 'react';
import "./formcrearproducto.css";
import Select from 'react-select';
import {Button, Modal, ModalBody} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css"
import axios from 'axios';
import token from "../../../token-cliente"


function FormCrearProducto({abierto, abrirModal, stateMensaje, setStateMensaje}){
    const [stateUnidades, setStateUnidades] = useState([]);
    const [stateSubcategorias, setStateSubCategorias] = useState([]);
    const [stateProductoNuevo, setStateProductoNuevo] = useState({
        nombre:"",
        contenido_neto:"",
        unidad_medida:"",
        id_subcategoria:""
    });
    // const [stateMensaje, setStateMensaje] = useState("");

    //-----traemos las unidades de medida por request al back----//
    //-----------------------------------------------------------//
    useEffect( async ()=>{
        const resp = await axios.get("http://localhost:3001/unidadmedida" , { headers: { "Authorization": `Bearer ${token}` } });
        setStateUnidades(resp.data);
    },[])
            
    const lista_unidades = [];
    stateUnidades.forEach((unidad)=>{
        lista_unidades.push({
            value: unidad.codigo_unidad_medida,
            label: unidad.codigo_unidad_medida +" / "+ unidad.nombre_unidad
        })
    })
    //-----------------------------------------------------------//
    //-----------------------------------------------------------//

    //-----traemos las subcategorias por request al back---------//
    //-----------------------------------------------------------//
    useEffect( async ()=>{
        const resp = await axios.get("http://localhost:3001/listarsubcategorias", { headers: { "Authorization": `Bearer ${token}` } });
        setStateSubCategorias(resp.data)
    },[])

    const lista_subcategorias = [];
    stateSubcategorias.forEach((subcategoria)=>{
        lista_subcategorias.push({
            value: subcategoria.id,
            label: subcategoria.nombre_subcategoria
        })
    });
    //-----------------------------------------------------------//
    //-----------------------------------------------------------//

    //------request al back para crear el producto nuevo---------//
    //-----------------------------------------------------------//
    async function handleSubmit(e){
        e.preventDefault();

        const respuesta_crearproducto = await axios.post("http://localhost:3001/crearproducto",{
            nombre: stateProductoNuevo.nombre ,
            contenido_neto: parseInt(stateProductoNuevo.contenido_neto),
            unidad_medida: stateProductoNuevo.unidad_medida ,
            id_subcategoria: parseInt(stateProductoNuevo.id_subcategoria) 
        }, { headers: { "Authorization": `Bearer ${token}` } });
        setStateMensaje(respuesta_crearproducto.data.msg)

    }
    //-----------------------------------------------------------//
    //-----------------------------------------------------------//
    console.log(stateMensaje)

    function handleStateProductoNuevo(e){
        const name = e.target.name;
        setStateProductoNuevo({
            ...stateProductoNuevo,
            [name]: e.target.value
        })
    }

    function handleUnidadMedida(e){
        setStateProductoNuevo({
            ...stateProductoNuevo,
            unidad_medida:e.value
        })
    }

    function handleSubcategoria(e){
        setStateProductoNuevo({
            ...stateProductoNuevo,
            id_subcategoria:e.value
        })
    }


    return(

        

            
        <Modal isOpen={abierto} >
            <Button onClick={()=>{abrirModal()}} >X</Button>
            <ModalBody>

            {
                stateMensaje ?
                    <div>
                        <p> {stateMensaje} </p>
                    </div>
                :
                <form id="form-crear-producto-nuevo" onSubmit={(e)=>{handleSubmit(e)}} >

                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        className="margin-inputs-form-crear-producto" 
                        name="nombre"
                        onChange={(e)=>{handleStateProductoNuevo(e)}}
                    />
                    
                    <input 
                        type="number"
                        min="0" 
                        placeholder="Contenido Neto" 
                        className="margin-inputs-form-crear-producto" 
                        name="contenido_neto"
                        onChange={(e)=>{handleStateProductoNuevo(e)}}
                    />
                    
                    <Select 
                        options={lista_unidades} 
                        className="margin-inputs-form-crear-producto" 
                        id="lista-unidades-form-crear-producto" 
                        onChange={(e)=>{handleUnidadMedida(e)}}
                    />

                    <Select
                        options={lista_subcategorias}
                        id="lista-unidades-form-crear-producto" 
                        className="margin-inputs-form-crear-producto"
                        onChange={(e)=>{handleSubcategoria(e)}}
                    />
                    
                    <Button 
                        type="submit"
                        className="margin-inputs-form-crear-producto" 
                    >Crear Producto</Button>

                </form>
            }
                

            </ModalBody>
        </Modal>
            

        

    );
}

export default FormCrearProducto;