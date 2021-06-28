import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  productoPost,
  getSubcategoria,
  getUnidadMedida,
} from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import {
  FormFeedback,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  FormText,
} from "reactstrap";
import "./AgregarProducto.css";

function FormAgregarProducto() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubcategoria());
    dispatch(getUnidadMedida());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subcategoria = useSelector((store) => store.subcategoria);
  const unidad_medida = useSelector((store) => store.unidad_medida);

  const [state, setState] = useState({
    nombre: "",
    contenido_neto: "",
    unidadMedidaCodigoUnidadMedida: "",
    subcategoriumId: "",
  });

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "nombre") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "contenido_neto") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "unidadMedidaCodigoUnidadMedida") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "subcategoriumId") {
      setState({
        ...state,
        [name]: target.value,
      });
    }
  };

  const submit = (data, e) => {
    if (data.nombre.length === 0 || data.contenido_neto.length === 0) {
      return swal({
        title: "Agregue un producto!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }

    dispatch(productoPost(data));
    e.target.reset();
    swal({
      title: "Producto agregado con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    }).then((g) =>
      setState({
        nombre: "",
        subcategoriumId: "",
        unidadMedidaCodigoUnidadMedida: "",
        contenido_neto: "",
      })
    );
    reset({ data });
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
            {/* <FormGroup> */}
            <Row>
              <Col>
                <div>
                  <h6 className="title">Nombre</h6>
                  {state.nombre ? (
                    <>
                      <Input
                        valid
                        style={{ appearance: "none" }}
                        type="text"
                        name="nombre"
                        max="0"
                        autoComplete="off"
                        {...register("nombre", {
                          required: {
                            value: true,
                            message: "Debe ingresar un nombre ",
                          },
                        })}
                      />
                      {/* <FormFeedback style={{ margin: "1rem" }} valid>
                        Nombre Correcto!
                      </FormFeedback> */}
                      {/* <span className="err">{errors?.nombre?.message}</span> */}
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        style={{ appearance: "none" }}
                        type="text"
                        name="nombre"
                        max="0"
                        autoComplete="off"
                        {...register("nombre", {
                          required: {
                            value: true,
                            message: "Debe ingresar un nombre ",
                          },
                          maxLength: {
                            value: 15,
                            message:
                              "El nombre no debe tener mas de quince letras!",
                          },
                          minLength: {
                            value: 3,
                            message:
                              "El nombre debe tener al menos tres letras!",
                          },
                          max: {
                            value: 0,
                            message: "El nombre no puede comenzar con numeros",
                          },
                        })}
                      />
                      {/* <FormFeedback style={{ margin: "1rem" }} invalid>
                        Nombre Incorrecto!
                      </FormFeedback> */}
                      <span className="err">{errors?.nombre?.message}</span>
                    </>
                  )}
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Unidad de Medida</h6>
                  {state.unidadMedidaCodigoUnidadMedida ? (
                    <>
                      <Input
                        valid
                        name="unidadMedidaCodigoUnidadMedida"
                        style={{ appearance: "none" }}
                        type="select"
                        onChange={(e) => ChangeInput(e)}
                        {...register("unidadMedidaCodigoUnidadMedida", {
                          required: {
                            value: true,
                            message: "Debe seleccionar una unidad de medida",
                          },
                        })}
                      >
                        <option></option>
                        {unidad_medida.map((f, index) => (
                          <option key={index} value={f.codigo_unidad_medida}>
                            {f.codigo_unidad_medida}
                          </option>
                        ))}
                      </Input>
                      <span className="err">
                        {errors?.unidadMedidaCodigoUnidadMedida?.message}
                      </span>
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        name="unidadMedidaCodigoUnidadMedida"
                        style={{ appearance: "none" }}
                        type="select"
                        onChange={(e) => ChangeInput(e)}
                        {...register("unidadMedidaCodigoUnidadMedida", {
                          required: {
                            value: true,
                            message: "Debe seleccionar una unidad de medida",
                          },
                        })}
                      >
                        <option></option>
                        {unidad_medida.map((f, index) => (
                          <option key={index} value={f.codigo_unidad_medida}>
                            {f.codigo_unidad_medida}
                          </option>
                        ))}
                      </Input>
                      <span className="err">
                        {errors?.unidadMedidaCodigoUnidadMedida?.message}
                      </span>
                    </>
                  )}
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Contenido Neto</h6>
                  {state.contenido_neto && !isNaN(state.contenido_neto) ? (
                    <>
                      <Input
                        valid
                        type="text"
                        inputmode="numeric"
                        min="0"
                        name="contenido_neto"
                        autoComplete="off"
                        {...register("contenido_neto", {
                          required: {
                            value: true,
                            message: "Debe ingresar un valor ",
                          },
                          pattern: {
                            value: /[0-9]/,
                            message: "Debe ingresar sólo números",
                          },
                          maxLength: {
                            value: 4,
                            message:
                              "El contenido no debe tener mas de 4 caracteres!",
                          },
                          min: {
                            value: 1,
                            message: "No puede ingresar valores negativos",
                          },
                        })}
                      />
                      <span className="err">
                        {errors?.contenido_neto?.message}
                      </span>
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        type="text"
                        inputmode="numeric"
                        min="0"
                        name="contenido_neto"
                        autoComplete="off"
                        {...register("contenido_neto", {
                          pattern: {
                            value: /[0-9]/,
                            message: "Debe ingresar sólo números",
                          },
                        })}
                      />
                      <span className="err">
                        {errors?.contenido_neto?.message}
                      </span>
                    </>
                  )}
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Sub-Categoría</h6>
                  {state.subcategoriumId ? (
                    <>
                      <Input
                        valid
                        style={{ appearance: "none" }}
                        name="subcategoriumId"
                        type="select"
                        // value={state.nombre}
                        onChange={(e) => ChangeInput(e)}
                        {...register("subcategoriumId", {
                          required: {
                            value: true,
                            message: "Debe seleccionar una subcategoria",
                          },
                        })}
                      >
                        <option></option>
                        {subcategoria.map((f, index) => (
                          <option key={index} value={f.id}>
                            {f.nombre_subcategoria}
                          </option>
                        ))}
                      </Input>
                      <span className="err">
                        {errors?.subcategoriumId?.message}
                      </span>
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        name="subcategoriumId"
                        style={{ appearance: "none" }}
                        type="select"
                        // value={state.nombre}
                        onChange={(e) => ChangeInput(e)}
                        {...register("subcategoriumId", {
                          required: {
                            value: true,
                            message: "Debe seleccionar una subcategoria",
                          },
                        })}
                      >
                        <option></option>
                        {subcategoria.map((f, index) => (
                          <option key={index} value={f.id}>
                            {f.nombre_subcategoria}
                          </option>
                        ))}
                      </Input>
                      <span className="err">
                        {errors?.subcategoriumId?.message}
                      </span>
                    </>
                  )}
                </div>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  block
                >
                  Agregar
                </Button>
              </Col>
            </Row>
            {/* </FormGroup> */}
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default FormAgregarProducto;
