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
  return function(dispatch) {
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
export function getSubcategoriasId(id) {
  const token = localStorage.getItem("token");

  return function (dispatch) {
    axios
      .get(`${URL}subcategoria/${id}`, {
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
      .catch((err) => console.log(err));
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
          : respuesta.data.user
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
      .catch((err) => console.log(err));
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
  return function (dispatch) {
    axios.post(`${URL}admin/um`, objeto).then((response) => {
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
  return function (dispatch) {
    axios
      .post(`${URL}admin/tipoUsuario`, objeto)
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
  return function (dispatch) {
    axios
      .post(`${URL}admin/genero`, objeto)
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
  return function (dispatch) {
    axios
      .post(`${URL}admin/moneda`, objeto)
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
  return function (dispatch) {
    axios
      .post(`${URL}admin/ciudad`, objeto)
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
  return function (dispatch) {
    axios.post(`${URL}admin/pais`, objeto).then((response) => {
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
  return function (dispatch) {
    axios
      .post(`${URL}admin/region`, objeto)
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
  return function (dispatch) {
    axios
      .post(`${URL}admin/familia`, objeto)
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
  return function (dispatch) {
    axios
      .post(`${URL}admin/categoria`, objeto)
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
  return function (dispatch) {
    axios
      .post(`${URL}admin/subcategoria`, objeto)
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
  return function (dispatch) {
    axios
      .post(`${URL}admin/tipo_transaccion`, objeto)
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
  return function (dispatch) {
    axios
      .post(`${URL}admin/transaccion`, objeto)
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
  return function (dispatch) {
    axios
      .post(`${URL}admin/clientes`, objeto)
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
  return function (dispatch) {
    axios
      .post(`${URL}admin/desafio`, objeto)
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
  return function (dispatch) {
    axios
      .post(`${URL}admin/productos`, objeto)
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

//_____________________ GET _____________________//

export const GET_FAMILIA = "GET_FAMILIA";
export const GET_CATEGORIA = "GET_CATEGORIA";
export const GET_SUBCATEGORIAS = "GET_SUBCATEGORIAS";
export const GET_UNIDAD_MEDIDAS = "GET_UNIDAD_MEDIDAS";
export const GET_REGION = "GET_REGION";
export const GET_PAIS = "GET_PAIS";
export const GET_MONEDA = "GET_MONEDA";
export const GET_TIPO_TRANSACCION = "GET_TIPO_TRANSACCION";
export const GET_CIUDAD = "GET_CIUDAD";
export const GET_PRODUCTOS = "GET_PRODUCTOS"
export const GET_CATEGORIA_POR_ID = "GET_CATEGORIA_POR_ID"
export const GET_SUBCATEGORIA_POR_ID = "GET_SUBCATEGORIA_POR_ID"

export function getFamilia() {
  return function (dispatch) {
    axios.get(`${URL}getadmin/familia`).then((response) => {
      dispatch({
        type: GET_FAMILIA,
        payload: response.data,
      });
    });
  };
}

export function getCategoria() {
  return function (dispatch) {
    axios.get(`${URL}getadmin/categoria`).then((response) => {
      dispatch({
        type: GET_CATEGORIA,
        payload: response.data,
      });
    });
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
    fetch(
      `${URL}detalledesafio`,
      {
        method: "POST",
        body: JSON.stringify(arr),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    )
      .then(resp => resp.json())
      .then((json) => {
        dispatch({
          type: GET_DESAFIOS,
          payload: json,
        });
      });
  };
}

export function getSubcategoria() {
  return function (dispatch) {
    axios
      .get(`${URL}getadmin/subcategoria`)
      .then((response) => {
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
  return function(dispatch) {
    axios.get(`${URL}getadmin/region`).then((response) => {
      dispatch({
        type: GET_REGION,
        payload: response.data,
      });
    });
  };
}

export function getPais() {
  return function(dispatch) {
    axios.get(`${URL}getadmin/pais`).then((response) => {
      dispatch({
        type: GET_PAIS,
        payload: response.data,
      });
    });
  };
}

export function getCiudad() {
  return function(dispatch) {
    axios.get(`${URL}getadmin/ciudad`).then((response) => {
      dispatch({
        type: GET_CIUDAD,
        payload: response.data,
      });
    });
  };
}

export function getMoneda() {
  return function(dispatch) {
    axios.get(`${URL}getadmin/moneda`).then((response) => {
      dispatch({
        type: GET_MONEDA,
        payload: response.data,
      });
    });
  };
}

export function getProductos() {
  return function(dispatch) {
    axios.get(`${URL}getadmin/productos`).then((response) => {
      dispatch({
        type: GET_PRODUCTOS,
        payload: response.data,
      });
    });
  };
}

export function getCategoriaPorId(id) {
  return function(dispatch) {
    axios.get(`${URL}getadmin/categoria/${id}`).then((response) => {
      dispatch({
        type: GET_CATEGORIA_POR_ID,
        payload: response.data,
      });
    });
  };
}

export function getSubcategoriaPorId(id) {
  return function(dispatch) {
    axios.get(`${URL}getadmin/subcategoria/${id}`).then((response) => {
      dispatch({
        type: GET_SUBCATEGORIA_POR_ID,
        payload: response.data,
      });
    });
  };
}



export function getTipoTransaccion() {
  return function (dispatch) {
    axios.get(`${URL}tipotransacciones`).then((response) => {
      dispatch({
        type: GET_TIPO_TRANSACCION,
        payload: response.data,
      });
    });
  };
}


export function iniciarSesionCliente(datos) {
  return function (dispatch) {
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
  return function (dispatch) {
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
  }
}
//_____________________ PUT _____________________//
export const PUT_FAMILIA = "PUT_FAMILIA";
export const PUT_TIPO_USUARIO = "PUT_TIPO_USUARIO";
export const PUT_GENERO = "PUT_GENERO";
export const PUT_MONEDA = "PUT_MONEDA";
export const PUT_CIUDAD = "PUT_CIUDAD";
export const PUT_PAIS = "PUT_PAIS";
export const PUT_REGION = "PUT_REGION";
export const PUT_CATEGORIA = "PUT_CATEGORIA";
export const PUT_SUBCATEGORIA = "PUT_SUBCATEGORIA";
export const PUT_TIPO_TRANSACCION = "PUT_TIPO_TRANSACCION";
export const PUT_TRANSACCION = "PUT_TRANSACCION";
export const PUT_CLIENTES = "PUT_CLIENTES";
export const PUT_DESAFIO = "PUT_DESAFIO";
export const PUT_PRODUCTO = "PUT_PRODUCTO";
export const PUT_UM = "PUT_UM";

export function putFamilia(objeto) {
  return function(dispatch) {
    axios.put(`${URL}putadmin/familia`, objeto).then((response) => {
      let nombre_familia = {
        nombre_familia: response.data.nombre_familia,
        id: response.data.id,
      };
      dispatch({
        type: PUT_FAMILIA,
        payload: nombre_familia,
      });
    });
  };
}

export function putTipoUsuario(objeto) {
  return function(dispatch) {
    axios.put(`${URL}putadmin/tipo_usuario`, objeto).then((response) => {
      let tipoUsuario = {
        nombre_tipoUsuario: response.data.nombre_tipoUsuario,
      };
      dispatch({
        type: PUT_TIPO_USUARIO,
        payload: response.data,
      });
    });
  };
}

export function putGenero() {
  return function(dispatch) {
    axios.put(`${URL}putadmin/genero`).then((response) => {
      let genero = {
        nombre_genero: response.data.nombre_genero,
      };
      dispatch({
        type: PUT_GENERO,
        payload: response.data,
      });
    });
  };
}

export function putMoneda(objeto) {
  return function(dispatch) {
    axios.put(`${URL}putadmin/monedas`, objeto).then((response) => {
      let moneda = {
        nombre_moneda: response.data.nombre_moneda,
      };
      dispatch({
        type: PUT_MONEDA,
        payload: moneda,
      });
    });
  };
}

export function putCiudad(objeto) {
  return function(dispatch) {
    axios.put(`${URL}putadmin/ciudad`, objeto).then((response) => {
      let ciudad = {
        nombre_ciudad: response.data.nombre_ciudad,
      };
      dispatch({
        type: PUT_CIUDAD,
        payload: ciudad,
      });
    });
  };
}

export function putPais(objeto) {
  return function(dispatch) {
    axios.put(`${URL}putadmin/paises`, objeto).then((response) => {
      let pais = {
        nombre_pais: response.data.nombre_pais,
      };
      dispatch({
        type: PUT_PAIS,
        payload: pais,
      });
    });
  };
}

export function putRegion(objeto) {
  return function(dispatch) {
    axios.put(`${URL}putadmin/region`, objeto).then((response) => {
      let region = {
        nombre_region: response.data.nombre_region,
      };
      dispatch({
        type: PUT_REGION,
        payload: response.data,
      });
    });
  };
}

export function putCategoria(objeto) {
  return function(dispatch) {
    axios.put(`${URL}putadmin/categoria`, objeto).then((response) => {
      let nombre_categoria = {
        nombre_categoria: response.data.nombre_categoria,
        id: response.data.id,
      };
      dispatch({
        type: PUT_CATEGORIA,
        payload: nombre_categoria,
      });
    });
  };
}

export function putSubCategoria(objeto) {
  return function(dispatch) {
    axios.put(`${URL}putadmin/subcategoria`, objeto).then((response) => {
      let nombre_subCategoria = {
        nombre_subCategoria: response.data.nombre_SubCategoria,
      };
      dispatch({
        type: PUT_SUBCATEGORIA,
        payload: nombre_subCategoria,
      });
    });
  };
}

export function putTipoTransaccion(objeto) {
  return function(dispatch) {
    axios.put(`${URL}putadmin/tipo_transaccion`, objeto).then((response) => {
      let tipo_transaccion = {
        id: response.data.id,
        tipo_transaccion: response.data.tipo_transaccion,
      };
      dispatch({
        type: PUT_TIPO_TRANSACCION,
        payload: tipo_transaccion,
      });
    });
  };
}

export function putTransaccion(objeto) {
  return function(dispatch) {
    axios.put(`${URL}putadmin/transaccion`, objeto).then((response) => {
      let transaccion = {
        tipo_transaccion: response.data.tipo_transaccion,
      };
      dispatch({
        type: PUT_TRANSACCION,
        payload: transaccion,
      });
    });
  };
}

export function putClientes(objeto) {
  return function(dispatch) {
    axios.put(`${URL}putadmin/clientes`, objeto).then((response) => {
      let clientes = {
        clientes: response.data.clientes,
      };
      dispatch({
        type: PUT_CLIENTES,
        payload: response.data,
      });
    });
  };
}

export function putDesafio(objeto) {
  return function(dispatch) {
    axios.put(`${URL}putadmin/desafios`, objeto).then((response) => {
      let desafio = {
        nombre_desafio: response.data.nombre_desafio,
      };
      dispatch({
        type: PUT_DESAFIO,
        payload: response.data,
      });
    });
  };
}

export function putProducto(objeto) {
  return function(dispatch) {
    axios.put(`${URL}putadmin/productos`, objeto).then((response) => {
      dispatch({
        type: PUT_PRODUCTO,
        payload: response.data,
      });
    });
  };
}

export function putUM(objeto) {
  return function(dispatch) {
    console.log(objeto)
    axios.put(`${URL}putadmin/um`, objeto).then((response) => {
      let um = {
        codigo_unidad_medida: response.data.codigo_unidad_medida,
        nombre_unidad: response.data.nombre_unidad
      };
      dispatch({
        type: PUT_UM,
        payload: um,
      });
    });
  };
}
