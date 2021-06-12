import React from "react";
import Tablero from "./components/Tablero Usuario/Tablero";
import HomePage from "./HomePage/HomePage";
import Marcas from "./components/NavBarLinks/Marcas";
import SobreNosotros from "./components/NavBarLinks/SobreNosotros";
import Recompensas from "./components/NavBarLinks/Recompensas";
import Servicios from "./components/NavBarLinks/Servicios";
import Ayuda from "./components/NavBarLinks/Ayuda";
import Login from "./components/Login/Login";
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
        <Route exact path="/Ayuda" component={Ayuda} />
        <Route path="/login" component={Login}/>
        <Route path="/tablero" component={Tablero} />
      </Switch>
    </Router>
  );
}

export default App;
