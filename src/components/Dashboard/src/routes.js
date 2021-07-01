import Dashboard from "./views/Dashboard";
import Map from "./views/Map.js";
import TableList from "./views/TableList.js";
import UserProfile from "./views/UserProfile.js";
import Agregar from "./views/Agregar.js";
import Modificar from "./views/Modificar.js";

var routes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "tim-icons icon-chart-pie-36",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/mapa",
  //   name: "Mapa (AÚN NO FUNCA)",
  //   icon: "tim-icons icon-pin",
  //   component: Map,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tablas",
  //   name: "Tablas",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/mi-perfil",
  //   name: "Mi Perfil",
  //   icon: "tim-icons icon-single-02",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  {
    path: "/agregar",
    name: "Agregar",
    icon: "tim-icons icon-pin",
    component: Agregar,
    layout: "/admin",
  },
  {
    path: "/modificar",
    name: "Modificar",
    icon: "tim-icons icon-pin",
    component: Modificar,
    layout: "/admin",
  },
 
];

export var routesCazador = [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: "tim-icons icon-chart-pie-36",
    component: Jumbotron,
    layout: "/cazador",
  },
  
  
  {
    path: "/buscador",
    name: "Buscar",
    icon: "tim-icons icon-single-02",
    component: Buscador,
    layout: "/cazador",

  },
  {
    path: "/monedero",
    name: "Monedero",
    icon: "tim-icons icon-single-02",
    component: Monedero,
    layout: "/cazador",

  },
  {
    path: "/desafios",
    name: "Desafios",
    icon: "tim-icons icon-single-02",
    component: Desafios,
    layout: "/cazador",

  }
 
 
];


