import axios from "axios";



export const GET_CATEGORIAS = "GET_CATEGORIAS";
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
export const GET_DESAFIOS = "GET_DESAFIOS";
export const PRICE = "PRICE";
export const GET_GENEROS = "GET_GENEROS";
export const GET_TIPO_USUARIO = "GET_TIPO_USUARIO";
export const GET_PAISES = "GET_PAISES";
export const GET_CIUDADES = "GET_CIUDADES";

//ESTA ACCION DE DESPACHA AUTOMATICAMENTE APENAS SE LEVANTA LA APLICACION Y TRAE DESDE EL BACK TODAS LAS CATEGORIAS DISPONIBLES
export function getCategorias() {
  return function(dispatch) {
    let api = "http://localhost:3001/categorias";
    return fetch(api)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GET_CATEGORIAS,
          payload: json,
        });
      });
  };
}

//ESTA ACCION DE DESPACHA AUTOMATICAMENTE APENAS SE LEVANTA LA APLICACION Y TRAE DESDE EL BACK TODAS LAS CATEGORIAS DISPONIBLES
export function getPaises() {
  return function(dispatch) {
    let api = "http://localhost:3001/paises";
    return fetch(api)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GET_PAISES,
          payload: json,
        });
      });
  };
}

export function getCiudades(id) {
  return function(dispatch) {
    let api = `http://localhost:3001/ciudades/${id}`;
    return fetch(api)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GET_CIUDADES,
          payload: json,
        });
      });
  };
}

//ACCION QUE SE DESPACHA AL REALIZAR LA BUSQUEDA DE UN PRODUCTO POR SU NOMBRE
export function getProductsByName(nombre) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    // axios.get("http://localhost:3001/productos?name=sal", { headers: { "Authorization": `Bearer ${token}` } })
    axios.get(`http://localhost:3001/productos?name=${nombre}`, { headers: { "Authorization": `Bearer ${token}` } }).then((r) => {
      console.log(r.data);
      dispatch({
        type: GET_PRODUCTOS_NAME,
        payload: r.data,
      });
    });
  };
}

//ACCION QUE SE DESPACHA AL REALIZAR LA BUSQUEDA DE UN PRODUCTO EN EL MENU DESPLEGABLE DE CATEGORIAS DISPONIBLES
export function getSubcategoriasId(id) {     
    const token = localStorage.getItem("token");
    return function(dispatch) {
        axios.get(`http://localhost:3001/subcategoria/${id}`, { headers: { "Authorization": `Bearer ${token}` } }) 
        .then(r => {                                               
            dispatch({ 
                type: GET_SUBCATEGORIAS_ID,
                payload: r.data
                
            });
        });
    }
    
};




//ACCION QUE SE DESPACHA PARA TRAER AL SELECT LOS GENEROS DISPONIBLES
export function getGeneros() {
  return function(dispatch) {
    let api = "http://localhost:3001/generos";
    return fetch(api)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GET_GENEROS,
          payload: json,
        });
      });
  };
}




//ACCION QUE SE DESPACHA PARA TRAER AL SELECT LOS TIPOS DE USUARIOS DISPONIBLES
export function getTipoUsuario() {
  return function(dispatch) {
    let api = "http://localhost:3001/tipousuario";
    return fetch(api)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GET_TIPO_USUARIO,
          payload: json,
        });
      });
  };
}



//ACCION QUE DESPACHA DOS TYPES DIFERENTES: MOSTRAR ERROR Y OCULTAR ERROR LUEGO DE 5 SEGUNDOS.EJEMPLO: SI EL USUARIO NO COMPLETA LOS CAMPOS EN EL FORMULARIO DE
//LOGIN, O COLOCA CONTRASEÑAS DIFERENTES, SE DESPACHA MOSTRAR ERROR Y LUEGO DE 5 SEG DESAPARECE EL MENSAJE.
export function mostrarError(msg, categoria) {
  return function(dispatch) {
    dispatch({
      type: MOSTRAR_ERROR,
      payload: {
        msg,
        categoria,
      },
    });
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ERROR,
      });
    }, 5000);
  };
}


//ESTA FUNCION SE ENCARGA DE CREAR UN NUEVO USUARIO
export function registrarUsuario(datosUser) {     
    return function(dispatch) { 
        axios.post("http://localhost:3001/usuarios/registro", datosUser)
        .then(respuesta => { 
            console.log(respuesta)                                               
            respuesta.data.msg ? (
                dispatch({
                    type: REGISTRO_ERROR,
                    payload: {
                        msg: respuesta.data.msg,
                        categoria: "alerta-error"
                    }
                })
                )
                
                :
                
                (
                dispatch({ 
                    type: REGISTRO_EXITOSO,
                    payload:{
                      token: respuesta.data.token,
                      usuario: respuesta.data.user
                    } 
                    
                    
                })
                )
        }).catch(err => (console.log(err)))
    }
    
}



