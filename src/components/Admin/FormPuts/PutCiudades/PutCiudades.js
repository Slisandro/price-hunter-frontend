import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  putCiudad,
  getRegion,
  getPais,
  getPaisesId,
  getCiudadId,
} from "../../../Redux/actions";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
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

function PutCiudades() {
  const dispatch = useDispatch();

  const region = useSelector((store) => store.region);
  const paisesId = useSelector((store) => store.paisesId);
  const ciudadesId = useSelector((store) => store.ciudadesId);

  useEffect(() => {
    dispatch(getPais());
    dispatch(getRegion());
  }, [dispatch]);

  const [state, setState] = useState({
    region: "",
    paises: "",
    id: "",
    ciudad: "",
    paiseCodigoAlfa: "",
  });

  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "region") dispatch(getPaisesId(value));
    if (name === "paises") dispatch(getCiudadId(value));

    if (name === "region") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "paises") {
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
    if (name === "ciudad") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "paiseCodigoAlfa") {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
    
    if (data.ciudad && data.ciudad.length > 0) {
      dispatch(putCiudad(data));
      e.target.reset();
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getPais()));
      reset({ data });
    } else {
      swal({
        title: "Debe seleccionar una ciudad para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
    setState({
      region: "",
      paises: "",
      id: "",
      ciudad: "",
      paiseCodigoAlfa: "",
    });

    
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <label id="title">Ciudades</label>
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
                <h6 className="title">Región</h6>
                {state.region.length === 0 ? (
                  <>
                    <Input
                      type="select"
                      name="region"
                      className="inp"
                      onChange={(e) => ChangeInput(e)}
                    >
                      <option></option>

                      {region.map((u) => (
                        <option value={u.id}>{u.nombre_region}</option>
                      ))}
                    </Input>
                  </>
                ) : (
                  <>
                    <Input
                      valid
                      type="select"
                      name="region"
                      className="inp"
                      onChange={(e) => ChangeInput(e)}
                    >
                      <option></option>

                      {region.map((u) => (
                        <option value={u.id}>{u.nombre_region}</option>
                      ))}
                    </Input>
                  </>
                )}
                <span className="err">{errors?.nombre_region?.message}</span>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Pais</h6>
                  {state.paises.length === 0 ? (
                    <>
                      <Input
                        type="select"
                        name="paises"
                        className="inp"
                        onChange={(e) => ChangeInput(e)}
                      >
                        <option></option>
                        {paisesId.map((u) => (
                          <option value={u.codigo_alfa}>{u.nombre_pais}</option>
                        ))}
                      </Input>
                    </>
                  ) : (
                    <>
                      <Input
                        valid
                        type="select"
                        name="paises"
                        className="inp"
                        onChange={(e) => ChangeInput(e)}
                      >
                        <option></option>
                        {paisesId.map((u) => (
                          <option value={u.codigo_alfa}>{u.nombre_pais}</option>
                        ))}
                      </Input>
                    </>
                  )}
                  <span className="err">{errors?.nombre_pais?.message}</span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Ciudad</h6>
                  {state.id.length === 0 ? (
                    <>
                      <Input
                        name="id"
                        className="inp"
                        type="select"
                        onChange={(e) => ChangeInput(e)}
                        {...register("id", {})}
                      >
                        <option></option>
                        {ciudadesId.map((f, index) => (
                          <option key={index} value={f.id}>
                            {f.ciudad}
                          </option>
                        ))}
                      </Input>
                    </>
                  ) : (
                    <>
                      <Input
                        valid
                        name="id"
                        className="inp"
                        type="select"
                        onChange={(e) => ChangeInput(e)}
                        {...register("id", {})}
                      >
                        <option></option>
                        {ciudadesId.map((f, index) => (
                          <option key={index} value={f.id}>
                            {f.ciudad}
                          </option>
                        ))}
                      </Input>
                    </>
                  )}
                </div>
                <span className="err">{errors?.id?.message}</span>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Código País</h6>
                  {state.paiseCodigoAlfa.length === 0 ? (
                    <>
                      <Input
                        type="select"
                        name="paiseCodigoAlfa"
                        className="inp"
                        onChange={(e) => ChangeInput(e)}
                        {...register("paiseCodigoAlfa", {
                          // required: {
                          //   value: true,
                          //   message: "Debe seleccionar un codigo",
                          // },
                        })}
                      >
                        <option></option>
                        {paisesId.map((f, index) => (
                          <option key={index} value={f.codigo_alfa}>
                            {f.codigo_alfa}
                          </option>
                        ))}
                      </Input>
                    </>
                  ) : (
                    <>
                      <Input
                        valid
                        type="select"
                        name="paiseCodigoAlfa"
                        className="inp"
                        onChange={(e) => ChangeInput(e)}
                        {...register("paiseCodigoAlfa", {})}
                      >
                        <option></option>
                        {paisesId.map((f, index) => (
                          <option key={index} value={f.codigo_alfa}>
                            {f.codigo_alfa}
                          </option>
                        ))}
                      </Input>
                    </>
                  )}

                  <span className="err">
                    {errors?.paiseCodigoAlfa?.message}
                  </span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nombre Nueva Ciudad</h6>
                  {state.ciudad.length === 0 ? (
                    <Input
                      className="inp"
                      type="text"
                      name="ciudad"
                      autoComplete="off"
                      max="0"
                    />
                  ) : state.ciudad.length > 2 &&
                    state.ciudad.length < 16 &&
                    errors ? (
                    <Input
                      valid
                      className="inp"
                      type="text"
                      name="ciudad"
                      autoComplete="off"
                      max="0"
                      {...register("ciudad", {})}
                    />
                  ) : (
                    <Input
                      invalid
                      className="inp"
                      type="text"
                      name="ciudad"
                      autoComplete="off"
                      max="0"
                      {...register("ciudad", {
                        // required: {
                        //   value: true,
                        //   message: "Debe ingresar un nombre ",
                        // },
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
                  )}
                </div>
                <span className="err">{errors?.ciudad?.message}</span>

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

export default PutCiudades;
