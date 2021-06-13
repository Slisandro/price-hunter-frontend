import axios from "axios";

export const GET_CATEGORIAS  = "GET_CATEGORIAS";
export const LOADING = "LOADING";
export const GET_PRODUCTOS_NAME = "GET_PRODUCTOS_NAME";
export const GET_SUBCATEGORIAS_ID = "GET_SUBCATEGORIAS_ID"
export const MOSTRAR_ERROR = "MOSTRAR_ERROR"
export const OCULTAR_ERROR = "OCULTAR_ERROR"



//PARA TRAER TODoS Los productos
export function getCategorias() {     
    return function(dispatch) { 
        let api = "http://localhost:3001/categorias";                         
        return fetch(api)  
        .then(response => response.json())                               
        .then(json => {                                                
            dispatch({ 
                type: GET_CATEGORIAS ,
                payload: json 
            });
        });
    
    }
};

export function getProductsByName(nombre) {     
    return function(dispatch) { 
        axios.get(`http://localhost:3001/productos?name=${nombre}`)
        .then(r => {   
            console.log(r.data)                                             
            dispatch({ 
                type: GET_PRODUCTOS_NAME,
                payload: r.data
                
            });
        });
    }
    
};

export function getSubcategoriasId(id) {     
    console.log(id, "ID")
    return function(dispatch) { 
        axios.get(`http://localhost:3001/subcategoria/${id}`)
        .then(r => {   
            console.log(r.data)                                             
            dispatch({ 
                type: GET_SUBCATEGORIAS_ID,
                payload: r.data
                
            });
        });
    }
    
};

export function mostrarError(msg){
    return function (dispatch){
        dispatch({
            type:  MOSTRAR_ERROR,
            payload: msg
            
        }
    )
    setTimeout(() => {
        dispatch({
            type: OCULTAR_ERROR
        })
    }, 5000);
  }
    
}



    

