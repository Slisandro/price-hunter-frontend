import React from "react";
import Tablero from "./components/Tablero Usuario/Tablero";
import HomePage from "./pages/HomePage";
import Marcas from "./components/NavBarLinks/Marcas";
import SobreNosotros from "./components/NavBarLinks/SobreNosotros";
import Contacto from "./components/NavBarLinks/Contacto";
import Servicios from "./components/NavBarLinks/Servicios";
import Ayuda from "./components/NavBarLinks/Ayuda";
import MisDesafios from "./components/desafios/MisDesafios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
        {/* <Route path="/login" component={Login}/> */}
        <Route path="/tablero" component={Tablero} />
        <Route exact path="/misdesafios" component={MisDesafios} />
      </Switch>
    </Router>
  );
}

export default App;
