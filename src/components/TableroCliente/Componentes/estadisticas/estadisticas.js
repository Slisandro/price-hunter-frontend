import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./estadisticas.css";
import TablaCliente from '../../../TablaCliente'
import { useSelector, useDispatch } from 'react-redux';
import TablaClientesDesafio from '../../../TablaClienteDesafio';
import {URL} from '../../../Redux/actions'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  FormText,
} from "reactstrap";

// C:\Users\LENOVO\OneDrive\Escritorio\GitHub\Proyecto Grupal\price-hunter-frontend\src\components\TablaCliente.js

function Estadisticas(props) {
  const dispatch = useDispatch();
  // console.log(props)
  const [idSelect, setIdSelect] = useState();
  const [cabeza, setCabeza] =useState()
  const [ciudades, setCiudades] =useState()
  const [precios, setPrecios] =useState()
  const [preciosFilter, setPreciosFilter] =useState()
  const [desafios, setDesafios] =useState()
  const [ciudadSelect, setCiudadSelect] =useState()
  const [sumaPuntos, setSumaPuntos] = useState();
  const [sumaPrecios, setSumaPrecios] = useState();
  const [reinicio, setReinico] =useState();

  
  

  function handleDesafios(e){
    // console.log('tipo',typeof(e.target.value))
    if (e.target.value){
      getDesafios(e.target.value)
    }
  }
  function handlePrecios(ciudadSeleccionada){
    // console.log('ciudSelect',ciudadSeleccionada)
    // console.log('ciudades', precios)
    if(ciudadSeleccionada !=="Todas"){
      setPreciosFilter(precios.filter(arg=>  arg.ciudadId ===parseFloat(ciudadSeleccionada.split(',')[0]) ))
    }else{
      setPreciosFilter(precios)
      if(ciudades){
        let sumaPrec = 0;
        let sumaPunt = 0;
        for(let x =0; x< ciudades.length;x++){
          // console.log('sumaRango', parseInt(ciudades[x].puntosOfrecidos))
          sumaPunt =  parseInt(ciudades[x].puntosOfrecidos)+ sumaPrec;
          sumaPrec =  parseInt(ciudades[x].cantidadPrecios)+ sumaPunt;

        }
        setSumaPuntos(sumaPunt);
        setSumaPrecios(sumaPrec);
      }
    }
  }

  
    function hadleCiudad(e){
      if(e.target.value){
        setCiudadSelect(e.target.value)
        handlePrecios(e.target.value)//FIltra los precios
      }
    }
 
    
  function getDesafios(tipo) {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      // url: 'http://localhost:3001/misdesafios?estado=' + tipo + '&orden=asc',
      url: `${URL}misdesafios?estado=` + tipo + '&orden=asc',

      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => {
      setDesafios(r.data)
    }).catch((err)=>{
      alert('su sesión ha expirado');
      console.log(err)
        return(dispatch({type: 'CERRAR_SESION'}))
    })
}

  function getEstadisticas() { //trae los precios, encabezado y ciudades del desafio del idSelect
      const token = localStorage.getItem("token");
      axios({
        method: "get",
        // url: 'http://localhost:3001/estadisticacliente/' +  idSelect,
        url: `${URL}estadisticacliente/` +  idSelect,

        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => {
        setCabeza(r.data.headerDesafio)
        setCiudades(r.data.ciudadesDesafio)
        setPrecios(r.data.preciosDesafio)
        setPreciosFilter(null)
        setReinico('nada')
        
        // console.log(r.data)
      }).catch((err)=>{
        alert('su sesión ha expirado');
        console.log(err)
          return(dispatch({type: 'CERRAR_SESION'}))
      })
  }
  
  useEffect(()=>{
    getEstadisticas();
  },[idSelect]);
  
  useEffect(async()=>{
  await getDesafios('activos');
},[])
  return (
    <div className='estadisticasCliente'>
      {/* {cabezaDesafio[0] && console.log(cabezaDesafio[0].nombre_desafio)} */}
        <div>
          <Col sm={2}>
          <h6 className='titulosestadisticas'>Tipo de desafío:</h6>
            <Input type='select' onClick={e=> handleDesafios(e)}> 
              <option  className ='listasestadisticas' value = 'activos'>Activos</option>
              <option className ='listasestadisticas' value = 'programados'>Programados</option>
              <option className ='listasestadisticas' value = 'finalizados'>Finalizados</option>
            </Input>
          </Col>
        </div>
        <div>
        { !desafios? <span>Seleccione un tipo de desafío</span>: <TablaClientesDesafio desafios={desafios} setIdSelect={setIdSelect}></TablaClientesDesafio>}

        </div>
        {idSelect && <div>
           <Row style={{marginTop: '1rem'}}>
            <Col>
              <h6 className='titulosestadisticas'>Nombre del desafío:</h6>
              <span className='datosestadistica'>{cabeza && cabeza.nombre_desafio}</span>
            </Col>
            <Col>
              <h6 className='titulosestadisticas'>Descripción:</h6>
              <span className='datosestadistica'>{cabeza && cabeza.descripcion_desafio}</span>
            </Col>
            <Col>
              <h6 className='titulosestadisticas'>Nombre producto:</h6>
              <span className='datosestadistica'>{cabeza && cabeza.nombre_producto}</span>
            </Col>
          </Row>
         
          <Row style={{marginTop: '1rem'}}>
            <Col>
              <h6 className='titulosestadisticas'>Puntos Ofrecidos:</h6>
              {preciosFilter && preciosFilter.length && ciudadSelect && ciudadSelect!=='Todas' && <span className='datosestadistica'>{parseInt(ciudadSelect.split(',')[1])}</span>}
              {preciosFilter &&  preciosFilter.length  && ciudadSelect && ciudadSelect ==='Todas' && <span className='datosestadistica'>{sumaPuntos}</span>}
            </Col>

            <Col>
              
              <h6 className='titulosestadisticas'>Precios a Capturar:</h6>
              {preciosFilter && preciosFilter.length && ciudadSelect && ciudadSelect!=='Todas' && <span className='datosestadistica'>{parseInt(ciudadSelect.split(',')[2])}</span>}
              {preciosFilter &&  preciosFilter.length  && ciudadSelect && ciudadSelect ==='Todas' && <span className='datosestadistica'>{sumaPrecios}</span>}
            </Col>
            <Col>
              <h6 className='titulosestadisticas'>Puntos por precio:</h6>
              {preciosFilter && preciosFilter.length && ciudadSelect && ciudadSelect!=='Todas' && <span className='datosestadistica'>{parseFloat(ciudadSelect.split(',')[1]) / parseFloat(ciudadSelect.split(',')[2])}</span>}
              {preciosFilter &&  preciosFilter.length  && ciudadSelect && ciudadSelect ==='Todas' && <span className='datosestadistica'>{(sumaPuntos / sumaPrecios ).toFixed(2)}</span>}
            </Col>
          </Row>

        
          <Row style={{marginTop: '1rem'}}> 
            <Col>
              <h6 className='titulosestadisticas'>Precios Capturados</h6>
              {preciosFilter && preciosFilter.length && ciudadSelect && <span className='datosestadistica'>{preciosFilter.length}</span>}
            </Col>
            <Col>
              <h6 className='titulosestadisticas'>Puntos Ganados (Cazador)</h6>
              {preciosFilter && preciosFilter.length && ciudadSelect && ciudadSelect!=='Todas' &&<span className='datosestadistica'>{(preciosFilter.length * (parseFloat(ciudadSelect.split(',')[1]) / parseFloat(ciudadSelect.split(',')[2]))).toFixed(2)}</span>}
              {preciosFilter && preciosFilter.length && ciudadSelect && ciudadSelect ==='Todas' &&<span className='datosestadistica'>{(preciosFilter.length * (sumaPuntos / sumaPrecios)).toFixed(2)}</span>}

            </Col>
            <Col>
            {/* {console.log('cantprecios', preciosFilter.length, sumaPrecios)} */}
              <h6 className='titulosestadisticas'>Avance %</h6>
              {preciosFilter && preciosFilter.length && ciudadSelect && ciudadSelect!=='Todas' &&<span className='datosestadistica'>{((preciosFilter.length / parseInt(ciudadSelect.split(',')[2])*100)).toFixed(1)+ ' %'}</span>}
              {preciosFilter &&  preciosFilter.length  && ciudadSelect && ciudadSelect ==='Todas' && <span className='datosestadistica'>{((preciosFilter.length / sumaPrecios)*100).toFixed(1)+ ' %'}</span>}
              
            </Col>
            
            
          </Row>
          <Row style={{marginTop: '1rem'}}>

            <Col sm={4}>{/*  lista de ciudades */}
              <h6 className='titulosestadisticas'>Ciudad:</h6>
              <Input type='select' value={reinicio} onChange={e => hadleCiudad(e)}>
                <option selected className='listasestadisticas' value='nada'></option>
                <option className ='listasestadisticas'>Todas</option>
                {ciudades && ciudades.map(arg => {
                  return(
                    <option  className ='listasestadisticas' value={[arg.idciudad, arg.puntosOfrecidos, arg.cantidadPrecios]}>{arg.ciudad}</option>  
                  )
                })}
              </Input>
            </Col>
            <Col>
              <h6 className='titulosestadisticas'>Fecha inicial:</h6>
              <span className='datosestadistica'>{cabeza && cabeza.fecha_inicial}</span>
            </Col>
            <Col>
              <h6 className='titulosestadisticas'>Fecha final:</h6>
              <span className='datosestadistica'>{cabeza && cabeza.fecha_final}</span>
            </Col> 
          </Row>
          <div>
              {/* {console.log('precios filtrados', preciosFilter)} */}
              {preciosFilter && <TablaCliente precios={preciosFilter}></TablaCliente>}
          </div>
        </div>}
    </div>

  );
}



export default Estadisticas;