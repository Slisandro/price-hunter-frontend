import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { registrarCliente ,mostrarError, getCiudades,getPaises} from '../Redux/actions';


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



        const handleRegisterClient = e => {
            guardarRegistroCliente({
                ...registroCliente,
                [e.target.name]: e.target.value
            })
        }
        
        
        
        
        
        
        
          const handleSubmitCliente = e => {
            e.preventDefault();

            if(telefono.trim() === "" || email.trim() === ''|| razon_social.trim() === ''
            || nombre_cial_fantasia.trim() === '' || password.trim() === "" || confirmarpassword.trim() === "" ||  cuit_nit_rut.trim() === "" || 
            direccion_fiscal.trim() === ""  || metodo_pago.trim() === ""){
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
        <div className="registerContent">
            <div className="container_form_register">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}
                    <header>Registro Clientes</header>
                    
                    <div className="form-outer">
                            <form onSubmit={handleSubmitCliente}>

                    <div className="page">
                    

                                <div className="field">
                                    <div className="label">Razon social</div>
                                        <input
                                            className="inputRegister"
                                            type="text"
                                            placeholder="Ingrese su razon social" 
                                            name="razon_social"
                                            value={razon_social}
                                            onChange={handleRegisterClient}
        
                                        />
                                </div>
        
                                
                                <div className="field">
                                    <div className="label">Nombre comercial</div>
                                        <input
                                            className="inputRegister"
                                            type="text"
                                            placeholder="Nombre" 
                                            name="nombre_cial_fantasia"
                                            value={nombre_cial_fantasia}
                                            onChange={handleRegisterClient}
        
                                        />
                                </div>

                                <div className="field">
                                    <div className="label">Cuit</div>
                                        <input
                                            className="inputRegister"
                                            type="text"
                                            placeholder="Ingrese su numero cuit" 
                                            name="cuit_nit_rut"
                                            value={cuit_nit_rut}
                                            onChange={handleRegisterClient}
        
                                        />
                                </div>


                                <div className="field">
                                    <div className="label">Email</div>
                                    <input
                                            className="inputRegister"
                                            type="text"
                                            placeholder="Email" 
                                            name="email"
                                            value={email}
                                            onChange={handleRegisterClient}
                                            />
                                </div>



                                <div className="field">
                                    <div className="label">Telefono</div>
                                    <input
                                        className="inputRegister" 
                                        type="number"
                                        placeholder="Ingrese un telefono de contacto" 
                                        name="telefono"
                                        value={telefono}
                                        onChange={handleRegisterClient}
                                        />
                                </div>


                                <div className="field">
                                    <div className="label">Direccion Fiscal</div>
                                    <input 
                                            className="inputRegister"
                                            type="text" 
                                            placeholder="Direccion fiscal" 
                                            name="direccion_fiscal"
                                            value={direccion_fiscal}
                                            onChange={handleRegisterClient}
                                    />
                                </div>


        
                                <div className="field">
                                    <div className="label">Pais</div>
                                    <select onChange={handleCity}>
                                        <option value="">-</option>
                                        {paises ? paises.map(item => (
                                        <option key={item.codigo_alfa} value={item.codigo_alfa} >{item.nombre_pais}</option>
                                        )) : ("")}
                                    </select>
                                </div>
        
        
                                <div className="field">
                                    <div className="label">Ciudad</div>
                                    <select onChange={handleRegisterClient} name="ciudadId">
                                        <option value="">-</option>
                                        {ciudades ? ciudades.map(item => (
                                        <option key={item.id} value={item.id}>{item.ciudad}</option>
                                        )):("")}
                                    </select>
                                </div>


                                <div className="field">
                                    <div className="label">Metodo de pago</div>
                                    <select onChange={handleRegisterClient} name="metodo_pago">
                                        <option value="">-</option>
                                        <option value="Mercado Pago">Mercado Pago</option>
                                        <option value="CBU">CBU</option>
                                    </select>
    
                                {
                                    metodo_pago !== "" ?
                                        (metodo_pago === "CBU" ? (
                                        <>
                                        <div className="field">

                                        <input
                                            className="inputRegister"
                                            type="text"
                                            placeholder="Banco"
                                            name="banco"
                                            onChange={handleRegisterClient}
                                        />
                                      
                                        <input
                                            className="inputRegister"
                                            type="text"
                                            placeholder="Nº de cuenta"
                                            name="numero_de_cuenta"
                                            onChange={handleRegisterClient}
                                        />
                                        </div>
                                        </>
                                        
                                        ) : (
            
                                        metodo_pago === "Mercado Pago" ?
                                        <div className="field">
                                        <input
                                            className="inputRegister"
                                            type="text"
                                            placeholder="Ingrese su usuario"
                                            name="numero_de_cuenta"
                                            onChange={handleRegisterClient}
                                        />
                                        </div>
                                        : ("")
                                        )
                                    ) : ("")
                                }
                                </div>

                                <div className="field">
                                    <div className="label">Contraseña</div>
                                    <input
                                        className="inputRegister" 
                                        type="password"
                                        placeholder="contraseña" 
                                        name="password"
                                        value={password}
                                        onChange={handleRegisterClient}
                                        />
                                </div>

                                <div className="field">
                                    <div className="label">Confirmar contraseña</div>
                                    <input
                                        className="inputRegister" 
                                        type="password"
                                        placeholder="Confirmar contraseña" 
                                        name="confirmarpassword"
                                        value={confirmarpassword}
                                        onChange={handleRegisterClient}
                                        />
                                </div>
                               
                    

                                <div className="field">
                                    <button type="submit">Registrar</button>
                                </div>
                    </div>  
                </form>
            </div>
        </div>
    </div>
    
    
    );
}

export default RegistroCliente;