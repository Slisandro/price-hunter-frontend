import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getFamilia,
  getCategoria,
  categoriaPost,
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

function Cate() {
  const dispatch = useDispatch();
  const familia = useSelector((store) => store.familia);
  const categoria = useSelector((store) => store.categoria);

  const [fam, setFam] = useState({
    nombre_familia: "",
    descripcion: "",
    id: "",
  });

  useEffect(() => {
    dispatch(getFamilia());
    dispatch(getCategoria());
  }, [dispatch]);

  const [cate, setCate] = useState({
    nombre_categoria: "",
    descripcion: "",
    familiumId: "",
  });

  const ChangeInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "nombre_familia") {
      setFam({
        ...fam,
        [name]: value,
      });
    }
    if (name === "nombre_categoria") {
      setCate({
        ...cate,
        [name]: value,
      });
    }
    if (name === "descripcion") {
      setCate({
        ...cate,
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
    for (let i = 0; i < categoria.length; i++) {
      if (
        data.nombre_categoria.toUpperCase() ===
        categoria[i].nombre_categoria.toUpperCase()
      ) {
        return swal({
          title: "La categoria ya existe",
          icon: "warning",
          button: "Aceptar",
          timer: "5000",
        });
      }
    }

    if (!data.nombre_categoria) {
      return swal({
        title: "Agregue una Categoria!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    } else {
      dispatch(categoriaPost(data));

      e.target.reset();
      reset({ data });
      return swal({
        title: "Categoría agregada con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then((g) => {
        dispatch(getCategoria());

        setCate({
          nombre_categoria: "",
          descripcion: "",
          familiumId: "",
        });
        setFam({
          nombre_familia: "",
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
          <span id="title">Categorías</span>
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
                <h6 className="title">Familia</h6>
                {fam.nombre_familia.length === 0 ? (
                  <>
                    <Input
                      name="nombre_familia"
                      type="select"
                      className="inp"
                      onChange={(e) => ChangeInput(e)}
                      {...register("nombre_familia", {
                        required: {
                          value: true,
                          message: "Debe seleccionar una familia",
                        },
                      })}
                    >
                      <option></option>
                      {familia.map((f) => (
                        <option value={f.nombre_familia}>
                          {f.nombre_familia}
                        </option>
                      ))}
                    </Input>
                  </>
                ) : (
                  <>
                    <Input
                      valid
                      name="nombre_familia"
                      type="select"
                      className="inp"
                      onChange={(e) => ChangeInput(e)}
                      {...register("nombre_familia", {})}
                    >
                      <option></option>
                      {familia.map((f) => (
                        <option value={f.nombre_familia}>
                          {f.nombre_familia}
                        </option>
                      ))}
                    </Input>
                  </>
                )}
                <span className="err">{errors?.nombre_familia?.message}</span>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Nueva Categoría</h6>
                  {cate.nombre_categoria.length === 0 ? (
                    <>
                      <Input
                        name="nombre_categoria"
                        className="inp"
                        placeholder="Agregar Categoria"
                        autoComplete="off"
                        onChange={(e) => ChangeInput(e)}
                        {...register("nombre_categoria", {
                          required: {
                            value: true,
                            message: "Debe ingresar un nombre ",
                          },
                        })}
                      />
                    </>
                  ) : cate.nombre_categoria.length > 2 &&
                    cate.nombre_categoria.length < 16 ? (
                    <>
                      <Input
                        valid
                        name="nombre_categoria"
                        className="inp"
                        autoComplete="off"
                        onChange={(e) => ChangeInput(e)}
                        {...register("nombre_categoria", {})}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        invalid
                        name="nombre_categoria"
                        className="inp"
                        max="0"
                        autoComplete="off"
                        onChange={(e) => ChangeInput(e)}
                        {...register("nombre_categoria", {
                          maxLength: {
                            value: 15,
                            message:
                              "El nombre no debe tener mas de quince caracteres!",
                          },
                          minLength: {
                            value: 3,
                            message:
                              "El nombre debe al menos tener tres caracteres!",
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
                    {errors?.nombre_categoria?.message}
                  </span>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <h6 className="title">Descripción (opcional)</h6>
                  {cate.descripcion.length === 0 ? (
                    <>
                      <Input
                        className="inp6"
                        type="text"
                        name="descripcion"
                        autoComplete="off"
                        max="0"
                      />
                    </>
                  ) : cate.descripcion.length > 5 &&
                    cate.descripcion.length < 256 ? (
                    <>
                      <Input valid {...register("descripcion", {})} />
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

export default Cate;
