import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import marker from '../../../assets/marker.png'

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1Ijoic2xpc2FuZHJvIiwiYSI6ImNrcG15cDJwYjBlbjEydnVlb2x2Njh3cHcifQ.xMq5dXRnJYRU5mrWJP6SpA'
});

function MyMap({ ubicacion }) {
    const coord = [parseFloat(ubicacion.longitud), parseFloat(ubicacion.latitud)]
    return (
        ubicacion.latitud === "" ? <div>Cargando</div> :
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                center={coord}
                zoom={[15]}
                containerStyle={{
                    height: "30vh",
                    width: "35%",
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
                        width: "40px",
                        height: "40px"
                    }}
                    coordinates={coord}
                >
                    <img
                        src={marker}
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                    />
                </Marker>
            </Map >
    )
}

export default MyMap;