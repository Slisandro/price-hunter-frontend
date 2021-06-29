import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoriaPorId,
  getSubcategoriaPorId,
  putSubCategoria,
  getCategoria,
  getFamilia,
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
// import "./FormUnidadMedida.css";

function PutSubCate() {
  const dispatch = useDispatch();
  const categorias = useSelector((store) => store.categoria);
  const categoriaId = useSelector((store) => store.categorias);
  const subcategoria = useSelector((store) => store.subcategoria);
  const familia = useSelector((store) => store.familia);

  useEffect(() => {
    dispatch(getCategoria());
    dispatch(getFamilia());
  }, [dispatch]);

  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "Familia") dispatch(getCategoriaPorId(value));
    if (name === "Categoria") dispatch(getSubcategoriaPorId(value));
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const submit = (data, e) => {
    if (data.Subcategoria) {
      let datos = {
        id: data.Subcategoria,
        nombre_subcategoria: data.nombre_subcategoria,
        categoriumId: data.categoria,
        descripcion: data.descripcion,
      };

      dispatch(putSubCategoria(datos));
      e.target.reset();
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      });
    } else {
      swal({
        title:
          "Debe seleccionar familia, categoria y subcategoria a modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
    reset({ data });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h1 id="title">Sub-Categorías</h1>
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
                <label className="title">Familia</label>
                <Input
                  name="Familia"
                  className="inp"
                  type="select"
                  onChange={(e) => ChangeInput(e)}
                  {...register("Familia", {
                    // required: {
                    //   value: true,
                    //   message: "Debe seleccionar una Familia de Productos",
                    // },
                  })}
                >
                  <option></option>
                  {familia.map((f, index) => (
                    <option key={index} value={f.id}>
                      {f.nombre_familia}
                    </option>
                  ))}
                </Input>
                <span className="err">{errors?.Familia?.message}</span>

                <div>
                  <label className="title">Categorias</label>
                  <Input
                    name="Categoria"
                    className="inp"
                    type="select"
                    onChange={(e) => ChangeInput(e)}
                    {...register("Categoria", {
                      // required: {
                      //   value: true,
                      //   message: "Debe seleccionar una Familia de Productos",
                      // },
                    })}
                  >
                    <option></option>
                    {categoriaId.map((f, index) => (
                      <option key={index} value={f.id}>
                        {f.nombre_categoria}
                      </option>
                    ))}
                  </Input>
                  <span className="err">{errors?.Familia?.message}</span>
                </div>

                <div>
                  <label className="title">Subcategoria</label>
                  <Input
                    name="Subcategoria"
                    className="inp"
                    type="select"
                    onChange={(e) => ChangeInput(e)}
                    {...register("Subcategoria", {
                      // required: {
                      //   value: true,
                      //   message: "Debe seleccionar una Familia de Productos",
                      // },
                    })}
                  >
                    <option></option>
                    {subcategoria.map((f, index) => (
                      <option key={index} value={f.id}>
                        {f.nombre_subcategoria}
                      </option>
                    ))}
                  </Input>
                  <span className="err">{errors?.Subcategoria?.message}</span>
                </div>

                <div>
                  <label className="title">Nuevo Nombre de Sub-Categoría</label>
                  <Input
                    className="inp"
                    type="text"
                    name="nombre_subcategoria"
                    autoComplete="off"
                    max="0"
                    {...register("nombre_subcategoria", {
                      maxLength: {
                        value: 20,
                        message:
                          "El nombre no debe tener mas de veinte letras!",
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
                  />
                  <span className="err">
                    {errors?.nombre_subcategoria?.message}
                  </span>
                </div>

                <div>
                  <label className="title">Nueva Categoria</label>
                  <Input
                    name="categoria"
                    className="inp"
                    type="select"
                    onChange={(e) => ChangeInput(e)}
                    {...register("categoria", {
                      // required: {
                      //   value: true,
                      //   message: "Debe seleccionar una Familia de Productos",
                      // },
                    })}
                  >
                    <option></option>
                    {categorias.map((f, index) => (
                      <option key={index} value={f.id}>
                        {f.nombre_categoria}
                      </option>
                    ))}
                  </Input>
                  <span className="err">{errors?.categoria?.message}</span>
                </div>

                <div className="divForm">
                  <label className="title">Descripcion</label>
                  <Input
                    className="inp"
                    type="textarea"
                    name="descripcion"
                    autoComplete="off"
                    max="0"
                    {...register("descripcion", {
                      maxLength: {
                        value: 256,
                        message: "Supera la cantidad maxima de caracteres!",
                      },
                      max: {
                        value: 0,
                        message: "La descripcion no puede comenzar con numeros",
                      },
                    })}
                  />
                  <span className="err">{errors?.descripcion?.message}</span>
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
      {/* <div className="contenedorActualesUM">
        Sub-Categorías Actuales
        <div className="tiposUM">
          {subcategoria.map((u) => (
            <span className="spansUM">{u.nombre_subcategoria}</span>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default PutSubCate;