// Cuando el usuario inicia sesión
export function iniciarSesion(datos){
  return function(dispatch) { 
  axios.post("http://localhost:3001/usuarios/ingreso", datos)
        .then(respuesta => { 
            console.log(respuesta)                  
            respuesta.data.msg ? (
                dispatch({
                    type: LOGIN_ERROR,
                    payload: {
                        msg: respuesta.data.msg,
                        categoria: "alerta-error"
                    }
                })
                )
                
                :
                
                (

                dispatch({ 
                    type: LOGIN_EXITOSO,
                    payload:{
                      token: respuesta.data.token,
                      usuario: respuesta.data.user
                    }
                })
                )
                
        }).catch(err => (console.log(err)))
    }
} 



// Cierra la sesión del usuario
export const cerrarSesion = () => {
  return function(dispatch) { 
  dispatch({
      type: CERRAR_SESION
  })
  

  }
}













////---------------  ADMIN ACTIONS ---------------////
//_____________________ POST _____________________//
export const UNIDAD_MEDIDA_POST = "UNIDAD_MEDIDA_POST";
export const TIPO_USUARIO_POST = "TIPO_USUARIO_POST";
export const GENERO_POST = "GENERO_POST";
export const MONEDA_POST = "MONEDA_POST";
export const CIUDAD_POST = "CIUDAD_POST";
export const PAIS_POST = "PAIS_POST";
export const REGION_POST = "REGION_POST";
export const FAMILIA_POST = "FAMILIA_POST";
export const CATEGORIA_POST = "CATEGORIA_POST";
export const SUBCATEGORIA_POST = "SUBCATEGORIA_POST";
export const TIPO_TRANSACCION_POST = "TIPO_TRANSACCION_POST";
export const TRANSACCION_POST = "TRANSACCION_POST";
export const CLIENTES_POST = "CLIENTES_POST";
export const DESAFIO_POST = "DESAFIO_POST";
export const PRODUCTO_POST = "PRODUCTO_POST";

export function unidadDeMedida(objeto) {
  return function(dispatch) {
    axios.post(`http://localhost:3001/admin/um`, objeto).then((response) => {
      let um = {
        codigo_unidad_medida: response.data.codigo_unidad_medida,
        nombre_unidad: response.data.nombre_unidad,
      };
      dispatch({
        type: UNIDAD_MEDIDA_POST,
        payload: um,
      });
    });
  };
}

export function tipoUsuario(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/tipoUsuario`, objeto)
      .then((response) => {
        let tipo_usuario = {
          tipo_usuario: response.data.tipo_usuario,
        };
        dispatch({
          type: TIPO_USUARIO_POST,
          payload: tipo_usuario,
        });
      });
  };
}




export function generoPost(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/genero`, objeto)
      .then((response) => {
        let genero = {
          genero: response.data.genero,
        };
        dispatch({
          type: GENERO_POST,
          payload: genero,
        });
      });
  };
}





export function monedaPost(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/moneda`, objeto)
      .then((response) => {
        let moneda = {
          codigo_moneda: response.data.codigo_moneda,
          nombre_moneda: response.data.nombre_moneda,
          simbolo: response.data.simbolo,
        };
        dispatch({
          type: MONEDA_POST,
          payload: moneda,
        });
      });
  };
}





export function ciudadPost(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/ciudad`, objeto)
      .then((response) => {
        let ciudad = {
          ciudad: response.data.ciudad,
          paiseCodigoAlfa: response.data.paiseCodigoAlfa,
        };
        dispatch({
          type: CIUDAD_POST,
          payload: ciudad,
        });
      });
  };
}





export function paisPost(objeto) {
  return function(dispatch) {
    axios.post(`http://localhost:3001/admin/pais`, objeto).then((response) => {
      let pais = {
        codigo_alfa: response.data.codigo_alfa,
        nombre_pais: response.data.nombre_pais,
        regioneId: response.data.regioneId,
        monedaCodigoMoneda: response.data.monedaCodigoMoneda,
      };
      dispatch({
        type: PAIS_POST,
        payload: pais,
      });
    });
  };
}






export function regionPost(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/region`, objeto)
      .then((response) => {
        let region = {
          nombre_region: response.data.nombre_region,
        };
        dispatch({
          type: REGION_POST,
          payload: region,
        });
      });
  };
}





export function familiaPost(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/familia`, objeto)
      .then((response) => {
        let familia = {
          nombre_familia: response.data.nombre_familia,
          descripcion: response.data.descripcion, //opcional
        };
        dispatch({
          type: FAMILIA_POST,
          payload: familia,
        });
      });
  };
}






