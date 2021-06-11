
import React from "react";
import Tablero from "./components/Tablero Usuario/Tablero";
import HomePage from "./pages/HomePage";
import Marcas from "./components/NavBarLinks/Marcas";
import SobreNosotros from "./components/NavBarLinks/SobreNosotros";
import Recompensas from "./components/NavBarLinks/Recompensas";
import Servicios from "./components/NavBarLinks/Servicios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/SobreNosotros" component={SobreNosotros} />
        <Route exact path="/Marcas" component={Marcas} />
        <Route exact path="/Recompensas" component={Recompensas} />
        <Route exact path="/Servicios" component={Servicios} />
        {/* <Route path="/login" component={Login}/> */}
        <Route path="/tablero" component={Tablero} />
      </Switch>
    </Router>
  );
}

export default App;
