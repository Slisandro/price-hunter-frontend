import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMoneda,
  getRegion,
  paisPost,
  mostrarError,
  getPais,
  getPaises,
} from "../../../Redux/actions";
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
import { useForm } from "react-hook-form";
import swal from "sweetalert";

function Paises() {
  const dispatch = useDispatch();
  const region = useSelector((store) => store.region);
  const moneda = useSelector((store) => store.moneda);
  const paises = useSelector((store) => store.paises);

  const [pais, setPais] = useState({
    codigo_alfa: "",
    nombre_pais: "",
    regioneId: "",
    monedaCodigoMoneda: "",
  });

  useEffect(() => {
    dispatch(getRegion());
    dispatch(getMoneda());
    dispatch(getPais());
    dispatch(getPaises());
  }, [dispatch]);

  const ChangeInput = (e) => {
    const target = e.target;
    const name = target.name;

    if (name === "nombre_pais") {
      setPais({
        ...pais,
        [name]: target.value,
      });
    }
    if (name === "codigo_alfa") {
      setPais({
        ...pais,
        [name]: target.value,
      });
    }
    if (name === "nombre_region") {
      let id = region.find((id) => id.nombre_region === e.target.value);
      let idRegion = id.id;
      setPais({
        ...pais,
        regioneId: idRegion,
      });
    }
    if (name === "codigo_moneda") {
      let id = moneda.find((id) => id.codigo_moneda === e.target.value);
      let idMoneda = id.codigo_moneda;
      setPais({
        ...pais,
        monedaCodigoMoneda: idMoneda,
      });
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const alerta = useSelector((store) => store.alerta);

  const submit = (data, e) => {
    if (pais.codigo_alfa && pais.nombre_pais) {
      const nuevoPais = {
        codigo_alfa: pais.codigo_alfa.toLocaleUpperCase(),
        nombre_pais: pais.nombre_pais,
        regioneId: pais.regioneId,
        monedaCodigoMoneda: pais.monedaCodigoMoneda,
      };

      dispatch(paisPost(nuevoPais));

      e.target.reset();
      swal({
        title: "Pais agregado con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      });

      setPais({
        codigo_alfa: "",
        nombre_pais: "",
        regioneId: "",
        monedaCodigoMoneda: "",
      });
    }
  };
  return (
    <Card className="card-chart">
      <CardHeader>
        <h1 id="title">Países</h1>
      </CardHeader>
      <CardBody>
        <Form
          id="survey-form"
          onChange={(e) => ChangeInput(e)}
          onSubmit={handleSubmit(submit)}
        >
          {/* {alerta ? (
          <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
        ) : null} */}
          <Row>
            <Col>
              <label className="title">Países Actuales</label>
              <Input name="nombre_pais" type="select" className="inp">
                <option></option>
                {paises.map((u) => (
                  <option value={u.nombre_pais}>{u.nombre_pais}</option>
                ))}
              </Input>
              <label className="title">Nuevo País</label>
              <Input
                className="inp"
                type="text"
                name="nombre_pais"
                autoComplete="off"
                {...register("nombre_pais", {
                  required: {
                    value: true,
                    message: "Debe ingresar un nombre para el pais",
                  },
                  maxLength: {
                    value: 10,
                    message: "El Nombre no debe tener mas de diez caracteres",
                  },
                  minLength: {
                    value: 2,
                    message: "El Nombre no debe tener menos de dos caracteres",
                  },
                })}
              />
              {/* <span className="err">{errors?.nombre_pais?.message}</span> */}

              <div>
                <label className="title">Codigo</label>
                <Input
                  className="inp"
                  type="text"
                  name="codigo_alfa"
                  autoComplete="off"
                  {...register("codigo_alfa", {
                    required: {
                      value: true,
                      message: "Debe ingresar un codigo para el pais ",
                    },
                    maxLength: {
                      value: 3,
                      message: "El codigo debe tener tres caracteres",
                    },
                    minLength: {
                      value: 3,
                      message: "El codigo debe tener tres caracteres",
                    },
                  })}
                />
                <span className="err">{errors?.codigo_alfa?.message}</span>
              </div>
              <div>
                <label className="title">Región</label>
                <Input
                  type="select"
                  name="nombre_region"
                  className="selectUbi"
                  onChange={(e) => ChangeInput(e)}
                  {...register("nombre_region", {
                    required: {
                      value: true,
                      message: "Debe seleccionar una region",
                    },
                  })}
                >
                  <option></option>
                  {region.map((f) => (
                    <option value={f.nombre_region}>{f.nombre_region}</option>
                  ))}
                </Input>
                <span className="err">{errors?.nombre_region?.message}</span>
              </div>
              <div>
                <label className="title">Moneda</label>
                <Input
                  name="codigo_moneda"
                  type="select"
                  className="selectUbi"
                  onChange={(e) => ChangeInput(e)}
                  {...register("codigo_moneda", {
                    required: {
                      value: true,
                      message: "Debe seleccionar una moneda",
                    },
                  })}
                >
                  <option></option>
                  {moneda.map((f) => (
                    <option value={f.codigo_moneda}>{f.codigo_moneda}</option>
                  ))}
                </Input>
                <span className="err">{errors?.codigo_moneda?.message}</span>
              </div>
              <Button className="btn-fill" color="primary" type="submit" block>
                Agregar
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
}

export default Paises;
