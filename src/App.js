import React from "react";
import Tablero from "./components/Tablero Usuario/Tablero";
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

function App() {
  return (
    <Router> 
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/SobreNosotros" component={SobreNosotros} />
        <Route exact path="/Marcas" component={Marcas} />
        <Route exact path="/Contacto" component={Contacto} />
        <Route exact path="/Servicios" component={Servicios} />
        <Route exact path="/Ayuda" component={Ayuda} />
        <Route path="/login" component={Login} />
        <Route path="/tablero" component={Tablero} />
        {/* <Route exact path="/misdesafios" component={MisDesafios} /> */}
        <Route exact path="/configuración" component={Configuración} />
        <Route exact path="/registro" component={Registro} />
        {/* <TableroEmpresa/> */}
      </Switch>
    </Router>
  );
}

export default App;
