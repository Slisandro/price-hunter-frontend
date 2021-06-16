
import {GET_CATEGORIAS, GET_PRODUCTOS_NAME, GET_SUBCATEGORIAS_ID, MOSTRAR_ERROR, OCULTAR_ERROR, 
  REGISTRO_EXITOSO, LOGIN_EXITOSO, GET_GENEROS, GET_TIPO_USUARIO, GET_PAISES, GET_CIUDADES, OBTENER_USUARIO, CERRAR_SESION,LOGIN_ERROR,REGISTRO_ERROR
} from "./actions"

const initialState = {
  arrayPrueba: [
    
  {id_producto: 1 , nombre_producto: "Arroz" , contenido_neto: 1 ,cod_u_medida: "kg" , id_sub: 42, price: "40"},
  {id_producto: 2 , nombre_producto: "Papa" , contenido_neto: 1 ,cod_u_medida: "kg" , id_sub: 90, price: "90"},
  {id_producto: 3 , nombre_producto: "leche_normal" , contenido_neto: 1 ,cod_u_medida: "lt" , id_sub: 63, price: "10"},
  {id_producto: 4 , nombre_producto: "huevos" , contenido_neto: 30 ,cod_u_medida: "un" , id_sub: 84, price: "70"}

  ],
  categorias: [],
  loading: false,
  productos: [],
  subcategorias:[],
  alerta: null,
  

  token: localStorage.getItem("token"),
  autenticado: null,
  usuario: null,
  mensaje:null,



  generos: [],
  tipo_usuarios:[],
  paises: [],
  ciudades: []


};




export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIAS: 
      return {
        ...state,
        categorias: action.payload
    }
    case GET_GENEROS: 
    return {
      ...state,
      generos: action.payload
  }
    case GET_TIPO_USUARIO: 
    return {
      ...state,
      tipo_usuarios: action.payload
    }
    case GET_PAISES: 
    return {
      ...state,
      paises: action.payload
    }
    case GET_CIUDADES: 
    return {
      ...state,
      ciudades: action.payload
    }


    case GET_PRODUCTOS_NAME:
      console.log(action.payload)      
      return {
        ...state,        
        productos: action.payload
    }
    case GET_SUBCATEGORIAS_ID:   
      console.log(action.payload) 
      return {
        ...state,        
        productos: action.payload
    }
    case MOSTRAR_ERROR:
      return {
        alerta: action.payload
      }
    case OCULTAR_ERROR:
      return {
        alerta: null
    }

    
    case REGISTRO_EXITOSO:
    case LOGIN_EXITOSO:
      localStorage.setItem('token', action.payload.token);
      return {
          ...state,
          autenticado: true,
          mensaje: null,
          cargando: false
    }

    case OBTENER_USUARIO: 
      return {
          ...state,
          autenticado: true,
          usuario: action.payload, 
          cargando: false
      }

    case CERRAR_SESION:
    case LOGIN_ERROR:
    case REGISTRO_ERROR:
      localStorage.removeItem('token');
      return {
          ...state,
          token: null,
          usuario: null,
          autenticado: null,
          mensaje: action.payload, 
          cargando: false
      }
      
    
  
    default:
      return state;
  }
}
