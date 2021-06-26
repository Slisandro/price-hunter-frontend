import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  FormText,
} from "reactstrap";
import {
  productoPost,
  getSubcategoria,
  getUnidadMedida,
} from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

import close from "../../../../assets/cancel (1).png";

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

    if (!nuevoProducto.nombre) {
      alert("Por favor, ingrese un nombre");
      return;
    }

    if (!nuevoProducto.subcategoriumId) {
      alert("Por favor, ingrese una sub-categoria");
      return;
    }

    if (!nuevoProducto.unidadMedidaCodigoUnidadMedida) {
      alert("Por favor, ingrese una unidad de medida");
      return;
    }

    if (!nuevoProducto.contenido_neto) {
      alert("Por favor, ingrese un contenido neto");
      return;
    }

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
      <div className="content">
        <Row>
          <Col lg="6">
            <Card>
              <div>
                {modal ? (
                  <div>
                    <CardHeader>
                      <header>
                        <h1 id="title">Agregar Producto</h1>
                      </header>
                    </CardHeader>
                    <CardBody>
                      <Form
                        // id="survey-form"
                        className="card-chart"
                        noValidate
                        onChange={(e) => ChangeInput(e)}
                        onSubmit={handleSubmit(submit)}
                      >
                        <Row>
                          <Col className="pr-md-1" lg="8">
                            <div
                              className="btn-group-toggle float-right"
                              data-toggle="buttons"
                            >
                              <div className="content">
                                {/* ------------------------ */}
                                <FormText color="muted">
                                  This is some placeholder block-level help text
                                  for the above input. It's a bit lighter and
                                  easily wraps to a new line.
                                </FormText>
                              </div>
                              <div className="divForm">
                                <div>
                                  {/* ------------------------ */}
                                  <label className="text-label">
                                    Unidad de Medida
                                  </label>
                                  <br></br>
                                  <select
                                    name="unidadMedidaCodigoUnidadMedida"
                                    className="inp2"
                                    onChange={(e) => ChangeInput(e)}
                                    {...register(
                                      "unidadMedidaCodigoUnidadMedida",
                                      {
                                        required: {
                                          value: true,
                                          message:
                                            "Debe seleccionar una unidad de medida",
                                        },
                                      }
                                    )}
                                  >
                                    <option></option>
                                    {unidad_medida.map((f, index) => (
                                      <option
                                        key={index}
                                        value={f.codigo_unidad_medida}
                                      >
                                        {f.codigo_unidad_medida}
                                      </option>
                                    ))}
                                  </select>
                                  <span className="err">
                                    {
                                      errors?.unidadMedidaCodigoUnidadMedida
                                        ?.message
                                    }
                                  </span>
                                </div>
                              </div>
                              <div>
                                {/* ------------------------ */}
                                <label className="title2">Contenido Neto</label>
                                <Input></Input>
                                <span className="err">
                                  {errors?.contenido_neto?.message}
                                </span>
                              </div>
                              <div>
                                {/* ------------------------ */}
                                <label className="title2">Sub-Categoría</label>
                                <br></br>
                                <select
                                  name="subcategoriumId"
                                  className="inp2"
                                  // value={state.nombre}
                                  onChange={(e) => ChangeInput(e)}
                                  {...register("subcategoriumId", {
                                    required: {
                                      value: true,
                                      message:
                                        "Debe seleccionar una subcategoria",
                                    },
                                  })}
                                >
                                  <option></option>
                                  {subcategoria.map((f, index) => (
                                    <option key={index} value={f.id}>
                                      {f.nombre_subcategoria}
                                    </option>
                                  ))}
                                </select>
                                <span className="err">
                                  {errors?.subcategoriumId?.message}
                                </span>
                              </div>
                              <br></br>
                              <Button
                                className="btn-fill"
                                color="primary"
                                type="submit"
                              >
                                Agregar
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </div>
                ) : null}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default FormAgregarProducto;
