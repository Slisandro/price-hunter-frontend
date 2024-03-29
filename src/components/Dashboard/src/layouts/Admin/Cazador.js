import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";

// import Footer from "components/Footer/Footer.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FixedPlugin from "../../components/FixedPlugin/FixedPlugin.js";

import {routesCazador} from "../../routes";

import logo from "../../assets/img/react-logo.png";
import { BackgroundColorContext } from "../../contexts/BackgroundColorContext";

var ps;

function Admin(props) {
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/cazador") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routesCazador.length; i++) {
      if (location.pathname.indexOf(routesCazador[i].layout + routesCazador[i].path) !== -1) {
        return routesCazador[i].name;
      }
    }
    return "Brand";
  };




  return (
    <BackgroundColorContext.Consumer>
    {({ color, changeColor }) => (
      <React.Fragment>
        <div className="wrapper">
          <Sidebar
            routes={routesCazador}
            logo={{
              outterLink: "https://github.com/Slisandro/price-hunter-frontend",
              text: "Price Hunter",
              imgSrc: logo,
            }}
            toggleSidebar={toggleSidebar}
          />
          <div className="main-panel" ref={mainPanelRef} data={color}>
            <AdminNavbar
              brandText={getBrandText(location.pathname)}
              toggleSidebar={toggleSidebar}
              sidebarOpened={sidebarOpened}
            />
              <Switch>
                {getRoutes(routesCazador)}
                <Redirect from="*" to="/cazador/dashboard" />
              </Switch>
            
          </div>
        </div>
        <FixedPlugin bgColor={color} handleBgClick={changeColor} />
      </React.Fragment>
    )}
  </BackgroundColorContext.Consumer>
  );
}

export default Admin;