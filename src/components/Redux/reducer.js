import {
  GET_CATEGORIAS,
  GET_PRODUCTOS_NAME,
  GET_SUBCATEGORIAS_ID,
  MOSTRAR_ERROR,
  OCULTAR_ERROR,
  REGISTRO_EXITOSO,
  LOGIN_EXITOSO,
  UNIDAD_MEDIDA_POST,
  TIPO_USUARIO_POST,
  GENERO_POST,
  MONEDA_POST,
  CIUDAD_POST,
  PAIS_POST,
  REGION_POST,
  FAMILIA_POST,
  CATEGORIA_POST,
  SUBCATEGORIA_POST,
  TIPO_TRANSACCION_POST,
  TRANSACCION_POST,
  CLIENTES_POST,
  DESAFIO_POST,
  PRODUCTO_POST,
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
  // OBTENER_USUARIO,
  CERRAR_SESION,
  LOGIN_ERROR,
  REGISTRO_ERROR,
  GET_DESAFIOS,
  PRICE,
  GET_SUBCATEGORIAS,
  GET_UNIDAD_MEDIDAS,
  // GET_GENEROS,
  // GET_TIPO_USUARIO,
  // GET_PAISES,
  // GET_CIUDADES,
  // OBTENER_USUARIO,
  // CERRAR_SESION,
  // LOGIN_ERROR,
  // REGISTRO_ERROR,
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
  token: localStorage.getItem("token"),
  autenticado: null,
  usuario: null,
  mensaje: null,
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

  desafios: [],
  subcategoria: [],
  unidad_medida: [],
  pais: [],
  region: [],
  moneda: [],
  transaccion: [],

  //-------------ADMIN-------------//
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
        alerta: action.payload,
      };
    case OCULTAR_ERROR:
      return {
        alerta: null,
      };

    case REGISTRO_EXITOSO:
    case LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("nombre", action.payload.usuario.nombre);

      return {
        ...state,
        autenticado: true,
        usuario: null,
        mensaje: null,
      };
    case CERRAR_SESION:
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      localStorage.removeItem("token");
      localStorage.removeItem("nombre");
      return {
        ...state,
        token: null,
        usuario: null,
        autenticado: null,
        mensaje: action.payload,
      };
    case UNIDAD_MEDIDA_POST:
      return {
        ...state,
        admin: action.payload,
      };
    case TIPO_USUARIO_POST:
      return {
        ...state,
        admin: action.payload,
      };
    case GENERO_POST:
      return {
        ...state,
        admin: action.payload,
      };
    case MONEDA_POST:
      return {
        ...state,
        admin: action.payload,
      };
    case CIUDAD_POST:
      return {
        ...state,
        admin: action.payload,
      };
    case PAIS_POST:
      return {
        ...state,
        admin: action.payload,
      };
    case REGION_POST:
      return {
        ...state,
        admin: action.payload,
      };
    case FAMILIA_POST:
      return {
        ...state,
        admin: action.payload,
      };
    case CATEGORIA_POST:
      return {
        ...state,
        admin: action.payload,
      };
    case SUBCATEGORIA_POST:
      return {
        ...state,
        admin: action.payload,
      };
    case TIPO_TRANSACCION_POST:
      return {
        ...state,
        admin: action.payload,
      };
    case TRANSACCION_POST:
      return {
        ...state,
        admin: action.payload,
      };
    case CLIENTES_POST:
      return {
        ...state,
        admin: action.payload,
      };
    case DESAFIO_POST:
      return {
        ...state,
        admin: action.payload,
      };
    case PRODUCTO_POST:
      return {
        ...state,
        admin: action.payload,
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

    //-------------ADMIN-------------//
    default:
      return state;
  }
}
export default rootReducer;
