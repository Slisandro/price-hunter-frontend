import React, { useState, useEffect } from 'react';
import Main from '../main/Main';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import "./Tablero.css";
import Aside from "../aside/Aside";
var geolocation = require('geolocation');


function Tablero() {
  const [state, setState] = useState("Panel")
  const [sidebarOpen, setSidebar] = useState(false);
  const [ubicacion, setUbicacion] = useState({
    latitud: "",
    longitud: "",
    dis: 0
  })

  const openSidebar = () => {
    setSidebar(true);
  }

  const closeSidebar = () => {
    setSidebar(false);
  }

  useEffect(() => {
    geolocation.getCurrentPosition((err, position) => {
      return setUbicacion({
        ...ubicacion,
        longitud: position.coords.longitude + "",
        latitud: position.coords.latitude + "",
      })
    })
  }, [])

  return (
    <div className="contenedor">

      <Navbar setState={setState} sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <Main setUbicacion={setUbicacion} state={state} setState={setState} ubicacion={ubicacion} />
      <Sidebar state={state} sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} setState={setState} />
      {/* <Aside /> */}

    </div>


  );
}

export default Tablero;



