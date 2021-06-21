import React, { useState, useEffect } from 'react';
import Main from '../main/Main';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import "./Tablero.css";
import Aside from "../aside/Aside";
var geolocation = require('geolocation');


function Tablero() {
  const [state, setState] = useState("")
  const [sidebarOpen, setSidebar] = useState(false);
  const [ubicacion, setUbicacion] = useState({
    latitud: "",
    longitud: ""
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
        longitud: position.coords.longitude + "",
        latitud: position.coords.latitude + "",
      })
    })
  }, [])

  return (
    <div className="contenedor">

      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <Main state={state} setState={setState} ubicacion={ubicacion} />
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} setState={setState} />
      <Aside />

    </div>


  );
}

export default Tablero;



