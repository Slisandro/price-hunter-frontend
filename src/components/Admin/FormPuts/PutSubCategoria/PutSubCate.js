import React, { useState, useEffect } from "react";
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
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

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

  const [state, setState] = useState({
    id: "",
    nombre_subcategoria: "",
    categoriumId: "",
    descripcion: "",
    categoria: "",
    familia: "",
  });

  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "familia") dispatch(getCategoriaPorId(value));
    if (name === "categoria") dispatch(getSubcategoriaPorId(value));

    if (name === "familia") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "categoria") {
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
    if (name === "nombre_subcategoria") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "categoriumId") {
      setState({
        ...state,
        [name]: value,
      });
    }
    if (name === "descripcion") {
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
    if (data.id && data.id.length > 0) {
      dispatch(putSubCategoria(data));
      e.target.reset();
      swal({
        title: "Los datos se modificaron con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      });
      reset({ data });
    } else {
      swal({
        title:
          "Debe seleccionar familia, categoria y subcategoria a modificar!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    }
    setState({
      id: "",
      nombre_subcategoria: "",
      categoriumId: "",
      descripcion: "",
      categoria: "",
      familia: "",
    });
    
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <span id="title">Subcategorías</span>
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
                <h6 className="title">Familia</h6>
                {state.familia.length === 0 ? (
                  <Input
                    name="familia"
                    className="inp"
                    type="select"
                    onChange={(e) => ChangeInput(e)}
                  >
                    <option></option>
                    {familia.map((f, index) => (
                      <option key={index} value={f.id}>
                        {f.nombre_familia}
                      </option>
                    ))}
                  </Input>
                ) : (
                  <Input
                    valid
                    name="familia"
                    className="inp"
                    type="select"
                    onChange={(e) => ChangeInput(e)}
                  >
                    <option></option>
                    {familia.map((f, index) => (
                      <option key={index} value={f.id}>
                        {f.nombre_familia}
                      </option>
                    ))}
                  </Input>
                )}
                <span className="err">{errors?.Familia?.message}</span>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Categorias</h6>
                  {state.categoria.length === 0 ? (
                    <Input
                      name="categoria"
                      className="inp"
                      type="select"
                      onChange={(e) => ChangeInput(e)}
                    >
                      <option></option>
                      {categoriaId.map((f, index) => (
                        <option key={index} value={f.id}>
                          {f.nombre_categoria}
                        </option>
                      ))}
                    </Input>
                  ) : (
                    <Input
                      valid
                      name="categoria"
                      className="inp"
                      type="select"
                      onChange={(e) => ChangeInput(e)}
                    >
                      <option></option>
                      {categoriaId.map((f, index) => (
                        <option key={index} value={f.id}>
                          {f.nombre_categoria}
                        </option>
                      ))}
                    </Input>
                  )}
                  <span className="err">{errors?.Familia?.message}</span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Subcategoria a modificar</h6>
                  {state.id.length === 0 ? (
                    <Input
                      name="id"
                      className="inp"
                      type="select"
                      onChange={(e) => ChangeInput(e)}
                      {...register("id", {
                        // required: {
                        //   value: true,
                        //   message: "Debe seleccionar una Subcategoria",
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
                  ) : (
                    <Input
                      valid
                      name="id"
                      className="inp"
                      type="select"
                      onChange={(e) => ChangeInput(e)}
                      {...register("id", {})}
                    >
                      <option></option>
                      {subcategoria.map((f, index) => (
                        <option key={index} value={f.id}>
                          {f.nombre_subcategoria}
                        </option>
                      ))}
                    </Input>
                  )}
                  <span className="err">{errors?.id?.message}</span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nuevo Nombre de Sub-Categoría</h6>
                  {state.nombre_subcategoria.length === 0 ? (
                    <Input
                      className="inp"
                      type="text"
                      name="nombre_subcategoria"
                      autoComplete="off"
                      max="0"
                      {...register("nombre_subcategoria", {
                        // required: {
                        //   value: true,
                        //   message: "Debe seleccionar un codigo",
                        // },
                      })}
                    />
                  ) : state.nombre_subcategoria.length > 2 &&
                    state.nombre_subcategoria.length < 20 ? (
                    <Input
                      valid
                      className="inp"
                      type="text"
                      name="nombre_subcategoria"
                      autoComplete="off"
                      max="0"
                      {...register("nombre_subcategoria", {})}
                    />
                  ) : (
                    <Input
                      invalid
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
                  )}
                  <span className="err">
                    {errors?.nombre_subcategoria?.message}
                  </span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nueva Categoria</h6>
                  {state.categoriumId.length === 0 ? (
                    <Input
                      name="categoriumId"
                      className="inp"
                      type="select"
                      onChange={(e) => ChangeInput(e)}
                      {...register("categoriumId", {
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
                  ) : (
                    <Input
                      valid
                      name="categoriumId"
                      className="inp"
                      type="select"
                      onChange={(e) => ChangeInput(e)}
                      {...register("categoriumId", {})}
                    >
                      <option></option>
                      {categorias.map((f, index) => (
                        <option key={index} value={f.id}>
                          {f.nombre_categoria}
                        </option>
                      ))}
                    </Input>
                  )}
                  <span className="err">{errors?.categoriumId?.message}</span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Descripción (opcional)</h6>
                  {state.descripcion.length === 0 ? (
                    <>
                      <Input
                        className="inp6"
                        type="text"
                        name="descripcion"
                        autoComplete="off"
                        max="0"
                      />
                    </>
                  ) : state.descripcion.length > 5 &&
                    state.descripcion.length < 256 ? (
                    <>
                      <Input
                        valid
                        {...register("descripcion", {
                          required: {
                            value: true,
                            message: "Debe ingresar un descripcion ",
                          },
                        })}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        {...register("descripcion", {
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
                            message:
                              "La descripcion no puede comenzar con numeros",
                          },
                        })}
                      />
                    </>
                  )}
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
