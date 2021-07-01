import React from "react";
import "./index.css"
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";
import Header from "./Componentes/header/header";
import MainSidebar from "./Componentes/mainsidebar/mainsidebar"
import CrearDesafio from "./Componentes/creardesafio/creardesafio";
import MisDesafios from "./Componentes/misdesafios/misdesafios";
import Estadisticas from "./Componentes/estadisticas/estadisticas";
import MisDatos from "./Componentes/misdatos/misdatos";


function TableroCLiente(props) {
  let {url} = useRouteMatch()
  // console.log(url)
  return (
     
      <div id="contenedor-tablero-cliente">
        <Route path={url} component={Header}/>
        <Route exact path={`${url}/principal`} component={MainSidebar}/>
        <Route exact path={`${url}/creardesafio`} component={CrearDesafio}/>
        <Route exact path={`${url}/misdesafios`} component={MisDesafios}/>
        <Route exact path={`${url}/estadisticas`} component={Estadisticas}/>
        <Route exact path={`${url}/misdatos`} component={MisDatos}/>
      </div>
    
  );
}

export default TableroCLiente;