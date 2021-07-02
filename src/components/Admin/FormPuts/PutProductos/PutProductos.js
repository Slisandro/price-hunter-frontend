import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  putProducto,
  getProductos,
  getSubcategoria,
  getUnidadMedida,
} from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function PutProductos() {
  const dispatch = useDispatch();
  const productos = useSelector((store) => store.productos);
  const subcategoria = useSelector((store) => store.subcategoria);
  const unidad = useSelector((store) => store.unidad_medida);

  const [state, setState] = useState({
    id: "",
    nombre: "",
    contenido_neto: "",
    subcategoriumId: "",
    unidadMedidaCodigoUnidadMedida: "",
  });

  useEffect(() => {
    dispatch(getProductos());
    dispatch(getSubcategoria());
    dispatch(getUnidadMedida());
  }, [dispatch]);

  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    for (let i = 0; i < productos.length; i++) {
      if (parseInt(value) === parseInt(productos[i].id)) {
        setState({
          id: productos[i].id,
          nombre: productos[i].nombre,
          contenido_neto: productos[i].contenido_neto,
          subcategoriumId: productos[i].subcategoriumId,
          unidadMedidaCodigoUnidadMedida:
            productos[i].unidadMedidaCodigoUnidadMedida,
        });
      }
    }

    for (let i = 0; i < subcategoria.length; i++) {
      if (parseInt(state.subcategoriumId) === parseInt(subcategoria[i].id)) {
        setState({
          ...state,
          subcategoriumId: subcategoria[i].nombre_subcategoria,
        });
      }
    }

    if (name === "nombre") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "contenido_neto") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "id") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "subcategoriumId") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "unidadMedidaCodigoUnidadMedida") {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const submit = (data, e) => {
    if (data.id && data.id.length >0) {
      dispatch(putProducto(data));

      e.target.reset();
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => {
         dispatch(getProductos())
         setState({
          id: "",
          nombre: "",
          contenido_neto: "",
          subcategoriumId: "",
          unidadMedidaCodigoUnidadMedida: "",
        });
         reset({ data });
        });
    } else {
      swal({
        title: "Debe seleccionar un producto para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <span id="title">Productos</span>
        </CardHeader>
        <CardBody>
          <Form
            id="survey-form"
            className="form"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={handleSubmit(submit)}
          >
            <Row>
              <Col>
                <h6 className="title">Productos</h6>
                {state.id.length === 0 ? (
                  <Input
                    name="id"
                    type="select"
                    className="inp"
                    onChange={(e) => ChangeInput(e)}
                    {...register("id", {})}
                  >
                    <option></option>
                    {productos.map((f, index) => (
                      <option key={index} value={f.id}>
                        {f.nombre}
                      </option>
                    ))}
                  </Input>
                ) : (
                  <Input
                    valid
                    name="id"
                    type="select"
                    className="inp"
                    onChange={(e) => ChangeInput(e)}
                    {...register("id", {})}
                  >
                    <option></option>
                    {productos.map((f, index) => (
                      <option key={index} value={f.id}>
                        {f.nombre}
                      </option>
                    ))}
                  </Input>
                )}
                <span className="err">{errors?.id?.message}</span>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nuevo Nombre</h6>
                  {state.nombre.length === 0 ? (
                    <Input
                      className="inp"
                      type="text"
                      name="nombre"
                      autoComplete="off"
                      max="0"
                      {...register("nombre", {})}
                    />
                  ) : state.nombre.length > 2 && state.nombre.length < 16 ? (
                    <Input
                      valid
                      className="inp"
                      type="text"
                      name="nombre"
                      autoComplete="off"
                      max="0"
                      {...register("nombre", {})}
                    />
                  ) : (
                    <Input
                      invalid
                      className="inp"
                      type="text"
                      name="nombre"
                      autoComplete="off"
                      max="0"
                      {...register("nombre", {
                        maxLength: {
                          value: 15,
                          message:
                            "El nombre no debe tener mas de quince letras!",
                        },
                        mixLength: {
                          value: 3,
                          message:
                            "El nombre no debe tener menos de tres letras!",
                        },

                        max: {
                          value: 0,
                          message: "El nombre no puede comenzar con numeros",
                        },
                      })}
                    />
                  )}
                  <span className="err">{errors?.nombre?.message}</span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nuevo Contenido Neto</h6>
                  {state.contenido_neto.length === 0 ? (
                    <Input
                      className="inp"
                      type="number"
                      min="0"
                      max
                      name="contenido_neto"
                      autoComplete="off"
                      {...register("contenido_neto", {})}
                    />
                  ) : state.contenido_neto.length > 0 &&
                    state.contenido_neto.length < 4 ? (
                    <Input
                      valid
                      className="inp"
                      type="number"
                      min="0"
                      max
                      name="contenido_neto"
                      autoComplete="off"
                      {...register("contenido_neto", {})}
                    />
                  ) : (
                    <Input
                      invalid
                      className="inp"
                      type="number"
                      min="0"
                      max
                      name="contenido_neto"
                      autoComplete="off"
                      {...register("contenido_neto", {
                        maxLength: {
                          value: 4,
                          message:
                            "El contenido no debe tener mas de 4 caracteres",
                        },
                        min: {
                          value: 0,
                          message: "El contenido no puede ser negativo",
                        },
                      })}
                    />
                  )}
                  <span className="err">{errors?.contenido_neto?.message}</span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nueva Unidad Medida</h6>
                  {state.unidadMedidaCodigoUnidadMedida.length === 0 ? (
                    <Input
                      className="inp"
                      type="select"
                      name="unidadMedidaCodigoUnidadMedida"
                      autoComplete="off"
                      max="0"
                      {...register("unidadMedidaCodigoUnidadMedida", {})}
                    >
                      <option></option>
                      {unidad.map((f, index) => (
                        <option key={index} value={f.codigo_unidad_medida}>
                          {f.nombre_unidad}
                        </option>
                      ))}
                    </Input>
                  ) : (
                    <Input
                      valid
                      className="inp"
                      type="select"
                      name="unidadMedidaCodigoUnidadMedida"
                      autoComplete="off"
                      max="0"
                      {...register("unidadMedidaCodigoUnidadMedida", {})}
                    >
                      <option></option>
                      {unidad.map((f, index) => (
                        <option key={index} value={f.codigo_unidad_medida}>
                          {f.nombre_unidad}
                        </option>
                      ))}
                    </Input>
                  )}
                  <span className="err">
                    {errors?.unidadMedidaCodigoUnidadMedida?.message}
                  </span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nueva Subcategoria</h6>
                  {state.subcategoriumId.length === 0 ? (
                    <Input
                      name="subcategoriumId"
                      className="inp"
                      type="select"
                      onChange={(e) => ChangeInput(e)}
                      {...register("subcategoriumId", {})}
                    >
                      <option></option>
                      {subcategoria.map((f, index) => (
                        <option key={index} value={f.id}>
                          {f.nombre_subcategoria}
                        </option>
                      ))}
                    </Input>
                  ) : (
                    <Input
                      valid
                      name="subcategoriumId"
                      className="inp"
                      type="select"
                      onChange={(e) => ChangeInput(e)}
                      {...register("subcategoriumId", {})}
                    >
                      <option></option>
                      {subcategoria.map((f, index) => (
                        <option key={index} value={f.id}>
                          {f.nombre_subcategoria}
                        </option>
                      ))}
                    </Input>
                  )}
                  <span className="err">
                    {errors?.subcategoriumId?.message}
                  </span>
                </div>

                <div className="cont_prod" style={{ marginTop: "1rem" }}>
                  {state.id.length === 0 && state.nombre.length === 0 ? (
                    <div
                      className="tiposProductos"
                      style={{ display: "none" }}
                    ></div>
                  ) : (
                    <div className="tiposProductos" style={{ display: "" }}>
                      <h5>id = {state.id}</h5>
                      <h5 style={{ marginTop: "-1rem" }}>
                        Nombre = {state.nombre}
                      </h5>
                      <h5 style={{ marginTop: "-1rem" }}>
                        Cont Neto = {state.contenido_neto}
                      </h5>
                      <h5 style={{ marginTop: "-1rem" }}>
                        Unidad Medida = {state.unidadMedidaCodigoUnidadMedida}
                      </h5>
                      <h5 style={{ marginTop: "-1rem" }}>
                        Subcategoria = {state.subcategoriumId}
                      </h5>
                    </div>
                  )}
                </div>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  block
                >
                  Modificar
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default PutProductos;
