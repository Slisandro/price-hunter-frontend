import Dashboard from "./views/Dashboard";
import Map from "./views/Map.js";
import TableList from "./views/TableList.js";
import UserProfile from "./views/UserProfile.js";
import Forms from "./views/Forms.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admins",
  },
  {
    path: "/mapa",
    name: "Mapa",
    icon: "tim-icons icon-pin",
    component: Map,
    layout: "/admins",
  },
  {
    path: "/tablas",
    name: "Tablas",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admins",
  },
  {
    path: "/mi-perfil",
    name: "Mi Perfil",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admins",
  },
  {
    path: "/forms",
    name: "Mis Forms",
    icon: "tim-icons icon-single-02",
    component: Forms,
    layout: "/admins",
  },
];
export default routes;
