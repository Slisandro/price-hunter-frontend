import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "./src/layouts/Admin/Admin.js";

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
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
        </BrowserRouter>
      </BackgroundColorWrapper>
    </ThemeContextWrapper>
  );
}

export default Dash;
