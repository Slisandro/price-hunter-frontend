import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  putCategoria,
  getCategoria,
  mostrarError,
} from "../../../Redux/actions";
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

import "./PutCategorias.css";

function PutCategorías() {
  const dispatch = useDispatch();
  const unidad_medida = useSelector((store) => store.unidad_medida);
  const categoria = useSelector((store) => store.categoria);

  const [state, setState] = useState({
    nombre_categoria: "",
    nuevo_nombre_categoria: "",
    descripcion: "",
    id: null,
  });

  useEffect(() => {
    dispatch(getCategoria());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "nombre_categoria") {
      var cat = categoria.find((f) => f.nombre_categoria === e.target.value);
      var final = cat.id;
      setState({
        ...state,
        [name]: target.value,
        id: final,
      });
    } else if (name === "nuevo_nombre_categoria") {
      setState({
        ...state,
        [name]: target.value,
      });
    } else if (name === "descripcion") {
      setState({
        ...state,
        [name]: target.value,
      });
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
    const categoriaModificada = {
      nombre_categoria: state.nuevo_nombre_categoria,
      descripcion: state.descripcion,
      id: state.id,
    };

    dispatch(putCategoria(categoriaModificada));
    e.target.reset();
    if (categoriaModificada.nombre_categoria) {
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((r) => dispatch(getCategoria()));
    } else if (!categoriaModificada.nuevo_nombre_categoria) {
      swal({
        title: "Debe seleccionar una categoría para modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }

    setState({
      nombre_categoria: "",
      nuevo_nombre_categoria: "",
      descripcion: "",
      id: null,
    });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h1 id="title">Categorías</h1>
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
                <label className="title">Categoría</label>
                <Input type="select" name="nombre_categoria" className="inp">
                  <option></option>
                  {categoria.map((u) => (
                    <option value={u.nombre_categoria}>
                      {u.nombre_categoria}
                    </option>
                  ))}
                </Input>
                {/* <input
              className="inp"
              type="text"
              name="nombre_categoria"
              autoComplete="off"
              max="0"
              {...register("nombre_categoria", {
                required: {
                  value: true,
                  message: "Debe ingresar un nombre ",
                },
                maxLength: {
                  value: 15,
                  message: "El nombre debe tener menos de quince letras!",
                },
                minLength: {
                  value: 3,
                  message: "El nombre debe tener tres letras!",
                },
                max: {
                  value: 0,
                  message: "El nombre no puede comenzar con numeros",
                },
              })}
            /> */}
                {/* <span className="err">{errors?.nombre_unidad?.message}</span> */}
                {/* </div> */}
                {/* <div className="divForm"> */}
                <div>
                  <label className="title">Nueva Categoría</label>
                  <Input
                    className="inp"
                    type="text"
                    name="nuevo_nombre_categoria"
                    autoComplete="off"
                    max="0"
                    {...register("nuevo_nombre_categoria", {
                      // required: {
                      //   value: true,
                      //   message: "Debe ingresar una categoría ",
                      // },
                      max: {
                        value: 0,
                        message: "La categoría no puede comenzar con numeros",
                      },
                    })}
                  />
                  <span className="err">
                    {errors?.nuevo_nombre_categoria?.message}
                  </span>
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
      {/* <div className="contenedorActualesCATE">
        Categorías Actuales
        <div className="tiposCATE">
          {categoria.map((u) => (
            <span className="spansCATE">{u.nombre_categoria}</span>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default PutCategorías;
