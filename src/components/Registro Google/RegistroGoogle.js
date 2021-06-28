import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./RegistroGoogle.css";
import {
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardBody
} from "reactstrap";
import { getGeneros, getPaises, getCiudades, mostrarError, registro_google} from '../Redux/actions';


const RegistroGoogle = ({setModalCompletado, history, setModalRegistro}) => {


    const generos = useSelector((store) => store.generos);
    const paises = useSelector((store) => store.paises);
    const ciudades = useSelector((store) => store.ciudades);
    // const autenticado = useSelector((store) => store.autenticado);
    const mensaje = useSelector((store) => store.mensaje);
    const res = useSelector((store) => store.registroGoogleRes);
    const dispatch = useDispatch();






    const [registroGoogle, guardarRegistroGoogle] = useState({
        fecha_de_nacimiento: [],
        ciudadId: "",
        generoId: "",
        metodo_de_cobro: "",
        banco: "",
        numero_de_cuenta: ""

    })


    const {
        fecha_de_nacimiento,
        metodo_de_cobro,
        generoId,
        ciudadId,
        banco,
        numero_de_cuenta
    } = registroGoogle;





    useEffect(() => {
        if (res.msg === "operación completada con éxito") {
            setModalCompletado(true)
        }
        if (mensaje) {
            dispatch(mostrarError(mensaje.msg, mensaje.categoria))
        }

    }, [mensaje, res, history, dispatch])






    //Ejecutamos el llamado al back para traer las ciudades
    useEffect(() => {
        dispatch(getGeneros())
        dispatch(getPaises())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleCities = e => {
        dispatch(getCiudades(e.target.value))
    }


    const handleInputGoogle = e => {
        guardarRegistroGoogle({
            ...registroGoogle,
            [e.target.name]: e.target.value
        })
    }



    const handleSubmit = e => {
        e.preventDefault();

        if (fecha_de_nacimiento.trim() === '' || generoId === '' || ciudadId === '' || metodo_de_cobro === '') {
            dispatch(mostrarError('Todos los campos son obligatorios', 'alerta-error'));
            return;
        } else {
            // Si pasamos todas las validacions: 
            dispatch(registro_google(registroGoogle)
            )

            //Limpiamos el formulario
            guardarRegistroGoogle({

                fecha_de_nacimiento: [],
                ciudadId: "",
                generoId: "",
                metodo_de_cobro: "",
                banco: "",
                numero_de_cuenta: "",

            })
        }



    }








    return (
        <div className="loger_cont">
            <div className="global-container__log_google">

                <Card className="card__google__login">
                    <CardBody>

                        <form className="login__form" onSubmit={handleSubmit}>

                            <FormGroup row>
                                <Label for="fecha"> Fecha de nacimiento </Label>
                                <Input
                                    type="date"
                                    name="fecha_de_nacimiento"
                                    id="fecha"
                                    value={fecha_de_nacimiento}
                                    onChange={handleInputGoogle}

                                />
                            </FormGroup>

                            <FormGroup row>
                                <Label for="genero">Genero</Label>
                                <Input
                                    type="select"
                                    name="generoId"
                                    id="genero"
                                    onChange={handleInputGoogle}
                                    value={generoId}
                                >
                                    <option value="">-</option>
                                    {generos ? generos.map(genero => (
                                        <option key={genero.id} value={genero.id}>{genero.genero}</option>
                                    )) : ("")}
                                </Input>
                            </FormGroup>




                            <FormGroup row>
                                <Label for="inputState">Pais</Label>
                                <Input
                                    type="select"
                                    name="select"
                                    id="inputState"
                                    onChange={handleCities}
                                >
                                    <option value="">-</option>
                                    {paises ? paises.map(item => (
                                        <option key={item.codigo_alfa} value={item.codigo_alfa} >{item.nombre_pais}</option>
                                    )) : ("")}
                                </Input>
                            </FormGroup>




                            <FormGroup row>
                                <Label for="inputState">Ciudad</Label>
                                <Input
                                    type="select"
                                    name="ciudadId"
                                    id="inputState"
                                    onChange={handleInputGoogle}
                                >
                                    <option value="">-</option>
                                    {ciudades ? ciudades.map(item => (
                                        <option key={item.id} value={item.id}>{item.ciudad}</option>
                                    )) : ("")}
                                </Input>
                            </FormGroup>




                            <FormGroup row>
                                <Label for="inputState">Metodo de cobro</Label>
                                <Input
                                    type="select"
                                    name="metodo_de_cobro"
                                    id="inputState"
                                    value={metodo_de_cobro}
                                    onChange={handleInputGoogle}

                                >
                                    <option value="">-</option>
                                    <option value="Mercado Pago">Mercado Pago</option>
                                    <option value="CBU">CBU</option>
                                </Input>

                                {
                                    metodo_de_cobro !== "" ?
                                        (metodo_de_cobro === "CBU" ? (
                                            <>
                                                <FormGroup>
                                                    <Input
                                                        type="text"
                                                        placeholder="Banco"
                                                        name="banco"
                                                        onChange={handleInputGoogle}

                                                    />

                                                    <Input
                                                        type="text"
                                                        placeholder="Numero de cuenta"
                                                        name="numero_de_cuenta"
                                                        onChange={handleInputGoogle}
                                                    />
                                                </FormGroup>

                                            </>

                                        ) : (

                                            metodo_de_cobro === "Mercado Pago" ?
                                                <FormGroup>
                                                    <Input
                                                        type="text"
                                                        placeholder="Usuario"
                                                        name="banco"
                                                        onChange={handleInputGoogle}

                                                    />
                                                </FormGroup>
                                                : ("")
                                        )
                                        ) : ("")
                                }
                            </FormGroup>


                            <Button className="button__login__google" type="submit">
                                Iniciar sesion
                            </Button>
                            <Button className="primary" onClick={()=>setModalRegistro(false)}>Cerrar</Button>


                        </form>





                    </CardBody>
                </Card>
            </div>
        </div>

    );
}

export default RegistroGoogle;




