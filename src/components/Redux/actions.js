import axios from "axios";

export const GET_CATEGORIAS  = "GET_CATEGORIAS";
export const LOADING = "LOADING";
export const GET_PRODUCTOS_NAME = "GET_PRODUCTOS_NAME";
export const GET_SUBCATEGORIAS_ID = "GET_SUBCATEGORIAS_ID";
export const MOSTRAR_ERROR = "MOSTRAR_ERROR";
export const OCULTAR_ERROR = "OCULTAR_ERROR";

export const REGISTRO_EXITOSO = "REGISTRO_EXITOSO";
export const REGISTRO_ERROR = "REGISTRO_ERROR";
export const OBTENER_USUARIO = "OBTENER_USUARIO";
export const LOGIN_EXITOSO = "LOGIN_EXITOSO";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const CERRAR_SESION = "CERRAR_SESION";




//ESTA ACCION DE DESPACHA AUTOMATICAMENTE APENAS SE LEVANTA LA APLICACION Y TRAE DESDE EL BACK TODAS LAS CATEGORIAS DISPONIBLES
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



//ACCION QUE SE DESPACHA AL REALIZAR LA BUSQUEDA DE UN PRODUCTO POR SU NOMBRE
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



//ACCION QUE SE DESPACHA AL REALIZAR LA BUSQUEDA DE UN PRODUCTO EN EL MENU DESPLEGABLE DE CATEGORIAS DISPONIBLES
export function getSubcategoriasId(id) {     
    // console.log(id, "ID")
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



//ACCION QUE DESPACHA DOS TYPES DIFERENTES: MOSTRAR ERROR Y OCULTAR ERROR LUEGO DE 5 SEGUNDOS.EJEMPLO: SI EL USUARIO NO COMPLETA LOS CAMPOS EN EL FORMULARIO DE 
//LOGIN, O COLOCA CONTRASEÑAS DIFERENTES, SE DESPACHA MOSTRAR ERROR Y LUEGO DE 5 SEG DESAPARECE EL MENSAJE.
export function mostrarError(msg,categoria){
    return function (dispatch){
        dispatch({
            type:  MOSTRAR_ERROR,
            payload: {
                msg, 
                categoria
            }
            
        }
    )
    setTimeout(() => {
        dispatch({
            type: OCULTAR_ERROR
        })
    }, 5000);
  }
    
}





//ESTA FUNCION SE ENCARGA DE CREAR UN NUEVO USUARIO
export const registrarUsuario = async datosUser => {
    try {

        const respuesta = await axios.post('http://localhost:3001/usuarios/registro', datosUser);
        console.log(respuesta.data)
        return function (dispatch){
        dispatch({
            type: REGISTRO_EXITOSO,
            payload: respuesta.data
        });
        }

        // Obtener el usuario
        // usuarioAutenticado();
    
    } catch (error) {
        
        console.log(error.response);
        const alerta = {
            msg: error.response.data.msg,
            categoria: 'alerta-error'
        }
        return function (dispatch){
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
    }
}







  // Retorna el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token');
    if(token) {
        // tokenAuth(token);
    }

    try {
        const respuesta = await axios.get('http://localhost:3001/usuarios/registro');
        // console.log(respuesta);
        return function (dispatch){
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
            }
       

    } catch (error) {
        console.log(error.response);
        return function (dispatch){
            dispatch({
                type: LOGIN_ERROR,
                
            });
            }
    
    }
}




