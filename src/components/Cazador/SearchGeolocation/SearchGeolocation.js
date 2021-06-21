import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
// import { useDispatch } from "react-redux";
// import { getProductsByName } from '../../Redux/actions'
// var geolocation = require('geolocation');

export default function SearchGeolocation(props) {
    // const dispatch = useDispatch()
    // const [loading, setLoading] = useState(true)
    // const [ubicacion, setUbicacion] = useState({
    //     lat: "",
    //     long: "",
    //     dis: 1000000
    // })

    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //         return setUbicacion({
    //             longitud: position.coords.longitude + "",
    //             latitud: position.coords.latitude + "",
    //         })
    //     })
    //     console.log(ubicacion)
    //     dispatch(getProductsByName(props.name, ubicacion))
    //     props.setName("");
    //     setLoading(false);
    // }, [])


    return (
        // loading
        //     ? <div>Cargando...</div>
        //     :
        //     (
        //     <MapContainer center={[ubicacion.latitud, ubicacion.longitud]} zoom={13} scrollWheelZoom={true}>
        //         <TileLayer
        //             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //         />
        //         <Marker
        //             position={[ubicacion.latitud, ubicacion.longitud]}
        //             pathOptions={{ color: 'red' }}
        //         >
        //             <Popup>
        //                 A pretty CSS3 popup. <br /> Easily customizable.
        //             </Popup>
        //         </Marker>
        //         <Marker position={[51.500, -0.01]}>
        //             <Popup>
        //                 A pretty CSS3 popup. <br /> Easily customizable.
        //             </Popup>
        //         </Marker>
        //     </MapContainer>
        // )
        <div></div>
    )
}

// npm i react-leaflet
// npm i leaflet

// "browserslist": [
//     ">0.2%",
//     "not dead",
//     "not op_mini all"
// ]