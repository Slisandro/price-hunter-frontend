import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaises, putPais } from "../../../Redux/actions";
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

function PutPaises() {
  const dispatch = useDispatch();
  const paises = useSelector((store) => store.paises);

  const [state, setState] = useState({
    nombre_pais: "",
    codigo_alfa: "",
  });

  useEffect(() => {
    dispatch(getPaises());
  }, [dispatch]);

  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "nombre_pais") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "codigo_alfa") {
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
    if (data.nombre_pais && data.nombre_pais.length > 2) {
      dispatch(putPais(data));
      e.target.reset();
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => {
        dispatch(getPaises());
        setState({
          nombre_pais: "",
          codigo_alfa: "",
        });
        reset({ data });
      });
    } else {
      swal({
        title: "Debe seleccionar un pais a modificar",
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
          <span id="title">Países</span>
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
                <h6 className="title">Países</h6>
                {state.codigo_alfa.length === 0 ? (
                  <>
                    <Input
                      name="codigo_alfa"
                      type="select"
                      className="inp"
                      onChange={(e) => ChangeInput(e)}
                      {...register("codigo_alfa", {
                        // required: {
                        //   value: true,
                        //   message: "Debe seleccionar una pais",
                        // },
                      })}
                    >
                      <option></option>
                      {paises.map((u) => (
                        <option value={u.codigo_alfa}>{u.nombre_pais}</option>
                      ))}
                    </Input>
                  </>
                ) : (
                  <>
                    <Input
                      valid
                      name="codigo_alfa"
                      type="select"
                      className="inp"
                      onChange={(e) => ChangeInput(e)}
                      {...register("codigo_alfa", {})}
                    >
                      <option></option>
                      {paises.map((u) => (
                        <option value={u.codigo_alfa}>{u.nombre_pais}</option>
                      ))}
                    </Input>
                  </>
                )}
                <span className="err">{errors?.codigo_alfa?.message}</span>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nuevo País</h6>
                  {state.nombre_pais.length === 0 ? (
                    <>
                      <Input
                        className="inp"
                        type="text"
                        name="nombre_pais"
                        autoComplete="off"
                        max="0"
                        onChange={(e) => ChangeInput(e)}
                        {...register("nombre_pais", {
                          // required: {
                          //   value: true,
                          //   message: "Debe ingresar un nombre",
                          // },
                        })}
                      />
                    </>
                  ) : state.nombre_pais.length > 2 &&
                    state.nombre_pais.length < 16 ? (
                    <>
                      <Input
                        valid
                        className="inp"
                        type="text"
                        name="nombre_pais"
                        autoComplete="off"
                        max="0"
                        onChange={(e) => ChangeInput(e)}
                        {...register("nombre_pais", {})}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        className="inp"
                        type="text"
                        name="nombre_pais"
                        autoComplete="off"
                        max="0"
                        onChange={(e) => ChangeInput(e)}
                        {...register("nombre_pais", {
                          maxLength: {
                            value: 15,
                            message:
                              "El nombre debe tener menos de quince letras!",
                          },
                          minLength: {
                            value: 3,
                            message: "El nombre debe tener tres letras!",
                          },
                          pattern: {
                            value: /^[a-zA-Z ]*$/,
                            message: "Debe ingresar solo letras",
                          },
                        })}
                      />
                    </>
                  )}
                  <span className="err">{errors?.nombre_pais?.message}</span>
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

export default PutPaises;
