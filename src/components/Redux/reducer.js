import {
  GET_CATEGORIAS,
  GET_PRODUCTOS_NAME,
  GET_SUBCATEGORIAS_ID,
  MOSTRAR_ERROR,
  OCULTAR_ERROR,
  REGISTRO_EXITOSO,
  LOGIN_EXITOSO,
  UNIDAD_MEDIDA,
  TIPO_USUARIO,
  GENERO,
  MONEDA,
  CIUDAD,
  PAIS,
  REGION,
  FAMILIA,
  CATEGORIA,
  SUBCATEGORIA,
  TIPO_TRANSACCION,
  TRANSACCION,
  CLIENTES,
  DESAFIO,
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
  token: localStorage.getItem("token"),
  autenticado: null,
  usuario: null,
  mensaje: null,
  admin: {},
  //----------------------------------------
  //         PRUEBA PARA POST ADMIN
  obj: {
    // codigo_alfa:"PRU",
    // nombre_pais:"Prueba",
    // regioneId: 3,
    // monedaCodigoMoneda:"EUR"
    // codigo_unidad_medida:"c3f",
    // nombre_unidad: "centimetro cubicoo"
    // tipo_usuario:"prueba"
    // genero:"prueba"
    // codigo_moneda:"EUR",
    // nombre_moneda:"Euro",
    // simbolo:"E"
    // ciudad:"Chicago",
    // paiseCodigoAlfa:"ARG"
    // nombre_region:"Centro America"
    // nombre_familia: "PRU",
    // descripcion: "Prueba"
    // nombre_categoria: "prueba",
    // descripcion: "esta es una prueba"
    // nombre_subcategoria: "prueba",
    // descripcion: "prueba",
    // categoriumId: 1,
    //   tipo_transaccion:"prueba"
    // observacion: "prueba",
    // puntos: 100,
    // usuarioId: 5,
    // tipoTransaccionId: 3,
    // razon_social: "Prueba S.R.L",
    // nombre_cial_fantasia:"Prueba",
    // cuit_nit_rut:"00000000",
    // email:"prueba@mail.com",
    // telefono:"000000000",
    // direccion_fiscal:"prueba 55",
    // metodo_pago:"Ctt Cte",
    // banco:"Macro",
    // numero_cuenta:"0000000",
    // password:"prueba1234",
    // ciudadId: 2,
    // tipoUsuarioId: 1
    // nombre_desafio: "desafio 1",
    // descripcion_desafio: "buscar precios",
    // fecha_inicial: "2021/01/20",
    // fecha_final: "2021/01/20",
    // url_image: "www.prueba.com",
    // clienteId: 1,
    // productoId: 2,
    //--------------------------------
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIAS:
      return {
        ...state,
        categorias: action.payload,
      };
    case GET_PRODUCTOS_NAME:
      console.log(action.payload);
      return {
        ...state,
        productos: action.payload,
      };
    case GET_SUBCATEGORIAS_ID:
      console.log(action.payload);
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
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false,
      };
    case UNIDAD_MEDIDA:
      return {
        ...state,
        admin: action.payload,
      };
    case TIPO_USUARIO:
      return {
        ...state,
        admin: action.payload,
      };
    case GENERO:
      return {
        ...state,
        admin: action.payload,
      };
    case MONEDA:
      return {
        ...state,
        admin: action.payload,
      };
    case CIUDAD:
      return {
        ...state,
        admin: action.payload,
      };
    case PAIS:
      return {
        ...state,
        admin: action.payload,
      };
    case REGION:
      return {
        ...state,
        admin: action.payload,
      };
    case FAMILIA:
      return {
        ...state,
        admin: action.payload,
      };
    case CATEGORIA:
      return {
        ...state,
        admin: action.payload,
      };
    case SUBCATEGORIA:
      return {
        ...state,
        admin: action.payload,
      };
    case TIPO_TRANSACCION:
      return {
        ...state,
        admin: action.payload,
      };
    case TRANSACCION:
      return {
        ...state,
        admin: action.payload,
      };
    case CLIENTES:
      return {
        ...state,
        admin: action.payload,
      };
    case DESAFIO:
      return {
        ...state,
        admin: action.payload,
      };

    default:
      return state;
  }
}
export default rootReducer;
