import React from "react";
import Tablero from "./components/Tablero Usuario/Tablero";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/login" component={Login}/> */}
        <Route path="/tablero" component={Tablero} />
      </Switch>
    </Router>
  );
}

export default App;
