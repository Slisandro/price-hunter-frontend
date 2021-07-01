import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMoneda,
  getRegion,
  paisPost,
  getPais,
  getPaises,
} from "../../../Redux/actions";
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
      let ide = region.find((id) => id.nombre_region === e.target.value);
      var idRegion = ide.id;
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
    reset,
  } = useForm();

  const submit = (data, e) => {
    for (let i = 0; i < paises.length; i++) {
      if (
        data.nombre_pais.toUpperCase() ===
          paises[i].nombre_pais.toUpperCase() ||
        data.codigo_alfa.toUpperCase() === paises[i].codigo_alfa.toUpperCase()
      ) {
        return swal({
          title: "El pais o el codigo ya existen",
          icon: "warning",
          button: "Aceptar",
          timer: "5000",
        });
      }
    }

    if (!data.codigo_alfa && !data.nombre_pais) {
      // const nuevoPais = {
      //   codigo_alfa: pais.codigo_alfa.toLocaleUpperCase(),
      //   nombre_pais: pais.nombre_pais,
      //   regioneId: pais.regioneId,
      //   monedaCodigoMoneda: pais.monedaCodigoMoneda,
      // };
      return swal({
        title: "Debe ingresar un nombre y un codigo para el nuevo pais!",
        icon: "error",
        button: "Aceptar",
        timer: "5000",
      });
    } else {
      dispatch(paisPost(data));

      e.target.reset();
      swal({
        title: "Pais agregado con éxito!",
        icon: "success",
        button: "Aceptar",
        timer: "5000",
      }).then(() => {
        dispatch(getPais());
        setPais({
          codigo_alfa: "",
          nombre_pais: "",
          regioneId: "",
          monedaCodigoMoneda: "",
        });
        reset({ data });
      });
    }
  };
  return (
    <Card className="card-chart">
      <CardHeader>
        <span id="title">Países</span>
      </CardHeader>
      <CardBody>
        <Form
          id="survey-form"
          onChange={(e) => ChangeInput(e)}
          onSubmit={handleSubmit(submit)}
        >
          <Row>
            <Col>
              <h6 className="title">Países Actuales</h6>
              <Input name="nombre_pais" type="select" className="inp">
                <option></option>
                {paises.map((u) => (
                  <option value={u.nombre_pais}>{u.nombre_pais}</option>
                ))}
              </Input>
              <div style={{ marginTop: "1rem" }}>
                <h6 className="title">Nuevo País</h6>
                {!pais.nombre_pais ? (
                  <>
                    <Input
                      className="inp"
                      type="text"
                      name="nombre_pais"
                      autoComplete="off"
                      {...register("nombre_pais", {
                        required: {
                          value: true,
                          message: "Debe ingresar un nombre para el país",
                        },
                        maxLength: {
                          value: 20,
                          message:
                            "El Nombre no debe tener más de veinte caracteres",
                        },
                        minLength: {
                          value: 3,
                          message:
                            "El Nombre no debe tener menos de tres caracteres",
                        },
                      })}
                    />
                    <span className="err">{errors?.nombre_pais?.message}</span>
                  </>
                ) : pais.nombre_pais.length >= 3 && isNaN(pais.nombre_pais) ? (
                  <>
                    <Input
                      valid
                      className="inp"
                      type="text"
                      name="nombre_pais"
                      autoComplete="off"
                      {...register("nombre_pais", {
                        required: {
                          value: true,
                          message: "Debe ingresar un nombre para el país",
                        },
                        maxLength: {
                          value: 20,
                          message:
                            "El Nombre no debe tener más de veinte caracteres",
                        },
                        minLength: {
                          value: 2,
                          message:
                            "El Nombre no debe tener menos de dos caracteres",
                        },
                      })}
                    />
                    <span className="err">{errors?.nombre_pais?.message}</span>
                  </>
                ) : (
                  <>
                    <Input
                      invalid
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
                          value: 20,
                          message:
                            "El Nombre no debe tener más de veinte caracteres",
                        },
                        minLength: {
                          value: 3,
                          message:
                            "El Nombre no debe tener menos de tres caracteres",
                        },
                        max: {
                          value: 0,
                          message: "El nombre no puede comenzar con numeros",
                        },
                      })}
                    />
                    <span className="err">{errors?.nombre_pais?.message}</span>
                  </>
                )}
              </div>
              <div style={{ marginTop: "1rem" }}>
                <h6 className="title">Codigo</h6>
                {!pais.codigo_alfa ? (
                  <>
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
                          message:
                            "El código debe tener tres caracteres (Alfabéticos)",
                        },
                        minLength: {
                          value: 3,
                          message:
                            "El código debe tener tres caracteres (Alfabéticos)",
                        },
                      })}
                    />
                    <span className="err">{errors?.codigo_alfa?.message}</span>
                  </>
                ) : pais.codigo_alfa.length === 3 && isNaN(pais.codigo_alfa) ? (
                  <>
                    <Input
                      valid
                      className="inp"
                      type="text"
                      name="codigo_alfa"
                      autoComplete="off"
                      {...register("codigo_alfa", {
                        // required: {
                        //   value: true,
                        //   message: "Debe ingresar un codigo para el pais ",
                        // },
                        maxLength: {
                          value: 3,
                          message:
                            "El código debe tener tres caracteres (Alfabéticos)",
                        },
                        minLength: {
                          value: 3,
                          message:
                            "El código debe tener tres caracteres (Alfabéticos)",
                        },
                      })}
                    />
                    <span className="err">{errors?.codigo_alfa?.message}</span>
                  </>
                ) : (
                  <>
                    <Input
                      invalid
                      className="inp"
                      type="text"
                      name="codigo_alfa"
                      autoComplete="off"
                      {...register("codigo_alfa", {
                        // required: {
                        //   value: true,
                        //   message: "Debe ingresar un codigo para el pais ",
                        // },
                        maxLength: {
                          value: 3,
                          message:
                            "El código debe tener tres caracteres (Alfabéticos)",
                        },
                        minLength: {
                          value: 3,
                          message:
                            "El código debe tener tres caracteres (Alfabéticos)",
                        },
                      })}
                    />
                    <span className="err">{errors?.codigo_alfa?.message}</span>
                  </>
                )}
              </div>
              <div style={{ marginTop: "1rem" }}>
                <h6 className="title">Región</h6>
                {pais.regioneId.length === 0 ? (
                  <>
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
                        <option value={f.nombre_region}>
                          {f.nombre_region}
                        </option>
                      ))}
                    </Input>
                    <span className="err">
                      {errors?.nombre_region?.message}
                    </span>
                  </>
                ) : (
                  <>
                    <Input
                      valid
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
                        <option value={f.nombre_region}>
                          {f.nombre_region}
                        </option>
                      ))}
                    </Input>
                    <span className="err">
                      {errors?.nombre_region?.message}
                    </span>
                  </>
                )}
              </div>
              <div style={{ marginTop: "1rem" }}>
                <h6 className="title">Moneda</h6>
                {pais.monedaCodigoMoneda.length === 0 ? (
                  <>
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
                        <option value={f.codigo_moneda}>
                          {f.codigo_moneda}
                        </option>
                      ))}
                    </Input>
                    <span className="err">
                      {errors?.codigo_moneda?.message}
                    </span>
                  </>
                ) : (
                  <>
                    <Input
                      valid
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
                        <option value={f.codigo_moneda}>
                          {f.codigo_moneda}
                        </option>
                      ))}
                    </Input>
                    <span className="err">
                      {errors?.codigo_moneda?.message}
                    </span>
                  </>
                )}
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
