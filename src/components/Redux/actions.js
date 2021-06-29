import axios from "axios";

// ----------------------------------------------------------------------- //

export const URL = "http://localhost:3001/";
// export const URL = "https://price-hunter-api.herokuapp.com/";

//importar import {URL} from "../actions"("mas o menos la ruta ")

// ----------------------------------------------------------------------- //

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
export const GET_TIPO_TRANSACCION = "GET_TIPO_TRANSACCION";

//ESTA ACCION DE DESPACHA AUTOMATICAMENTE APENAS SE LEVANTA LA APLICACION Y TRAE DESDE EL BACK TODAS LAS CATEGORIAS DISPONIBLES
export function getCategorias() {
  return function (dispatch) {
    let api = `${URL}categorias`;
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
  return function (dispatch) {
    let api = `${URL}paises`;
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
  return function (dispatch) {
    let api = `${URL}ciudades/${id}`;
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

export function getProductsByName(nombre, body) {
  return function (dispatch) {
    const token = localStorage.getItem("token");
    // axios.get("http://localhost:3001/productos?name=sal", { headers: { "Authorization": `Bearer ${token}` } })
    axios({
      method: "get",
      url: `${URL}productos?name=${nombre}&long=${body.longitud}&lat=${body.latitud}&dis=${body.dis}`,
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => {
      dispatch({
        type: GET_PRODUCTOS_NAME,
        payload: r.data,
      });
    });
  };
}

//ACCION QUE SE DESPACHA AL REALIZAR LA BUSQUEDA DE UN PRODUCTO EN EL MENU DESPLEGABLE DE CATEGORIAS DISPONIBLES
export function getSubcategoriasId(id, obj) {
  const token = localStorage.getItem("token");

  return function (dispatch) {
    axios
      .get(`${URL}subcategoria?id=${id}&long=${obj.longitud}&lat=${obj.latitud}&dis=${obj.dis}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((r) => {
        dispatch({
          type: GET_SUBCATEGORIAS_ID,
          payload: r.data,
        });
      });
  };
}

//   return function(dispatch) {
//     axios
//       .get(`http://localhost:3001/subcategoria/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((r) => {
//         dispatch({
//           type: GET_SUBCATEGORIAS_ID,
//           payload: r.data,
//         });
//       });
//   };
// }

//ACCION QUE SE DESPACHA PARA TRAER AL SELECT LOS GENEROS DISPONIBLES
export function getGeneros() {
  return function (dispatch) {
    let api = `${URL}generos`;
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
  return function (dispatch) {
    let api = `${URL}tipousuario`;
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
  return function (dispatch) {
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
  return function (dispatch) {
    axios
      .post(`${URL}usuarios/registro`, datosUser)
      .then((respuesta) => {
        console.log(respuesta);
        respuesta.data.msg
          ? dispatch({
            type: REGISTRO_ERROR,
            payload: {
              msg: respuesta.data.msg,
              categoria: "alerta-error",
            },
          })
          : dispatch({
            type: REGISTRO_EXITOSO,
            payload: {
              token: respuesta.data.token,
              usuario: respuesta.data.user,
            },
          });
      })
      .catch((err) =>
        dispatch({
          type: REGISTRO_ERROR,
          payload: {
            msg: err.response.data.msg,
            categoria: "alerta-error",
          },
        })
      );
  };

  // return function(dispatch) {
  //   axios
  //     .post("http://localhost:3001/usuarios/registro", datosUser)
  //     .then((respuesta) => {
  //       console.log(respuesta);
  //       respuesta.data.msg
  //         ? dispatch({
  //             type: REGISTRO_ERROR,
  //             payload: {
  //               msg: respuesta.data.msg,
  //               categoria: "alerta-error",
  //             },
  //           })
  //         : dispatch({
  //             type: REGISTRO_EXITOSO,
  //             payload: {
  //               token: respuesta.data.token,
  //               usuario: respuesta.data.user,
  //             },
  //           });
  //     })
  //     .catch((err) => console.log(err));
  // };
}

// Cuando el usuario inicia sesión
export function iniciarSesion(datos) {
  return function (dispatch) {
    axios
      .post(`${URL}ingreso`, datos)
      .then((respuesta) => {
        console.log(respuesta);

        respuesta.data.msg
          ? dispatch({
            type: LOGIN_ERROR,
            payload: {
              msg: respuesta.data.msg,
              categoria: "alerta-error",
            },
          })
          : console.log(respuesta.data.user);
        respuesta.data.user
          ? dispatch({
            type: LOGIN_EXITOSO,
            payload: {
              token: respuesta.data.token,
              usuario: respuesta.data.user,
            },
          })
          : respuesta.data.admin
            ? dispatch({
              type: LOGIN_EXITOSO,
              payload: {
                token: respuesta.data.token,
                admin: respuesta.data.admin,
              },
            })
            : dispatch({
              type: LOGIN_EXITOSO,
              payload: {
                token: respuesta.data.token,
                cliente: respuesta.data.cliente,
              },
            });
      })
      .catch((err) =>
        dispatch({
          type: LOGIN_ERROR,
          payload: {
            msg: err.response.data.msg,
            categoria: "alerta-error",
          },
        })
      );
  };
}

// Cierra la sesión del usuario
export const cerrarSesion = () => {
  return function (dispatch) {
    dispatch({
      type: CERRAR_SESION,
    });
  };
};

//   return function(dispatch) {
//     axios
//       .post("http://localhost:3001/usuarios/ingreso", datos)
//       .then((respuesta) => {
//         console.log(respuesta);
//         respuesta.data.msg
//           ? dispatch({
//               type: LOGIN_ERROR,
//               payload: {
//                 msg: respuesta.data.msg,
//                 categoria: "alerta-error",
//               },
//             })
//           : dispatch({
//               type: LOGIN_EXITOSO,
//               payload: {
//                 token: respuesta.data.token,
//                 usuario: respuesta.data.user,
//               },
//             });
//       })
//       .catch((err) => console.log(err));
//   };
// }

// // Cierra la sesión del usuario
// export const cerrarSesion = () => {
//   return function(dispatch) {
//     dispatch({
//       type: CERRAR_SESION,
//     });
//   };
// };

// // Retorna el usuario autenticado
// export const usuarioAutenticado = async () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     // tokenAuth(token);
//   }
// };


//
export function pricePost(objeto) {
  return function (dispatch) {
    axios
      .post(`${URL}precios`, objeto)
      // .then(resp => resp.json())
      .then((json) => {
        // console.log(json);
        dispatch({
          type: PRICE,
          payload: json,
        });
      });
  };
}

export function getTipoTransaccion() {
  return function(dispatch) {
    axios.get(`${URL}tipotransacciones`).then((response) => {
      dispatch({
        type: GET_TIPO_TRANSACCION,
        payload: response.data,
      });
    });
  };
}

export function iniciarSesionCliente(datos) {
  return function(dispatch) {
    axios
      .post(`${URL}clientes/ingreso`, datos)
      .then((respuesta) => {
        // console.log(respuesta);
        respuesta.data.msg
          ? dispatch({
              type: LOGIN_ERROR,
              payload: {
                msg: respuesta.data.msg,
                categoria: "alerta-error",
              },
            })
          : dispatch({
              type: LOGIN_EXITOSO,
              payload: {
                token: respuesta.data.token,
                usuario: respuesta.data.cliente,
              },
            });
      })
      .catch((err) => console.log(err));
  };
}

//ESTA FUNCION SE ENCARGA DE CREAR UN NUEVO cliente
export function registrarCliente(datosCliente) {
  return function(dispatch) {
    axios
      .post(`${URL}clientes/registro`, datosCliente)
      .then((respuesta) => {
        console.log(respuesta);
        respuesta.data.msg
          ? dispatch({
              type: REGISTRO_ERROR,
              payload: {
                msg: respuesta.data.msg,
                categoria: "alerta-error",
              },
            })
          : dispatch({
              type: REGISTRO_EXITOSO,
              payload: {
                token: respuesta.data.token,
                usuario: respuesta.data.cliente,
              },
            });
      })
      .catch((err) => console.log(err));
  };
}

//<<<<<<< lisandro
//export function getDesafios(arr) {
//  return function (dispatch) {
//    const token = localStorage.getItem("token");
//    fetch(
//      `${URL}detalledesafio`,
//      {
//        method: "POST",
//        body: JSON.stringify(arr),
//        headers: {
//          "Content-Type": "application/json",
//          "Authorization": `Bearer ${token}`
//        }
//      }
//    )
//      .then(resp => resp.json())
//=======
//export function getDesafios() {
//  return function(dispatch) {
//    const token = localStorage.getItem("token");
//    axios
//      .get(`${URL}detalledesafio`, {
//        headers: { Authorization: `Bearer ${token}` },
//      })
//>>>>>>> main
//      .then((json) => {
//        dispatch({
//          type: GET_DESAFIOS,
//          payload: json,
//        });
//      });
//  };
//}
export function getDesafios(arr) {
  return function (dispatch) {
    const token = localStorage.getItem("token");
    fetch(`${URL}detalledesafio`, {
      method: "POST",
      body: JSON.stringify(arr),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        dispatch({
          type: GET_DESAFIOS,
          payload: json,
        });
      });
  };
}


////---------------  ADMIN ACTIONS ---------------////
//_____________________ INICIO ADMIN GET _____________________//

export const GET_FAMILIA = "GET_FAMILIA";
export const GET_CATEGORIA = "GET_CATEGORIA";
export const GET_SUBCATEGORIAS = "GET_SUBCATEGORIAS";
export const GET_UNIDAD_MEDIDAS = "GET_UNIDAD_MEDIDAS";
export const GET_REGION = "GET_REGION";
export const GET_PAIS = "GET_PAIS";
export const GET_CIUDAD = "GET_CIUDAD";
export const GET_MONEDA = "GET_MONEDA";
export const GET_PRODUCTOS = "GET_PRODUCTOS";
export const GET_CATEGORIA_POR_ID = "GET_CATEGORIA_POR_ID";
export const GET_SUBCATEGORIA_POR_ID = "GET_SUBCATEGORIA_POR_ID";
export const GET_PAISES_ID = "GET_PAISES_ID";
export const GET_CIUDADES_ID = "GET_CIUDADES_ID";

export function getFamilia() {
  return function(dispatch) {
    axios.get(`${URL}getadmin/familia`).then((response) => {
      dispatch({
        type: GET_FAMILIA,
        payload: response.data,
      });
    });
  };
}

export function getCategoria() {
  return function(dispatch) {
    axios.get(`${URL}getadmin/categoria`).then((response) => {
      dispatch({
        type: GET_CATEGORIA,
        payload: response.data,
      });
    });
  };
}

export function getSubcategoria() {
  return function (dispatch) {
    axios.get(`${URL}getadmin/subcategoria`).then((response) => {
      dispatch({
        type: GET_SUBCATEGORIAS,
        payload: response.data,
      });
    });
  };
}

export function getUnidadMedida() {
  return function (dispatch) {
    axios.get(`${URL}getadmin/um`).then((response) => {
      dispatch({
        type: GET_UNIDAD_MEDIDAS,
        payload: response.data,
      });
    });
  };
}

export function getRegion() {
  return function (dispatch) {
    axios.get(`${URL}getadmin/region`).then((response) => {
      dispatch({
        type: GET_REGION,
        payload: response.data,
      });
    });
  };
}

export function getPais() {
  return function (dispatch) {
    axios.get(`${URL}getadmin/pais`).then((response) => {
      dispatch({
        type: GET_PAIS,
        payload: response.data,
      });
    });
  };
}

export function getCiudad() {
  return function (dispatch) {
    axios.get(`${URL}getadmin/ciudad`).then((response) => {
      dispatch({
        type: GET_CIUDAD,
        payload: response.data,
      });
    });
  };
}

export function getMoneda() {
  return function (dispatch) {
    axios.get(`${URL}getadmin/moneda`).then((response) => {
      dispatch({
        type: GET_MONEDA,
        payload: response.data,
      });
    });
  };
}

export function getProductos() {
  return function (dispatch) {
    axios.get(`${URL}getadmin/productos`).then((response) => {
      dispatch({
        type: GET_PRODUCTOS,
        payload: response.data,
      });
    });
  };
}

export function getCategoriaPorId(id) {
  return function (dispatch) {
    axios.get(`${URL}getadmin/categoria/${id}`).then((response) => {
      dispatch({
        type: GET_CATEGORIA_POR_ID,
        payload: response.data,
      });
    });
  };
}

export function getSubcategoriaPorId(id) {
  return function (dispatch) {
    axios.get(`${URL}getadmin/subcategoria/${id}`).then((response) => {
      dispatch({
        type: GET_SUBCATEGORIA_POR_ID,
        payload: response.data,
      });
    });
  };
}

export function getPaisesId(id) {
  return function (dispatch) {
    axios.get(`${URL}getadmin/pais/${id}`).then((response) => {
      dispatch({
        type: GET_PAISES_ID,
        payload: response.data,
      });
    });
  };
}
export function getCiudadId(id) {
  return function (dispatch) {
    axios.get(`${URL}getadmin/ciudad/${id}`).then((response) => {
      dispatch({
        type: GET_CIUDADES_ID,
        payload: response.data,
      });
    });
  };
}

//_____________________ FIN ADMIN GET _____________________//


//_____________________ INICIO ADMIN POST _____________________//

export function unidadDeMedida(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/um`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function tipoUsuario(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/tipoUsuario`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function generoPost(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/genero`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function monedaPost(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/moneda`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function ciudadPost(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/ciudad`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function paisPost(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/pais`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function regionPost(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/region`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function familiaPost(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/familia`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function categoriaPost(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/categoria`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function subcategoriaPost(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/subcategoria`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function tipoTransaccionPost(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/tipo_transaccion`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function transaccionPost(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/transaccion`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function clientesPost(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/clientes`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function desafioPost(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/desafio`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function productoPost(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.post(`${URL}admin/productos`, objeto, {headers: { Authorization: `Bearer ${token}` }})
   };
}

//_____________________ FIN ADMIN POST _____________________//
//_____________________ INICIO PUT ADMIN_____________________//


export function putFamilia(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/familia`, objeto, {headers: { Authorization: `Bearer ${token}` }})
   };
}

export function putTipoUsuario(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/tipo_usuario`, objeto, {headers: { Authorization: `Bearer ${token}` }})
   };
}

export function putGenero(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/genero`, objeto, {headers: { Authorization: `Bearer ${token}` }})
    };
}

export function putMoneda(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/monedas`, objeto, {headers: { Authorization: `Bearer ${token}` }})
   };
}

export function putCiudad(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/ciudad`, {headers: { Authorization: `Bearer ${token}` }}, objeto)    
    };
}

export function putPais(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/paises`, objeto, {headers: { Authorization: `Bearer ${token}` }} )
    };
}

export function putRegion(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/region`, objeto , {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function putCategoria(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/categoria`, objeto , {headers: { Authorization: `Bearer ${token}` }})
    };
}

export function putSubCategoria(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/subcategoria`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function putTipoTransaccion(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/tipo_transaccion`, objeto , {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function putTransaccion(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/transaccion`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function putClientes(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/clientes`, objeto, {headers: { Authorization: `Bearer ${token}` }})
   };
}

export function putDesafio(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/desafios`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function putProducto(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/productos`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}

export function putUM(objeto) {
  return function() {
    const token = localStorage.getItem("token");
    axios.put(`${URL}putadmin/um`, objeto, {headers: { Authorization: `Bearer ${token}` }})
  };
}
//_____________________ FIN PUT ADMIN_____________________//


export function iniciarSesionGoogle(datosGoogle) {
  return function (dispatch) {
    axios
      .post(`${URL}ingreso`, datosGoogle)
      .then((respuesta) => {
        !respuesta.data.msg ? (
          dispatch({
            type: LOGIN_EXITOSO,
            payload: {
              token: respuesta.data.token,
              usuario: respuesta.data.user,
            },
          })
        ) : (
          dispatch({
            type: LOGIN_ERROR,
            payload: {
              msg: respuesta.data.msg,
              categoria: "alerta-error",
            },
          })
        )
      })
      .catch((err) =>
      console.log(err)
      );
  };
}

export const REGISTRO_GOOGLE_OK = "REGISTRO_GOOGLE_OK";
export const REGISTRO_GOOGLE_ERR = "REGISTRO_GOOGLE_ERR";

export function registro_google(objeto) {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    axios.put(`${URL}registro-google`, objeto, {headers: { Authorization: `Bearer ${token}` }})
    .then((respuesta) => {
      // console.log(respuesta)
      respuesta.data.msg_ok ? (
        dispatch({
          type: REGISTRO_GOOGLE_OK,
          payload: {
            msg: respuesta.data.msg_ok,
          },
        })
      ) : (
        dispatch({
          type: REGISTRO_GOOGLE_ERR,
          payload: {
            msg: respuesta.data.msg,
            categoria: "alerta-error",
          },
        })
      )
    })
    .catch((err) =>
    console.log(err)
    );
  };
}

