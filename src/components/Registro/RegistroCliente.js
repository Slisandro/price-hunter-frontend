import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registrarCliente, mostrarError, getCiudades, getPaises } from '../Redux/actions';
import {
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody,
    Col

} from "reactstrap";
import NavCliente from "./NavCliente";




const RegistroCliente = (props) => {



    const alerta = useSelector((store) => store.alerta);
    const mensaje = useSelector((store) => store.mensaje);
    const autenticado = useSelector((store) => store.autenticado);
    const paises = useSelector((store) => store.paises);
    const ciudades = useSelector((store) => store.ciudades);



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

                <Card className="col-md-6" style={{backgroundColor:"black"}}>
                    {mensaje ? (<div className={`alerta ${mensaje.categoria} text-center`}> {mensaje.msg} </div>) : null}
                    <CardBody >
                        {alerta ? (<div className={`alerta ${alerta.categoria} text-center`}> {alerta.msg} </div>) : null}

                        <form onSubmit={handleSubmitCliente}>
                            <Col md="12">
                                <div className="form-row">

                                    <FormGroup className="col-md-6">
                                        <Label for="inputRazon">Razon Social</Label>
                                        <Input
                                            bsSize="md"
                                            type="text"
                                            id="inputRazon"
                                            placeholder="Indique su razon social"
                                            name="razon_social"
                                            value={razon_social}
                                            onChange={razon_social}

                                        />
                                    </FormGroup>

                                    <FormGroup className="col-md-6">
                                        <Label for="inputNombre">Nombre de fantasia</Label>
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
                                        <Label for="inputCuit">Ciut</Label>
                                        <Input
                                            bsSize="md"
                                            type="number"
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
                                        <Label for="inputTelefono">Telefono</Label>
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
                                        <Label for="inputFiscal">Direccion fiscal</Label>
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
                                        <Label for="inputPais">Pais</Label>
                                        <Input
                                            bsSize="md"
                                            type="select"
                                            id="inputPais"
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
                                    <Label for="inputCobro">Seleccione un metodo de cobro</Label>
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
                                                                placeholder="Ingrese su usuario"
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













