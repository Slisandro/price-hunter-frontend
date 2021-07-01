/* eslint-disable react/style-prop-object */
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import marker from '../../../assets/marker.png'
import { Card, Col, Row } from 'reactstrap';


const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1Ijoic2xpc2FuZHJvIiwiYSI6ImNrcG15cDJwYjBlbjEydnVlb2x2Njh3cHcifQ.xMq5dXRnJYRU5mrWJP6SpA'
});

function MyMap({ ubicacion, precio }) {
    const coord = [parseFloat(ubicacion.longitud), parseFloat(ubicacion.latitud)]
    return (
        ubicacion.latitud === "" ? <div>Cargando</div> : 
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                center={coord}
                zoom={[15]}
                containerStyle={{
                    height: "30vh",
                    width: "95%",
                    background: "rgba(255, 255, 255, .5)",
                    borderRadius: "1em",
                    margin: "2%",
                    boxShadow: "rgb(255 255 255 / 15%) 0px 5px 15px"
                }}
            >
                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                    <Feature coordinates={[0, 0]} />
                </Layer>
                <Marker
                    style={{
                        width: "30px",
                        height: "30px"
                    }}
                    coordinates={coord}
                >
                    <img
                        src={marker}
                        onClick={() => alert("su ubicacion")}
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                        alt="img"
                    />
                </Marker>
                {
                    precio ? 
                        <Marker
                            style={{
                                width: "30px",
                                height: "30px"
                            }}
                            coordinates={[precio[1], precio[0]]}
                        >
                            <img
                                src={marker}
                                style={{
                                    width: "100%",
                                    height: "100%"
                                }}
                                alt="img"
                            />
                        </Marker>
                    : null 
                }
            </Map >
            
    )
}

export default MyMap;