export function categoriaPost(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/categoria`, objeto)
      .then((response) => {
        let categoria = {
          nombre_categoria: response.data.nombre_categoria,
          descripcion: response.data.descripcion, //opcional
          familiumId: response.data.familiumId,
        };
        dispatch({
          type: CATEGORIA_POST,
          payload: categoria,
        });
      });
  };
}






export function subcategoriaPost(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/subcategoria`, objeto)
      .then((response) => {
        let subcategoria = {
          nombre_subcategoria: response.data.nombre_subcategoria,
          descripcion: response.data.descripcion, //opcional
          categoriumId: response.data.categoriumId,
        };
        dispatch({
          type: SUBCATEGORIA_POST,
          payload: subcategoria,
        });
      });
  };
}









export function tipoTransaccionPost(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/tipo_transaccion`, objeto)
      .then((response) => {
        let tipoTransaccion = {
          tipo_transaccion: response.data.tipo_transaccion,
        };
        dispatch({
          type: TIPO_TRANSACCION_POST,
          payload: tipoTransaccion,
        });
      });
  };
}










export function transaccionPost(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/transaccion`, objeto)
      .then((response) => {
        let transaccion = {
          observacion: response.data.observacion,
          puntos: response.data.puntos,
          usuarioId: response.data.usuarioId,
          tipoTransaccionId: response.data.tipoTransaccionId,
        };
        dispatch({
          type: TRANSACCION_POST,
          payload: transaccion,
        });
      });
  };
}












export function clientesPost(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/clientes`, objeto)
      .then((response) => {
        let clientes = {
          razon_social: response.data.razon_social,
          nombre_cial_fantasia: response.data.nombre_cial_fantasia,
          cuit_nit_rut: response.data.cuit_nit_rut,
          email: response.data.email,
          telefono: response.data.telefono,
          direccion_fiscal: response.data.direccion_fiscal,
          metodo_pago: response.data.metodo_pago,
          banco: response.data.banco,
          numero_cuenta: response.data.numero_cuenta,
          password: response.data.password,
          ciudadId: response.data.ciudadId,
          tipoUsuarioId: response.data.tipoUsuarioId,
        };
        dispatch({
          type: CLIENTES_POST,
          payload: clientes,
        });
      });
  };
}

export function desafioPost(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/desafio`, objeto)
      .then((response) => {
        let desafio = {
          nombre_desafio: response.data.nombre_desafio,
          descripcion_desafio: response.data.descripcion_desafio,
          fecha_inicial: response.data.fecha_inicial,
          fecha_final: response.data.fecha_final,
          url_image: response.data.url_image,
          clienteId: response.data.clienteId,
          productoId: response.data.productoId,
        };
        dispatch({
          type: DESAFIO_POST,
          payload: desafio,
        });
      });
  };
}

export function productoPost(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/productos`, objeto)
      .then((response) => {
        let productos = {
          nombre: response.data.nombre,
          contenido_neto: response.data.contenido_neto,
          unidadMedidaCodigoUnidadMedida:
            response.data.unidadMedidaCodigoUnidadMedida,
          subcategoriumId: response.data.subcategoriumId,
        };
        dispatch({
          type: PRODUCTO_POST,
          payload: productos,
        });
      });
  };
}




// 
export function pricePost(objeto) {
  return function(dispatch) {
    axios.post(`http://localhost:3001/precios`, objeto)
    // .then(resp => resp.json())
    .then(json => {
      console.log(json)
      dispatch({
        type: PRICE,
        payload: json
      })
    })
  }
}

//_____________________ GET _____________________//

export const GET_FAMILIA = "GET_FAMILIA";
export const GET_CATEGORIA = "GET_CATEGORIA";
export const GET_SUBCATEGORIAS = "GET_SUBCATEGORIAS";
export const GET_UNIDAD_MEDIDAS = "GET_UNIDAD_MEDIDAS";

export function getFamilia() {
  return function(dispatch) {
    axios.get(`http://localhost:3001/getadmin/familia`).then((response) => {
      dispatch({
        type: GET_FAMILIA,
        payload: response.data,
      });
    });
  };
}

export function getCategoria() {
  return function(dispatch) {
    axios.get(`http://localhost:3001/getadmin/categoria`).then((response) => {
      dispatch({
        type: GET_CATEGORIA,
        payload: response.data,
      });
    });
  };
}

export function getDesafios() {
  return function(dispatch) {
    let api = "http://localhost:3001/detalledesafio";
    return fetch(api)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GET_DESAFIOS,
          payload: json,
        });
      });
  };
}

export function getSubcategoria() {
  return function(dispatch) {
    axios
      .get(`http://localhost:3001/getadmin/subcategoria`)
      .then((response) => {
        dispatch({
          type: GET_SUBCATEGORIAS,
          payload: response.data,
        });
      });
  };
}

export function getUnidadMedida() {
  return function(dispatch) {
    axios.get(`http://localhost:3001/getadmin/um`).then((response) => {
      dispatch({
        type: GET_UNIDAD_MEDIDAS,
        payload: response.data,
      });
    });
  };
}