import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDesafios } from '../../Redux/actions'
import CardsDesafios from '../CardsDesafios/CardDesafios';
import FormPostPrice from '../FormPostPrice/FormPostPrice';
import axios from 'axios';
import './MisDesafios.css';
import { useHistory } from "react-router-dom";
import RegistroGoogle from '../../Registro Google/RegistroGoogle';

import { Row , Button} from 'reactstrap';

var geolocation = require('geolocation');




function MisDesafios() {
    const [modal, setModal] = useState(false);
    const [modalRegistro, setModalRegistro] = useState(false); // abrir modal
    const [modalCompletado, setModalCompletado] = useState(false) // se pasa como props al componente
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const desafios = useSelector(store => store.desafios)
    const [referencia, setReferencia] = useState({
        idDesafio: ""
    })
    const [ubicacion, setUbicacion] = useState({
        latitud: "",
        longitud: "",
        dis: 0
    })







    const history = useHistory()
    useEffect(() => {
        if (ubicacion.latitud && ubicacion.longitud) {
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ubicacion.latitud},${ubicacion.longitud}&key=AIzaSyAPEpC-G7gntZsFjZd4KvHx3KWqcT9Yy3c`)
                .then(resp => {
                    dispatch(getDesafios(searchCity(resp.data)))
                })
            setLoading(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalCompletado, ubicacion])



    useEffect(() => {
        console.log("Lisandro")
        geolocation.getCurrentPosition((err, position) => {
          if (err) throw err
          return setUbicacion({
            ...ubicacion,
            longitud: position.coords.longitude + "",
            latitud: position.coords.latitude + "",
          })
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])







    const handleClickOpen = (e) => {
        setReferencia({
            idDesafio: parseInt(e.target.value)
        })
        setModal(!modal)
    }

    const handleClickClose = (e) => {
        setModal(!modal);
        setReferencia({
            idDesafio: ""
        })
    }

    return (
        !ubicacion.latitud && !ubicacion.longitud ? 
            <div className="containerMessageBack">
                No hemos podido acceder a tu ubicación
                <Button onClick={() => history.push("/cazador")}>Recargar</Button>
            </div> 
            :
            (
                loading ?
                    <div className="containerMessageBack">Cargando desafíos...</div>
                    :
                    desafios.msg ?
                        <div>
                            <div class="containerMessageBack">{desafios.msg}</div>
                            {
                                desafios.msg === "completar los datos del usuario antes de continuar" ? <>
                                    <button
                                        className="btn-fill"
                                        color="primary"
                                        type="submit"
                                        block
                                        onClick={() => { setModalRegistro(true) }}>form</button>
                                </> : null
                            }
                            {
                                !modalRegistro ? null :
                                    // componente google
                                    <>
                                        <RegistroGoogle setModalCompletado={setModalCompletado} setModalRegistro={setModalRegistro} history={history} />
                                    </>
                            }
                        </div>
                        :
                        <Row>
                            {
                                desafios.map(desafio => (
                                    <CardsDesafios key={desafio.id} handleClickOpen={handleClickOpen} desafio={desafio} />
                                ))
                            }
                            {
                                modal ?
                                    <FormPostPrice ubicacion={ubicacion} setModal={handleClickClose} modal={modal} referencia={referencia} />
                                    :
                                    null
                            }
                        </Row>
            )
    )
}

export default MisDesafios;


function searchCity(obj) {
    let arr = []
    obj.results[0].address_components.map(el => {
        if (el.types.includes("country") && el.types.includes("political")) {
            return arr[0] = el
        } else if (el.types.includes("administrative_area_level_1") && el.types.includes("political")) {
            return arr[1] = el
        } else if (el.types.includes("administrative_area_level_2") && el.types.includes("political")) {
            return arr[2] = el
        } else if (el.types.includes("locality") && el.types.includes("political")) {
            return arr[3] = el
        }
    })
    return arr;
}