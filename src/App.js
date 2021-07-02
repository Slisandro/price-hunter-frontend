import React from "react";
import Tablero from "./components/Cazador/Tablero Usuario/Tablero";
// import Marcas from "./components/NavBarLinks/Marcas";
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
import Landing from "./HomePage/Landing/Landing";
import Dash from "./components/Dashboard/Dash";
import RegistroGoogle from "./components/Registro Google/RegistroGoogle";
import DashCazador from "./components/Dashboard/DashCazador";
import DashCliente from "./components/Dashboard/DashCliente";

function App() {
  return (
    <Router>
      <Switch>
        {/* <RutaPrivada exact path="/admin" component={AdminPage} /> */}
        <Route exact path="/" component={Landing} />
        <Route exact path="/SobreNosotros" component={SobreNosotros} />
        {/* <Route exact path="/Marcas" component={Marcas} /> */}
        <Route exact path="/Contacto" component={Contacto} />
        <Route exact path="/Servicios" component={Servicios} />
        <Route exact path="/Ayuda" component={Ayuda} />
        <Route path="/login" component={Login} />
        <RutaPrivada path="/tablero" component={Tablero} />
        <Route exact path="/misdesafios" component={MisDesafios} />
        <Route exact path="/configuración" component={Configuración} />
        <Route exact path="/registro" component={Registro} />
        <Route exact path="/registro-cliente" component={RegistroCliente} />
        <Route exact path="/registro-google" component={RegistroGoogle} />

        {/* <Route exact path="/login-cliente" component={LoginCliente} /> */}

        {/* <TableroEmpresa/> */}
        <RutaPrivada path="/tablerocliente" component={TableroCLiente} />

        <Route exact path="/terminos-condiciones" component={Modal} />
        <Route exact path="/landing" component={Landing} />
        <RutaPrivada path="/admin" component={Dash} />
        <RutaPrivada path="/cazador" component={DashCazador} />
        <RutaPrivada path="/cliente" component={DashCliente} />

      </Switch>
    </Router>
  );
}

export default App;
