import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFamilia, familiaPost, mostrarError } from "../../../Redux/actions";
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

function Fami({ setSwitcher }) {
  const dispatch = useDispatch();
  const familia = useSelector((store) => store.familia);
  const alerta = useSelector((store) => store.alerta);

  // var mapeado = familia.map((fa) => fa.nombre_familia);

  useEffect(() => {
    dispatch(getFamilia());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [fam, setFam] = useState({
    nombre_familia: "",
    descripcion: "",
  });

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "nombre_familia") {
      var fa = familia.find((f) => f.nombre_familia === e.target.value);
      var final = fa.id;
      setFam({
        ...fam,
        [name]: target.value,
        id: final,
      });
    } else if (name === "agregar_familia") {
      setFam({
        ...fam,
        nombre_familia: target.value,
        id: final,
      });
    } else if (name === "descripcion") {
      setFam({
        ...fam,
        descripcion: target.value,
      });
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data, e) => {
    const nuevaFamilia = {
      nombre_familia: fam.nombre_familia,
      descripcion: fam.descripcion,
    };

    if (!nuevaFamilia.nombre_familia) {
      alert("Por favor, ingrese una familia de producto");
      return;
    }

    if (familia.includes(fam.nombre_familia)) {
      alert("Familia de producto existente");
      return;
    }

    if (!isNaN(parseInt(nuevaFamilia.nombre_familia))) {
      dispatch(
        mostrarError("El nombre solo puede contener letras", "alerta-error")
      );
      return;
    }

    dispatch(familiaPost(nuevaFamilia));

    e.target.reset();

    swal({
      title: "Familia agregada con éxito!",
      icon: "success",
      button: "Aceptar",
      timer: "5000",
    }).then((g) => dispatch(getFamilia()));

    setFam({
      nombre_familia: "",
      descripción: "",
    });
  };

  return (
    <>
      <Card className="card-chart">
        <CardHeader>
          <h1 id="title">Familias</h1>
        </CardHeader>
        <CardBody>
          <Form
            className="form"
            noValidate
            onChange={(e) => ChangeInput(e)}
            onSubmit={handleSubmit(submit)}
          >
            {/* {alerta ? (
            <span className={`alerta ${alerta.categoria}`}>{alerta.msg}</span>
          ) : null} */}
            <Row>
              <Col>
                <label className="title">Familias Actuales</label>
                <Input type="select" className="inp">
                  <option></option>
                  {familia.map((u) => (
                    <option value={u.nombre_familia}>{u.nombre_familia}</option>
                  ))}
                </Input>
                <label className="title">Familia</label>
                <Input
                  name="agregar_familia"
                  placeholder="Agregar Familia"
                  className="inp"
                  autoComplete="off"
                  max="0"
                  {...register("agregar_familia", {
                    required: {
                      value: true,
                      message: "Debe ingresar un familia ",
                    },
                    maxLength: {
                      value: 20,
                      message: "La familia debe tener menos de veinte letras!",
                    },
                    minLength: {
                      value: 3,
                      message: "La familia debe tener tres letras!",
                    },
                    max: {
                      value: 0,
                      message: "La familia no puede comenzar con numeros",
                    },
                  })}
                />
                <span className="err">{errors?.agregar_familia?.message}</span>

                <label className="title">* Descripción</label>
                <Input
                  className="inp6"
                  type="text"
                  name="descripcion"
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

export default Fami;
