import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategoria,
  getCategorias,
  subcategoriaPost,
  getSubcategoria,
  mostrarError,
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

function Subcate({ setSwitcher }) {
  const dispatch = useDispatch();
  const categoria = useSelector((store) => store.categoria);
  const categorias = useSelector((store) => store.categorias);
  const subcategoria = useSelector((store) => store.subcategoria);
  const alerta = useSelector((store) => store.alerta);

  useEffect(() => {
    dispatch(getCategoria());
    dispatch(getCategorias());
    dispatch(getSubcategoria());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [cate, setCate] = useState({
    nombre_categoria: "",
    descripcion: "",
    id: null,
  });

  const [subcate, setSubcate] = useState({
    nombre_subcategoria: "",
    descripcion: "",
    categoriumId: null,
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "nombre_categoria") {
      var ca = categoria.find((f) => f.nombre_categoria === e.target.value);
      var final = ca.id;
      setCate({
        ...cate,
        [name]: target.value,
        id: final,
      });
    }

    if (name === "nombre_subcategoria") {
      var ca = categoria.find((f) => f.nombre_categoria === e.target.value);
      var final = cate.id;
      setSubcate({
        ...subcate,
        categoriumId: final,
        [name]: target.value,
      });
    }
    if (name === "descripcion") {
      setSubcate({
        ...subcate,
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
    const nuevaSubcate = {
      nombre_subcategoria: subcate.nombre_subcategoria,
      descripcion: subcate.descripcion,
      categoriumId: subcate.categoriumId,
    };

    console.log(nuevaSubcate);

    if (!nuevaSubcate.nombre_subcategoria) {
      alert("Por favor, ingrese una sub-categoria de producto");
      return;
    }

    if (categoria.includes(subcate.nombre_subcategoria)) {
      alert("Sub-Categoría de producto existente");
      return;
    }

    if (!isNaN(parseInt(nuevaSubcate.nombre_subcategoria))) {
      dispatch(
        mostrarError("El nombre solo puede contener letras", "alerta-error")
      );
      return;
    }

    dispatch(subcategoriaPost(nuevaSubcate));

    e.target.reset();

    swal({
      title: "Sub-Categoría agregada con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    });

    setSubcate({
      nombre_subcategoria: "",
      descripcion: "",
      categoriumId: "",
    });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h1 id="title">Sub-Categorías</h1>
        </CardHeader>
        <CardBody>
          <Form
            className="formFamilia"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={handleSubmit(submit)}
          >
            {/* {alerta ? (
            <span className={`alerta ${alerta.categoria}`}>{alerta.msg}</span>
          ) : null} */}
            <Row>
              <Col>
                <label className="title">Categoría</label>
                <Input
                  type="select"
                  name="nombre_categoria"
                  className="selectTransAgregar"
                  onChange={(e) => ChangeInput(e)}
                  {...register("nombre_categoria", {
                    required: {
                      value: true,
                      message: "Debe seleccionar una categoria",
                    },
                  })}
                >
                  <option></option>
                  {categoria.map((f) => (
                    <option value={f.nombre_categoria}>
                      {f.nombre_categoria}
                    </option>
                  ))}
                </Input>
                <span className="err">{errors?.nombre_categoria?.message}</span>

                <label className="title">Nueva Sub-Categoría</label>
                <Input
                  value={subcate.nombre_subcategroia}
                  name="nombre_subcategoria"
                  className="inp"
                  max="0"
                  autoComplete="off"
                  {...register("nombre_subcategoria", {
                    required: {
                      value: true,
                      message: "Debe ingresar un nombre ",
                    },
                    maxLength: {
                      value: 15,
                      message: "El nombre no debe tener mas de quince letras!",
                    },
                    minLength: {
                      value: 3,
                      message: "El nombre debe al menos tener tres letras!",
                    },
                    max: {
                      value: 0,
                      message: "El nombre no puede comenzar con numeros",
                    },
                  })}
                />
                <span className="err">
                  {errors?.nombre_subcategoria?.message}
                </span>

                <label className="title">* Descripción</label>
                <Input
                  className="inp6"
                  type="text"
                  name=""
                  autoComplete="off"
                  max="0"
                  {...register("descripcion", {
                    // required: {
                    //   value: true,
                    //   message: "Debe ingresar un descripcion ",
                    // },
                    maxLength: {
                      value: 256,
                      message:
                        "La descripcion no debe tener mas de 256 caracteres!",
                    },
                    minLength: {
                      value: 5,
                      message:
                        "La descripcion debe tener al menos cinco letras!",
                    },
                    max: {
                      value: 0,
                      message: "La descripcion no puede comenzar con numeros",
                    },
                  })}
                />
                <span className="err">{errors?.descripcion?.message}</span>

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
          </Form>
        </CardBody>
      </Card>
    </>
  );
}

export default Subcate;
