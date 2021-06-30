import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putTipoTransaccion, getTipoTransaccion } from "../../../Redux/actions";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import {
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

function PutTipoTrans() {
  const dispatch = useDispatch();
  const transaccion = useSelector((store) => store.transaccion);

  useEffect(() => {
    dispatch(getTipoTransaccion());
  }, [dispatch]);


  const [state, setState] = useState({
    tipo_transaccion: "",
    id: "",
  });
  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "tipo_transaccion") {
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
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const submit = (data, e) => {
    if (data.tipo_transaccion) {
      dispatch(putTipoTransaccion(data));
      e.target.reset();
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getTipoTransaccion()));
    } else {
      swal({
        title: "Debe seleccionar un tipo de transacción para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
    reset({ data });
  };

  return (
    <>
      {/* <div className="content"> */}
      {/* <Row> */}
      {/* <Col lg="4"> */}
      <Card className="card-chart">
        <CardHeader>
          <span id="title">Tipo de Transacción</span>
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
                <h6 className="title">Tipos de Transacción</h6>
                {state.id.length === 0 ? (
                  <>

                <Input
                  name="id"
                  type="select"
                  className="inp"
                  onChange={(e) => ChangeInput(e)}
                  {...register("id", {
                       required: {
                         value: true,
                         message: "Debe seleccionar un tipo de transaccion",
                       },
                  })}
                >
                  <option></option>
                  {transaccion.map((f, index) => (
                    <option key={index} value={f.id}>
                      {f.tipo_transaccion}
                    </option>
                  ))}
                </Input>
                <span className="err">{errors?.id?.message}</span>
              
                   </>
                ) : (
                  <>
                  <Input
                  valid
                  name="id"
                  type="select"
                  className="inp"
                  onChange={(e) => ChangeInput(e)}
                  {...register("id", {
                       required: {
                         value: true,
                         message: "Debe seleccionar un tipo de transaccion",
                       },
                  })}
                >
                  <option></option>
                  {transaccion.map((f, index) => (
                    <option key={index} value={f.id}>
                      {f.tipo_transaccion}
                    </option>
                  ))}
                </Input>
                <span className="err">{errors?.id?.message}</span>
  
                   </>
                )
                }
                
                <div style={{marginTop: "1rem" }}>
                  <h6 className="title">Nuevo Tipo de Transacción</h6>
                  {!state.tipo_transaccion ? (
                    <>
                    
                    <Input
                    // className="inp"
                    type="text"
                    name="tipo_transaccion"
                    autoComplete="off"
                    max="0"
                    {...register("tipo_transaccion", {
                       required: {
                        value: true,
                         message: "Debe ingresar una tipo transaccion ",
                       },
                      maxLength: {
                        value: 15,
                        message:
                          "El nombre no debe tener mas de quince letras!",
                      },
                      max: {
                        value: 0,
                        message: "El nombre no puede comenzar con numeros",
                      },
                    })}
                  />
                  <span className="err">
                    {errors?.tipo_transaccion?.message}
                  </span>
                  
                     </>
                  ): state.tipo_transaccion.length && state.tipo_transaccion.length < 15 ? (
                    <>

                    <Input
                    valid
                    type="text"
                    name="tipo_transaccion"
                    autoComplete="off"
                    max="0"
                    {...register("tipo_transaccion", {
                      required: {
                      value: true,
                      message: "Debe ingresar una tipo transaccion ",
                       },
                      maxLength: {
                        value: 15,
                        message:
                          "El nombre no debe tener mas de quince letras!",
                      },
                      max: {
                        value: 0,
                        message: "El nombre no puede comenzar con numeros",
                      },
                    })}
                  />
                  <span className="err">
                    {errors?.tipo_transaccion?.message}
                  </span>
                  
                     </>
                  ) : (

                    <>
                    <Input
                    invalid
                    type="text"
                    name="tipo_transaccion"
                    autoComplete="off"
                    max="0"
                    {...register("tipo_transaccion", {
                       required: {
                         value: true,
                         message: "Debe ingresar una tipo transaccion ",
                       },
                      maxLength: {
                        value: 15,
                        message:
                          "El nombre no debe tener mas de quince letras!",
                      },
                      max: {
                        value: 0,
                        message: "El nombre no puede comenzar con numeros",
                      },
                    })}
                  />
                  <span className="err">
                    {errors?.tipo_transaccion?.message}
                  </span>
                  
                     </>
                  )
                   
                  }
                
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
      {/* </Col> */}
      {/* </Row> */}
      {/* </div> */}
      {/* <div className="contenedorActualesUM">
        Tipos de Transacción Actuales
        <div className="tiposUM">
          {transaccion.map((u, index) => (
            <span key={index} className="spansUM">
              {u.tipo_transaccion}
            </span>
          ))}
        </div> */}
      {/* </div>
      </CardBody> */}
    </>
  );
}

export default PutTipoTrans;
