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

//ACCION QUE SE DESPACHA AL REALIZAR LA BUSQUEDA DE UN PRODUCTO POR SU NOMBRE
export function getProductsByName(nombre) {
  return function(dispatch) {
    axios.get(`http://localhost:3001/productos?name=${nombre}`).then((r) => {
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
  // console.log(id, "ID")
  return function(dispatch) {
    axios.get(`http://localhost:3001/subcategoria/${id}`).then((r) => {
      console.log(r.data);
      dispatch({
        type: GET_SUBCATEGORIAS_ID,
        payload: r.data,
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
export const registrarUsuario = async (datosUser) => {
  try {
    const respuesta = await axios.post(
      "http://localhost:3001/usuarios/registro",
      datosUser
    );
    console.log(respuesta.data);
    return function(dispatch) {
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });
    };
    // Obtener el usuario
    // usuarioAutenticado();
  } catch (error) {
    console.log(error.response);
    const alerta = {
      msg: error.response.data.msg,
      categoria: "alerta-error",
    };
    return function(dispatch) {
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    };
  }
};

// Retorna el usuario autenticado
export const usuarioAutenticado = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    // tokenAuth(token);
  }

  try {
    const respuesta = await axios.get(
      "http://localhost:3001/usuarios/registro"
    );
    // console.log(respuesta);
    return function(dispatch) {
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    };
  } catch (error) {
    console.log(error.response);
    return function(dispatch) {
      dispatch({
        type: LOGIN_ERROR,
      });
    };
  }
};

////---------------  ADMIN ACTIONS ---------------////
export const UNIDAD_MEDIDA = "UNIDAD_MEDIDA";
export const TIPO_USUARIO = "TIPO_USUARIO";
export const GENERO = "GENERO";
export const MONEDA = "MONEDA";
export const CIUDAD = "CIUDAD";
export const PAIS = "PAIS";
export const REGION = "REGION";
export const FAMILIA = "FAMILIA";
export const CATEGORIA = "CATEGORIA";
export const SUBCATEGORIA = "SUBCATEGORIA";
export const TIPO_TRANSACCION = "TIPO_TRANSACCION";
export const TRANSACCION = "TRANSACCION";
export const CLIENTES = "CLIENTES";
export const DESAFIO = "DESAFIO";

export function unidadDeMedida(objeto) {
  return function(dispatch) {
    axios.post(`http://localhost:3001/admin/um`, objeto).then((response) => {
      let um = {
        codigo_unidad_medida: response.data.codigo_unidad_medida,
        nombre_unidad: response.data.nombre_unidad,
      };
      dispatch({
        type: UNIDAD_MEDIDA,
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
          type: TIPO_USUARIO,
          payload: tipo_usuario,
        });
      });
  };
}

export function genero(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/genero`, objeto)
      .then((response) => {
        let genero = {
          genero: response.data.genero,
        };
        dispatch({
          type: GENERO,
          payload: genero,
        });
      });
  };
}

export function monedas(objeto) {
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
          type: MONEDA,
          payload: moneda,
        });
      });
  };
}

export function ciudad(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/ciudad`, objeto)
      .then((response) => {
        let ciudad = {
          ciudad: response.data.ciudad,
          paiseCodigoAlfa: response.data.paiseCodigoAlfa,
        };
        dispatch({
          type: CIUDAD,
          payload: ciudad,
        });
      });
  };
}

export function pais(objeto) {
  return function(dispatch) {
    axios.post(`http://localhost:3001/admin/pais`, objeto).then((response) => {
      let pais = {
        codigo_alfa: response.data.codigo_alfa,
        nombre_pais: response.data.nombre_pais,
        regioneId: response.data.regioneId,
        monedaCodigoMoneda: response.data.monedaCodigoMoneda,
      };
      dispatch({
        type: PAIS,
        payload: pais,
      });
    });
  };
}

export function region(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/region`, objeto)
      .then((response) => {
        let region = {
          nombre_region: response.data.nombre_region,
        };
        dispatch({
          type: REGION,
          payload: region,
        });
      });
  };
}

export function familia(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/familia`, objeto)
      .then((response) => {
        let familia = {
          nombre_familia: response.data.nombre_familia,
          descripcion: response.data.descripcion, //opcional
        };
        dispatch({
          type: FAMILIA,
          payload: familia,
        });
      });
  };
}

export function categoria(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/categoria`, objeto)
      .then((response) => {
        let categoria = {
          nombre_categoria: response.data.nombre_categoria,
          descripcion: response.data.descripcion, //opcional
        };
        dispatch({
          type: CATEGORIA,
          payload: categoria,
        });
      });
  };
}

export function subcategoria(objeto) {
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
          type: SUBCATEGORIA,
          payload: subcategoria,
        });
      });
  };
}

export function tipoTransaccion(objeto) {
  return function(dispatch) {
    axios
      .post(`http://localhost:3001/admin/tipo_transaccion`, objeto)
      .then((response) => {
        let tipoTransaccion = {
          tipo_transaccion: response.data.tipo_transaccion,
        };
        dispatch({
          type: TIPO_TRANSACCION,
          payload: tipoTransaccion,
        });
      });
  };
}

export function transaccion(objeto) {
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
          type: TRANSACCION,
          payload: transaccion,
        });
      });
  };
}

export function clientes(objeto) {
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
          type: CLIENTES,
          payload: clientes,
        });
      });
  };
}

export function desafio(objeto) {
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
          type: DESAFIO,
          payload: desafio,
        });
      });
  };
}

//-----------------------------------------------------------
