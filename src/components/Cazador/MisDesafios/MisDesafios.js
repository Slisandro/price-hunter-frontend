import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDesafios } from '../../Redux/actions'
import CardsDesafios from '../CardsDesafios/CardDesafios';
import FormPostPrice from '../FormPostPrice/FormPostPrice';
import './MisDesafios.css'

function MisDesafios() {
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [referencia, setReferencia] = useState({
        idDesafio: ""
    })
    const dispatch = useDispatch();
    const desafios = useSelector(store => store.desafios)

    useEffect(() => {
        dispatch(getDesafios())
        setLoading(false)
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
        loading ?
            <div className="containerMessageBack">Cargando desafíos...</div>
            :
            <>
                <div className="cardsContainer">
                    {
                        desafios.map(desafio => {
                            return (
                                <CardsDesafios key={desafio.id} handleClickOpen={handleClickOpen} desafio={desafio} />
                            )
                        })
                    }
                </div>
                {
                    modal
                        ?
                        <FormPostPrice setModal={handleClickClose} modal={modal} referencia={referencia} />
                        : null
                }
            </>
    )
}

export default MisDesafios;


