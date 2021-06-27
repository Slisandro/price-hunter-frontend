import React from "react";
import Tablero from "./components/Cazador/Tablero Usuario/Tablero";
import HomePage from "./HomePage/HomePage";
import Marcas from "./components/NavBarLinks/Marcas";
import SobreNosotros from "./components/NavBarLinks/SobreNosotros";
import Contacto from "./components/NavBarLinks/Contacto";
import Servicios from "./components/NavBarLinks/Servicios";
import Ayuda from "./components/NavBarLinks/Ayuda";
import Login from "./components/Login/Login";
import MisDesafios from "./components/desafios/MisDesafios";
import Configuración from "./components/configuración/Configuración";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registro from "./components/Registro/Registro";

// import TableroEmpresa from './components/TableroEmpresas/TableroEmpresa'
import TableroCLiente from "./components/TableroCliente/index";

import AdminPage from "./components/Admin/AdminPage";
import RutaPrivada from "./RutaPrivada";
import Modal from "./components/Registro/Modal";
import LoginCliente from "./components/TableroCliente/Componentes/LoginCliente/LoginCliente";
import RegistroCliente from "./components/Registro/RegistroCliente";
import Landing from "./HomePage/Landing";
import Dash from "./components/Dashboard/Dash";

function App() {
  return (
    <Router>
      <Switch>
        {/* <RutaPrivada exact path="/admin" component={AdminPage} /> */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/SobreNosotros" component={SobreNosotros} />
        <Route exact path="/Marcas" component={Marcas} />
        <Route exact path="/Contacto" component={Contacto} />
        <Route exact path="/Servicios" component={Servicios} />
        <Route exact path="/Ayuda" component={Ayuda} />
        <Route path="/login" component={Login} />
        <RutaPrivada path="/tablero" component={Tablero} />
        <Route exact path="/misdesafios" component={MisDesafios} />
        <Route exact path="/configuración" component={Configuración} />
        <Route exact path="/registro" component={Registro} />
        <Route exact path="/registro-cliente" component={RegistroCliente} />
        {/* <Route exact path="/login-cliente" component={LoginCliente} /> */}

        {/* <TableroEmpresa/> */}
        <RutaPrivada path="/tablerocliente" component={TableroCLiente} />

        <Route exact path="/terminos-condiciones" component={Modal} />
        <Route exact path="/landing" component={Landing} />
        <RutaPrivada exact path="/admin" component={Dash} />
      </Switch>
    </Router>
  );
}

export default App;
