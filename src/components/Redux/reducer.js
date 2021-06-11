
import {GET_PRODUCTS_NAME} from "./actions"

const initialState = {
  arrayPrueba: [
    
  {id_producto: 1 , nombre_producto: "Arroz" , contenido_neto: 1 ,cod_u_medida: "kg" , id_sub: 42, price: "40"},
  {id_producto: 2 , nombre_producto: "Papa" , contenido_neto: 1 ,cod_u_medida: "kg" , id_sub: 90, price: "90"},
  {id_producto: 3 , nombre_producto: "leche_normal" , contenido_neto: 1 ,cod_u_medida: "lt" , id_sub: 63, price: "10"},
  {id_producto: 4 , nombre_producto: "huevos" , contenido_neto: 30 ,cod_u_medida: "un" , id_sub: 84, price: "70"}

  ],
  loading: false,

};




export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_NAME: {
      return {
        ...state,
        arrayPrueba: state.arrayPrueba
      }
    }
    
      
      break;
  
    default:
      return state;
  }
}
