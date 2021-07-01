import {
  GET_CATEGORIAS,
  GET_PRODUCTOS_NAME,
  GET_SUBCATEGORIAS_ID,
  MOSTRAR_ERROR,
  OCULTAR_ERROR,
  REGISTRO_EXITOSO,
  LOGIN_EXITOSO,
  GET_FAMILIA,
  GET_CATEGORIA,
  GET_GENEROS,
  GET_TIPO_USUARIO,
  GET_PAISES,
  GET_CIUDADES,
  GET_REGION,
  GET_PAIS,
  GET_MONEDA,
  GET_TIPO_TRANSACCION,
  GET_PRODUCTOS,
  // OBTENER_USUARIO,
  CERRAR_SESION,
  LOGIN_ERROR,
  REGISTRO_ERROR,
  GET_DESAFIOS,
  PRICE,
  GET_SUBCATEGORIAS,
  GET_UNIDAD_MEDIDAS,
  GET_CIUDAD,
  GET_CATEGORIA_POR_ID,
  GET_SUBCATEGORIA_POR_ID,
  GET_PAISES_ID,
  GET_CIUDADES_ID,
  GET_GENERO,
  REGISTRO_GOOGLE_OK,
  REGISTRO_GOOGLE_ERR,
  POST_UM,
} from "./actions";

const initialState = {
  arrayPrueba: [
    {
      id_producto: 1,
      nombre_producto: "Arroz",
      contenido_neto: 1,
      cod_u_medida: "kg",
      id_sub: 42,
      price: "40",
    },
    {
      id_producto: 2,
      nombre_producto: "Papa",
      contenido_neto: 1,
      cod_u_medida: "kg",
      id_sub: 90,
      price: "90",
    },
    {
      id_producto: 3,
      nombre_producto: "leche_normal",
      contenido_neto: 1,
      cod_u_medida: "lt",
      id_sub: 63,
      price: "10",
    },
    {
      id_producto: 4,
      nombre_producto: "huevos",
      contenido_neto: 30,
      cod_u_medida: "un",
      id_sub: 84,
      price: "70",
    },
  ],
  categorias: [],
  loading: false,
  productos: [],
  subcategorias: [],
  alerta: null,

  /*Estados para la autenticacion*/
  token: localStorage.getItem("token"), //---------------------------------------------------------------------
  autenticado: localStorage.getItem("auth"),
  usuario: null,
  mensaje: null,
  cliente: false,
  isAdmin: false,
  expires: true,
  /******************************* */

  generos: [],
  tipo_usuarios: [],
  paises: [],
  ciudades: [],
  //----------------------------------------
  //        POST ADMIN
  admin: {},
  familia: [],
  categoria: [],
  ciudad: [],
  desafios: [],
  subcategoria: [],
  unidad_medida: [],
  pais: [],
  region: [],
  moneda: [],
  transaccion: [],
  paisesId: [],
  ciudadesId: [],
  
  //--------------------------//
  registroGoogleRes: {},
};

//-------------ADMIN-------------//
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIAS:
      return {
        ...state,
        categorias: action.payload,
      };
    case GET_GENEROS:
      return {
        ...state,
        generos: action.payload,
      };
    case GET_TIPO_USUARIO:
      return {
        ...state,
        tipo_usuarios: action.payload,
      };
    case GET_PAISES:
      return {
        ...state,
        paises: action.payload,
      };
    case GET_CIUDADES:
      return {
        ...state,
        ciudades: action.payload,
      };

    case GET_PRODUCTOS_NAME:
      return {
        ...state,
        productos: action.payload,
      };
    case GET_SUBCATEGORIAS_ID:
      return {
        ...state,
        productos: action.payload,
      };
    case MOSTRAR_ERROR:
      return {
        ...state,
        alerta: action.payload,
      };
    case OCULTAR_ERROR:
      return {
        ...state,
        alerta: null,
      };

    case REGISTRO_EXITOSO:
    case LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem(
        "nombre",
        action.payload.usuario
          ? action.payload.usuario.nombre
          : action.payload.cliente
          ? action.payload.cliente.nombre_cial_fantasia
          : action.payload.admin.nombre
      );
      localStorage.setItem("auth", true);
      if (action.payload.cliente) {
        return {
          ...state,
          autenticado: true,
          usuario: null,
          mensaje: null,
          isAdmin: false,
          cliente: true,
        };
      } else {
        if (action.payload.admin) {
          return {
            ...state,
            autenticado: true,
            usuario: null,
            mensaje: null,
            cliente: false,
            isAdmin: true,
            expires: true,
          };
        } else {
          return {
            ...state,
            autenticado: true,
            usuario: null,
            mensaje: null,
            isAdmin: false,
            cliente: false,
          };
        }
      }

    case REGISTRO_GOOGLE_OK:
      return {
        ...state,
        registroGoogleRes: action.payload,
      };
    case REGISTRO_GOOGLE_ERR:
      return {
        ...state,
        registroGoogleRes: action.payload,
      };
    case CERRAR_SESION:
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      localStorage.removeItem("token");
      localStorage.removeItem("nombre");
      localStorage.removeItem("auth");
      return {
        ...state,
        autenticado: false,
        token: null,
        usuario: null,
        mensaje: action.payload,
        expires: false,
      };

    case GET_FAMILIA:
      return {
        ...state,
        familia: action.payload,
      };
    case GET_CATEGORIA:
      return {
        ...state,
        categoria: action.payload,
      };
    case GET_DESAFIOS:
      return {
        ...state,
        desafios: action.payload,
      };
    case PRICE:
      console.log("red");
      return;
    case GET_SUBCATEGORIAS:
      return {
        ...state,
        subcategoria: action.payload,
      };
    case GET_UNIDAD_MEDIDAS:
      return {
        ...state,
        unidad_medida: action.payload,
      };
    case GET_REGION:
      return {
        ...state,
        region: action.payload,
      };
    case GET_PAIS:
      return {
        ...state,
        pais: action.payload,
      };
    case GET_CIUDAD:
      return {
        ...state,
        ciudad: action.payload,
      };
    case GET_MONEDA:
      return {
        ...state,
        moneda: action.payload,
      };
    case GET_TIPO_TRANSACCION:
      return {
        ...state,
        transaccion: action.payload,
      };
    case GET_PRODUCTOS:
      return {
        ...state,
        productos: action.payload,
      };
    case GET_CATEGORIA_POR_ID:
      return {
        ...state,
        categorias: action.payload,
      };
    case GET_SUBCATEGORIA_POR_ID:
      return {
        ...state,
        subcategoria: action.payload,
      };
    case GET_PAISES_ID:
      return {
        ...state,
        paisesId: action.payload,
      };
    case GET_CIUDADES_ID:
      return {
        ...state,
        ciudadesId: action.payload,
      };
    case GET_GENERO:
      return {
        ...state,
        generos: action.payload,
      };
      case POST_UM:
      return {
        ...state,
        expires: action.payload
      }

    default:
      return state;
  }
}
export default rootReducer;
