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

import close from "../../../../assets/cancel (1).png";
import "./AgregarProducto.css";

function FormAgregarProducto() {
  const [modal, setModal] = useState(true);

  const handleModal = () => {
    setModal(!modal);
  };

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
    e.preventDefault();

    const nuevoProducto = {
      nombre: state.nombre,
      contenido_neto: state.contenido_neto,
      unidadMedidaCodigoUnidadMedida: state.unidadMedidaCodigoUnidadMedida,
      subcategoriumId: state.subcategoriumId,
    };

    dispatch(productoPost(nuevoProducto));
    e.target.reset();
    swal({
      title: "Producto agregado con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    });

    setState({
      nombre: "",
      subcategoriumId: "",
      unidadMedidaCodigoUnidadMedida: "",
      contenido_neto: "",
    });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h1 id="title">Productos</h1>
        </CardHeader>
        <CardBody>
          <Form
            id="survey-form"
            className="form"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={handleSubmit(submit)}
          >
            <FormGroup>
              <Row>
                <Col>
                  <label className="title">Nombre</label>
                  {state.nombre ? (
                    <>
                      <Input
                        valid
                        className="inp"
                        type="text"
                        name="nombre"
                        max="0"
                        autoComplete="off"
                        // {...register("nombre", {
                        //   required: {
                        //     value: true,
                        //     message: "Debe ingresar un nombre ",
                        //   },
                        //   maxLength: {
                        //     value: 15,
                        //     message:
                        //       "El nombre no debe tener mas de quince letras!",
                        //   },
                        //   minLength: {
                        //     value: 3,
                        //     message:
                        //       "El nombre debe tener al menos tres letras!",
                        //   },
                        //   max: {
                        //     value: 0,
                        //     message: "El nombre no puede comenzar con numeros",
                        //   },
                        // })}
                      />
                      {/* <FormFeedback valid>Nombre Correcto!</FormFeedback> */}
                      <span className="err">{errors?.nombre?.message}</span>
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        className="inp"
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
                      {/* <FormFeedback valid>
                        Sweet! that name is available
                      </FormFeedback> */}
                    </>
                  )}

                  <div>
                    <label className="title">Unidad de Medida</label>
                    {state.unidadMedidaCodigoUnidadMedida ? (
                      <>
                        <Input
                          valid
                          name="unidadMedidaCodigoUnidadMedida"
                          className="inp2"
                          type="select"
                          onChange={(e) => ChangeInput(e)}
                          // {...register("unidadMedidaCodigoUnidadMedida", {
                          //   required: {
                          //     value: true,
                          //     message: "Debe seleccionar una unidad de medida",
                          //   },
                          // })}
                        >
                          <option></option>
                          {unidad_medida.map((f, index) => (
                            <option key={index} value={f.codigo_unidad_medida}>
                              {f.codigo_unidad_medida}
                            </option>
                          ))}
                        </Input>
                        {/* <span className="err">
                          {errors?.unidadMedidaCodigoUnidadMedida?.message}
                        </span> */}
                      </>
                    ) : (
                      <>
                        <Input
                          invalid
                          name="unidadMedidaCodigoUnidadMedida"
                          className="inp2"
                          type="select"
                          onChange={(e) => ChangeInput(e)}
                          // {...register("unidadMedidaCodigoUnidadMedida", {
                          //   required: {
                          //     value: true,
                          //     message: "Debe seleccionar una unidad de medida",
                          //   },
                          // })}
                        >
                          <option></option>
                          {unidad_medida.map((f, index) => (
                            <option key={index} value={f.codigo_unidad_medida}>
                              {f.codigo_unidad_medida}
                            </option>
                          ))}
                        </Input>
                        {/* <span className="err">
                          {errors?.unidadMedidaCodigoUnidadMedida?.message}
                        </span> */}
                      </>
                    )}
                  </div>

                  <div>
                    <label className="title">Contenido Neto</label>
                    {state.contenido_neto ? (
                      <>
                        <Input
                          valid
                          className="inp"
                          type="number"
                          min="0"
                          name="contenido_neto"
                          autoComplete="off"
                          {...register("contenido_neto", {
                            required: {
                              value: true,
                              message: "Debe ingresar un valor ",
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
                          className="inp"
                          type="number"
                          min="0"
                          name="contenido_neto"
                          autoComplete="off"
                          {...register("contenido_neto", {
                            required: {
                              value: true,
                              message: "Debe ingresar un valor ",
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
                    )}
                  </div>
                  <div>
                    <label className="title">Sub-Categoría</label>
                    {state.subcategoriumId ? (
                      <>
                        <Input
                          valid
                          name="subcategoriumId"
                          className="inp5"
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
                          className="inp5"
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
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default FormAgregarProducto;
