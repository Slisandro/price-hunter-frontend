import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import axios from 'axios';
import {URL} from "../../../Redux/actions";
import { Card, CardHeader, CardBody, CardTitle, CardText, Input, Col, Row, Form, FormGroup, Button, Modal, ModalBody } from 'reactstrap';


function FormCrearProducto({abierto, abrirModal, stateMensaje, setStateMensaje, setStateBoolean, stateBoolean}){
    const [stateUnidades, setStateUnidades] = useState([]);
    const [stateSubcategorias, setStateSubCategorias] = useState([]);
    const [stateProductoNuevo, setStateProductoNuevo] = useState({
        nombre:"",
        contenido_neto:"",
        unidad_medida:"",
        id_subcategoria:""
    });
    const [errorsState, setErrorsState] = useState({
        nombre:"",
        contenido_neto:"",
    });

    //-----traemos las unidades de medida por request al back----//
    //-----------------------------------------------------------//
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async ()=>{
        const token = localStorage.getItem("token");
        const resp = await axios.get(`${URL}unidadmedida` , { headers: { "Authorization": `Bearer ${token}` } });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect( async ()=>{
        const token = localStorage.getItem("token");
        const resp = await axios.get(`${URL}listarsubcategorias`, { headers: { "Authorization": `Bearer ${token}` } });
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
        const token = localStorage.getItem("token")
        const respuesta_crearproducto = await axios.post(`${URL}crearproducto`,{
            nombre: stateProductoNuevo.nombre ,
            contenido_neto: parseInt(stateProductoNuevo.contenido_neto),
            unidad_medida: stateProductoNuevo.unidad_medida ,
            id_subcategoria: parseInt(stateProductoNuevo.id_subcategoria) 
        }, { headers: { "Authorization": `Bearer ${token}` } });
        setStateMensaje(respuesta_crearproducto.data.msg)

        setStateBoolean(!stateBoolean)
    }
    //-----------------------------------------------------------//
    //-----------------------------------------------------------//
    

    function handleStateProductoNuevo(e){
        const name = e.target.name;
        
        if( name==="nombre" && e.target.value.length<6 ){
            setErrorsState({
                ...errorsState,
                [name]: "Campo obligatorio. +5 caracteres"
            })
        }else 
        if( name==="contenido_neto" && !e.target.value) {
            setErrorsState({
                ...errorsState,
                [name]: "Campo obligatorio. solo enteros"
            })
        }else{
            setStateProductoNuevo({
                ...stateProductoNuevo,
                [name]: e.target.value
            })
            if(name==="nombre"){
                setErrorsState({
                    ...errorsState,
                    nombre: ""
                })
            }else{
                setErrorsState({
                    ...errorsState,
                    contenido_neto: ""
                })
            }
        }
    }
    console.log(stateProductoNuevo)

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
            <Button className="btn-fill" onClick={()=>{abrirModal()}} >X</Button>
            <ModalBody>

            {
                stateMensaje ?
                    <div>
                        <h6> {stateMensaje} </h6>
                    </div>
                :
                <Form id="form-crear-producto-nuevo" onSubmit={(e)=>{handleSubmit(e)}} >

                    <div className="div-select-crear-producto" >
                        {errorsState.nombre ? <p className="err" >{errorsState.nombre}</p> : <h6 className="stylos-titulos" >Nombre Producto</h6> }
                        <Input 
                            type="text" 
                            placeholder="Nombre Producto" 
                            name="nombre"
                            onChange={(e)=>{handleStateProductoNuevo(e)}}
                        />
                    </div>
                    
                    <div className="div-select-crear-producto" >
                        {errorsState.contenido_neto ? <p className="err" >{errorsState.contenido_neto}</p> : <h6 className="stylos-titulos" > Contenido Neto </h6> }
                        <Input 
                            type="number"
                            min="0" 
                            placeholder="Contenido Neto" 
                            name="contenido_neto"
                            onChange={(e)=>{handleStateProductoNuevo(e)}}
                        />
                    </div>
                    
                    <div className="div-select-crear-producto" >
                        <h6 className="stylos-titulos" > Unidad de medida </h6>
                        <Select 
                            name="unidad_de_medida"
                            options={lista_unidades} 
                            className="margin-inputs-form-crear-producto" 
                            id="lista-unidades-form-crear-producto" 
                            onChange={(e)=>{handleUnidadMedida(e)}}
                        />
                    </div>

                    <div className="div-select-crear-producto" >
                    <h6 className="stylos-titulos" > Sub Categoría </h6>
                        <Select
                            name="sub_categoria"
                            options={lista_subcategorias}
                            id="lista-unidades-form-crear-producto" 
                            className="margin-inputs-form-crear-producto"
                            onChange={(e)=>{handleSubcategoria(e)}}
                        />
                    </div>
                                       
                    <Button 
                        disabled={ ( errorsState.nombre || errorsState.contenido_neto || !stateProductoNuevo.unidad_medida || !stateProductoNuevo.id_subcategoria ) ? true : false }
                        type="submit"
                        className="btn-fill"
                        size="lg" 
                        block
                    >Crear Producto</Button>

                </Form>
            }           
            </ModalBody>
        </Modal>
    );
}

export default FormCrearProducto;