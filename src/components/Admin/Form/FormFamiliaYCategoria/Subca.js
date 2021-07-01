import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategoria,
  subcategoriaPost,
  getSubcategoria,
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

function Subcate() {
  const dispatch = useDispatch();
  const categoria = useSelector((store) => store.categoria);
  const subcategoria = useSelector((store) => store.subcategoria);

  useEffect(() => {
    dispatch(getCategoria());
    dispatch(getSubcategoria());
  }, [dispatch]);

  const [cate, setCate] = useState({
    nombre_categoria: "",
    descripcion: "",
    id: "",
  });

  const [subcate, setSubcate] = useState({
    nombre_subcategoria: "",
    descripcion: "",
    categoriumId: '',
  });

  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "nombre_categoria") {
      setCate({
        ...cate,
        [name]: value,
      });
    }

    if (name === "nombre_subcategoria") {
      setSubcate({
        ...subcate,
        [name]: value,
      });
    }
    if (name === "descripcion") {
      setSubcate({
        ...subcate,
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
    for (let i = 0; i < subcategoria.length; i++) {
      if (data.nombre_subcategoria.toUpperCase() === subcategoria[i].nombre_subcategoria.toUpperCase()) {
        return swal({
          title: "La categoria ya existe, debe agregar otra",
          icon: "warning",
          button: "Aceptar",
          timer: "5000",
        });
      }
    }
    if (!data.nombre_subcategoria) {
      return swal({
        title: "Agregue una Subcategoria!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    } else {
      dispatch(subcategoriaPost(data));

      e.target.reset();

      return swal({
        title: "Subcategoría agregada con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then(() => {
        reset({ data });
        setSubcate({
          nombre_subcategoria: "",
          descripcion: "",
          categoriumId: '',
        });
        setCate({
          nombre_categoria: "",
          descripcion: "",
          id: "",
        });
      });
    }
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <span id="title">Subcategorías</span>
        </CardHeader>
        <CardBody>
          <Form
            className="form"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={handleSubmit(submit)}
          >
            <Row>
              <Col>
                <h6 className="title">Categoría</h6>
                {cate.nombre_categoria.length === 0 ? (
                  <>
                    <Input
                      type="select"
                      name="nombre_categoria"
                      className="inp"
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
                  </>
                ) : (
                  <>
                    <Input
                      valid
                      type="select"
                      name="nombre_categoria"
                      className="inp"
                      onChange={(e) => ChangeInput(e)}
                      {...register("nombre_categoria", {
                       
                      })}
                    >
                      <option></option>
                      {categoria.map((f) => (
                        <option value={f.nombre_categoria}>
                          {f.nombre_categoria}
                        </option>
                      ))}
                    </Input>
                  </>
                )}
                <span className="err">{errors?.nombre_categoria?.message}</span>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nueva Subcategoría</h6>
                  {subcate.nombre_subcategoria.length === 0 ? (
                    <>
                      <Input
                        name="nombre_subcategoria"
                        className="inp"
                        max="0"
                        autoComplete="off"
                        placeholder="Agregar Subcategoria"
                        onChange={(e) => ChangeInput(e)}
                        {...register("nombre_subcategoria", {
                          required: {
                            value: true,
                            message: "Debe ingresar un nombre",
                          },
                        })}
                      />
                    </>
                  ) : subcate.nombre_subcategoria.length > 2 &&
                    subcate.nombre_subcategoria.length < 16 ? (
                    <>
                      <Input
                        valid
                        name="nombre_subcategoria"
                        className="inp"
                        max="0"
                        autoComplete="off"
                        onChange={(e) => ChangeInput(e)}
                        {...register("nombre_subcategoria", {})}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        name="nombre_subcategoria"
                        className="inp"
                        max="0"
                        autoComplete="off"
                        onChange={(e) => ChangeInput(e)}
                        {...register("nombre_subcategoria", {
                          maxLength: {
                            value: 15,
                            message:
                              "El nombre no debe tener mas de quince letras!",
                          },
                          minLength: {
                            value: 3,
                            message:
                              "El nombre debe al menos tener tres letras!",
                          },
                          max: {
                            value: 0,
                            message: "El nombre no puede comenzar con numeros",
                          },
                        })}
                      />
                    </>
                  )}

                  <span className="err">
                    {errors?.nombre_subcategoria?.message}
                  </span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Descripción (opcional)</h6>
                  {subcate.descripcion.length === 0 ? (
                    <>
                      <Input
                        className="inp6"
                        type="text"
                        name="descripcion"
                        autoComplete="off"
                        max="0"
                      />
                    </>
                  ) : subcate.descripcion.length > 5 &&
                    subcate.descripcion.length < 256 ? (
                    <>
                      <Input
                        valid
                        {...register("descripcion", {
                          
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
