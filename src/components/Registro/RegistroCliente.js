import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registrarCliente, mostrarError, getCiudades, getPaises } from '../Redux/actions';
import { Link } from "react-router-dom";
import {
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody,
    Col, Modal, ModalHeader, ModalBody, ModalFooter, Form

} from "reactstrap";
import NavCliente from "./NavCliente";




const RegistroCliente = (props) => {



    const alerta = useSelector((store) => store.alerta);
    const mensaje = useSelector((store) => store.mensaje);
    const autenticado = useSelector((store) => store.autenticado);
    const paises = useSelector((store) => store.paises);
    const ciudades = useSelector((store) => store.ciudades);



    const {
        buttonLabel,
        className
      } = props;
      const [modal, setModal] = useState(false);
      const [backdrop, setBackdrop] = useState(true);
      const [keyboard, setKeyboard] = useState(true);
    
      const toggle = () => setModal(!modal);
    
      const changeBackdrop = e => {
        let value = e.target.value;
        if (value !== 'static') {
          value = JSON.parse(value);
        }
        setBackdrop(value);
      }
    
      const changeKeyboard = e => {
        setKeyboard(e.currentTarget.checked);
      }
    


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getPaises())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const handleCity = e => {
        dispatch(getCiudades(e.target.value))
    }




    const [registroCliente, guardarRegistroCliente] = useState({

        razon_social: "",
        nombre_cial_fantasia: "",
        cuit_nit_rut: "",
        email: "",
        telefono: "",
        direccion_fiscal: "",
        metodo_pago: "",
        banco: "",
        numero_cuenta: "",
        password: "",
        confirmarpassword: "",
        ciudadId: ""



    })

    const { email,
        razon_social,
        nombre_cial_fantasia,
        cuit_nit_rut,
        telefono,
        direccion_fiscal,
        metodo_pago,
        banco,
        numero_cuenta,
        password,
        confirmarpassword,
        ciudadId } = registroCliente;



    const handleInputRegister = e => {
        guardarRegistroCliente({
            ...registroCliente,
            [e.target.name]: e.target.value
        })
    }







    const handleSubmitCliente = e => {
        e.preventDefault();

        if (telefono.trim() === "" || email.trim() === '' || razon_social.trim() === ''
            || nombre_cial_fantasia.trim() === '' || password.trim() === "" || confirmarpassword.trim() === "" || cuit_nit_rut.trim() === "" ||
            direccion_fiscal.trim() === "" || metodo_pago.trim() === "") {
            dispatch(mostrarError('Todos los campos son obligatorios', 'alerta-error'));
            return;

        }

        // Password minimo de 6 caracteres
        if (password.length < 6) {
            dispatch(mostrarError('El password debe ser de al menos 6 caracteres', 'alerta-error'));
            return;
        }

        //Los 2 passwords son iguales
        if (password !== confirmarpassword) {
            dispatch(mostrarError('Los passwords no son iguales', 'alerta-error'));
            return;
        }


        //Si pasamos todas las validacions: 
        dispatch(registrarCliente({
            razon_social,
            nombre_cial_fantasia,
            cuit_nit_rut,
            email,
            telefono,
            direccion_fiscal,
            metodo_pago,
            banco,
            numero_cuenta,
            password,
            ciudadId
        })
        )

    }





    useEffect(() => {
        if (autenticado) {
            props.history.push("/tablerocliente")

        }
        if (mensaje) {
            dispatch(mostrarError(mensaje.msg, mensaje.categoria))
        }

    }, [mensaje, autenticado, props.history, dispatch])










    return (
        <div>
            <NavCliente />
            <div className="registerContent">

                <p className="welcome-login">Bienvenido</p>
                <p className="register__description">Registre a su empresa aquí</p>

                <Card className="col-md-6" style={{ backgroundColor: "black" }}>
                    {mensaje ? (<div className={`alerta ${mensaje.categoria} text-center`}> {mensaje.msg} </div>) : null}
                    <CardBody >
                        {alerta ? (<div className={`alerta ${alerta.categoria} text-center`}> {alerta.msg} </div>) : null}

                        <form onSubmit={handleSubmitCliente}>
                            <Col md="12">
                                <div className="form-row">

                                    <FormGroup className="col-md-6">
                                        <Label for="inputRazon">Razón Social</Label>
                                        <Input
                                            bsSize="md"
                                            type="text"
                                            id="inputRazon"
                                            placeholder="Indique su razon social"
                                            name="razon_social"
                                            value={razon_social}
                                            onChange={handleInputRegister}

                                        />
                                    </FormGroup>

                                    <FormGroup className="col-md-6">
                                        <Label for="inputNombre">Nombre de fantasía</Label>
                                        <Input
                                            bsSize="md"
                                            type="text"
                                            id="inputNombre"
                                            placeholder="Nombre"
                                            name="nombre_cial_fantasia"
                                            value={nombre_cial_fantasia}
                                            onChange={handleInputRegister}

                                        />
                                    </FormGroup>
                                </div>


                                <div className="form-row">
                                    <FormGroup className="col-md-6">
                                        <Label for="inputCuit">Cuit</Label>
                                        <Input
                                            bsSize="md"
                                            type="text"
                                            id="inputCuit"
                                            placeholder="Ingrese su cuit / nit / rut "
                                            name="cuit_nit_rut"
                                            value={cuit_nit_rut}
                                            onChange={handleInputRegister}

                                        />
                                    </FormGroup>

                                    <FormGroup className="col-md-6">
                                        <Label for="inputEmail">Email</Label>
                                        <Input
                                            bsSize="md"
                                            type="date"
                                            id="inputEmail"
                                            placeholder="Email"
                                            name="email"
                                            value={email}
                                            onChange={handleInputRegister}

                                        />
                                    </FormGroup>
                                </div>



                                <div className="form-row">
                                    <FormGroup className="col-md-6">
                                        <Label for="inputTelefono">Teléfono</Label>
                                        <Input
                                            bsSize="md"
                                            type="text"
                                            id="inputTelefono"
                                            placeholder="Ingrese un telefono de contacto"
                                            name="telefono"
                                            value={telefono}
                                            onChange={handleInputRegister}

                                        />
                                    </FormGroup>

                                    <FormGroup className="col-md-6">
                                        <Label for="inputFiscal">Dirección fiscal</Label>
                                        <Input
                                            bsSize="md"
                                            type="text"
                                            id="inputEmail"
                                            placeholder="Direccion fiscal"
                                            name="direccion_fiscal"
                                            value={direccion_fiscal}
                                            onChange={handleInputRegister}

                                        />
                                    </FormGroup>
                                </div>





                                <div className="form-row">
                                    <FormGroup className="col-md-6">
                                        <Label for="inputPais">País</Label>
                                        <Input
                                            style={{ height: "auto" }}
                                            bsSize="md"
                                            id="inputPais"
                                            type="select"
                                            name="pais"
                                            onChange={handleCity}
                                        >
                                            {paises ? paises.map(item => (
                                                <option key={item.codigo_alfa} value={item.codigo_alfa} >{item.nombre_pais}</option>
                                            )) : ("")}
                                        </Input>
                                    </FormGroup>

                                    <FormGroup className="col-md-6">
                                        <Label for="inputCiudad">Ciudad</Label>
                                        <Input
                                            bsSize="md"
                                            type="select"
                                            id="inputCiudad"
                                            name="ciudadId"
                                            value={ciudadId}
                                            onChange={handleInputRegister}
                                        >
                                            {ciudades ? ciudades.map(item => (
                                                <option key={item.id} value={item.id}>{item.ciudad}</option>
                                            )) : ("")}
                                        </Input>
                                    </FormGroup>
                                </div>



                                <FormGroup>
                                    <Label for="inputCobro">Seleccione un método de cobro</Label>
                                    <Input
                                        bsSize="md"
                                        type="select"
                                        id="inputCobro"
                                        onChange={handleInputRegister}
                                        name="metodo_pago"
                                    >
                                        <option value="">-</option>
                                        <option value="Mercado Pago">Mercado Pago</option>
                                        <option value="CBU">CBU</option>
                                    </Input>


                                    {
                                        metodo_pago !== "" ?
                                            (metodo_pago === "CBU" ? (
                                                <>
                                                    <div className="form-row">
                                                        <FormGroup className="col-md-6">
                                                            <Input
                                                                bsSize="sm"
                                                                type="text"
                                                                placeholder="Banco"
                                                                name="banco"
                                                                onChange={handleInputRegister}


                                                            />
                                                        </FormGroup>

                                                        <FormGroup className="col-md-6">
                                                            <input
                                                                bsSize="sm"
                                                                type="text"
                                                                placeholder="Nº de cuenta"
                                                                name="numero_de_cuenta"
                                                                onChange={handleInputRegister}
                                                            />
                                                        </FormGroup>

                                                    </div>
                                                </>

                                            ) : (

                                                metodo_pago === "Mercado Pago" ?
                                                    <div className="form-row">
                                                        <FormGroup className="col-md-6">
                                                            <input
                                                                bsSize="sm"
                                                                type="text"
                                                                placeholder="Ingrese su nombre de usuario"
                                                                name="numero_de_cuenta"
                                                                onChange={handleInputRegister}
                                                            />
                                                        </FormGroup>

                                                    </div>
                                                    : ("")
                                            )
                                            ) : ("")
                                    }

                                </FormGroup>




                                <div className="form-row">

                                    <FormGroup className="col-md-6">
                                        <Label for="inputPassword">Contraseña</Label>
                                        <Input
                                            bsSize="md"
                                            type="password"
                                            id="inputPassword"
                                            name="password"
                                            value={password}
                                            onChange={handleInputRegister}

                                        />
                                    </FormGroup>

                                    <FormGroup className="col-md-6">
                                        <Label for="inputConfirmar">Confirmar contraseña</Label>
                                        <Input
                                            bsSize="md"
                                            type="password"
                                            id="inputConfirmar"
                                            name="confirmarpassword"
                                            value={confirmarpassword}
                                            onChange={handleInputRegister}

                                        />
                                    </FormGroup>


                                </div>

                                <Form inline onSubmit={(e) => e.preventDefault()}>

                                    <FormGroup className="mx-2" check>

                                    </FormGroup>
                                    {' '}
                                    <p>Al registrarse acepta los <Link color="danger" onClick={toggle}>términos y condiciones </Link></p>
                                </Form>


                                <Modal isOpen={modal} toggle={toggle} className={className} backdrop={backdrop} keyboard={keyboard}>
                                    <ModalHeader toggle={toggle}>Politica de Privacidad</ModalHeader>
                                    <ModalBody>
                                        1.1.La presente Política de Privacidad (en adelante la “Política de Privacidad”) se aplica a la utilización de los datos personales del Usuario, conforme se describe a continuación, (en adelante, el “Sitio”), provista por Price Hunter
                                        (en adelante, “PRICE HUNTER”), cuya función principal consiste en ofrecer al Usuario información relacionada a precios de productos de consumo masivo
                                        En caso de ser necesario, PRICE HUNTER podrá complementar esta Política de Privacidad con información y/o términos y condiciones específicos con relación al Servicio.
                                        -------------------------------------------------------------
                                        1.2. El mero acceso al Sitio atribuye la condición de usuario de PRICE HUNTER (en adelante el “Usuario” o los “Usuarios”) y expresa la aceptación plena y sin reservas de todas
                                        y cada una de las cláusulas de la Política de Privacidad en la versión publicada por PRICE HUNTER en el momento mismo en que el Usuario acceda al Sitio o utilice su Servicio.
                                        En consecuencia, la Política de Privacidad constituirá un acuerdo válido y obligatorio entre el Usuario y PRICE HUNTER con relación a la privacidad.
                                        Asimismo, la utilización del Servicio expresa la aceptación plena y sin reservas del Usuario a que PRICE HUNTER utilice su geolocalizacion para poder
                                        llevar a cabo el fin ultimo de esta aplicación.
                                    </ModalBody>

                                </Modal>




                                <Button bsSize="sm" type="submit" color="primary" block>Registrarme</Button>
                            </Col>
                        </form>
                    </CardBody>
                </Card>


            </div>
        </div>


    );
}

export default RegistroCliente;













