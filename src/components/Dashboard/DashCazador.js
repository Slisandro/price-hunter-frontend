import React from "react";
// import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Cazador from "./src/layouts/Admin/Cazador";


import "./src/assets/scss/black-dashboard-react.scss";
import "./src/assets/demo/demo.css";
import "./src/assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./src/components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./src/components/BackgroundColorWrapper/BackgroundColorWrapper";

function Dash() {
  return (
    <ThemeContextWrapper>
      <BackgroundColorWrapper>
        <BrowserRouter>
          <Switch>
            <Route
              path="/cazador" render={(props) => <Cazador {...props} />}

            />
          
            <Redirect from="/cazador" to="/cazador/dashboard" />
          </Switch>
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  );
}

export default Dash;
