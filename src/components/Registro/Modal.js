import React from 'react';
import "./modal.css";


const Modal = () => {
    return ( 
        <div className="container_modal">
            <div className="container__title">
                <h1>Price Hunter</h1>
                <h2>Politica de privacidad</h2>
            </div>
            <div className="modal__container">

            <article>
            <span className="subtitles">INFORMACIÓN DEL SITIO</span>
            <p>La presente Política de Privacidad (en adelante la “Política de Privacidad”) se aplica a la utilización de los datos personales del Usuario, conforme se describe a 
            continuación, del Sitio Web publicado en la URL:  https://www.priceHunter.com  (en adelante, el “Sitio”), provista por PRICE HUNTER (en adelante, “PRICE HUNTER”), 
            cuya función principal consiste en ofrecer al Usuario información relacionada a las 

            PRICE HUNTER podrá complementar esta Política de Privacidad con información y/o términos y condiciones específicos con relación al Servicio.</p>
            
            <p>El mero acceso al Sitio atribuye la condición de usuario de PRICE HUNTER (en adelante el “Usuario” o los “Usuarios”) y expresa la aceptación plena y sin 
            reservas de todas y cada una de las cláusulas de la Política de Privacidad en la versión publicada por PRICE HUNTER en el momento mismo en que el Usuario acceda al Sitio o 
            utilice su Servicio. En consecuencia, la Política de Privacidad constituirá un acuerdo válido y obligatorio entre el Usuario y PRICE HUNTER con relación a la privacidad.
            Asimismo, la utilización del Servicio expresa la aceptación plena y sin reservas del Usuario de los Términos y Condiciones de Utilización del Servicio (en adelante, los “Términos y
            Condiciones”) 
            publicados por PRICE HUNTER en https://www.priceHunter.com/terminos-condiciones, que se complementan con la Política de Privacidad.</p>
            </article>

            
            <article>
                <span className="subtitles">
                RECOLECCIÓN DE INFORMACIÓN DE LOS USUARIOS. 
                </span>

                <p>
                PRICE HUNTER trata los Datos Personales del Usuario únicamente con el consentimiento expreso que el Usuario le otorga con la aceptación de
                la presente Política de Privacidad. Asimismo el Usuario acepta que PRICE HUNTER pueda recolectar información suya utilizando cookies y tags, así como aquella
                información proporcionada por el Usuario a través de los formularios del Sitio al registrarse y/o al utilizar el Servicio. En caso que un Usuario del Sitio no desee aceptar 
                estas cookies, 
                podrá configurar su navegador para que le otorgue la opción de aceptar cada cookie y rechazar las que no desee. 
                </p>
            </article>
                
            
            <article>
                <span className="subtitles" >FINALIDAD DE TRATAMIENTO DE LOS DATOS PERSONALES</span>
                <ul>
                    <li>Autorizar y administrar su acceso al Sitio, verificar su identidad, autenticar sus visitas y proporcionarle el Servicio;</li>
                    <li>Gestionar, analizar, desarrollar, personalizar y mejorar el Sitio y el Servicio;</li>
                    <li>Proveer el Servicio y sus mejoras a los Usuarios;</li>
                    <li>Análisis a efectos de poder brindar a los Usuarios el Servicio, y mejorar el método de pago;</li>
                    <li> Enviar a sus Usuarios, notificaciones, noticias y novedades de su interés, además de aquellas que revistan el carácter de notificaciones de índole institucional o legal; </li>
                    <li>Analizar las conductas y comportamientos de los Usuarios en carácter de tales en su Sitio, a los efectos de intentar mejorar su Servicio e intentar proveerlos de mejores soluciones a sus necesidades;</li>
                    <li>Enviar información y boletines de noticias sobre la actualidad de PRICE HUNTER, su Servicios y eventos vía WhatsApp, teléfono, correo postal, correo electrónico, incluso cuando nuestra relación haya terminado salvo que la persona interesada manifieste lo contrario; </li>
                    <li>Facilitar el cumplimiento de obligaciones legales en caso de ser solicitadas por tribunales, u organismos estatales nacionales o internacionales que así lo requieran y lo soliciten en la forma correspondiente. </li>
                    <li>Obtener el diagnóstico de los eventuales problemas de conexión que puedan llegar a existir entre el Sitio de PRICE HUNTER y los Usuarios, mejorando la calidad de los Servicios.</li>
                </ul>
            </article>

            <article>
                <span  className="subtitles">LEGISLACION Y JURISDICCION APLICABLE </span>
                <p>
                La presente Política de Privacidad se regirán e interpretarán con arreglo a la legislación vigente en la República Argentina, debiendo cualquier divergencia relacionadas a los 
                presentes resolverse ante los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires. 
                </p>
            </article>


            </div>

            </div>
     );
}
 
export default Modal;

