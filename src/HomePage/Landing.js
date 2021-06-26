import React from 'react';
import "./Landing.css";
import aguila from "../assets/aguila.png";
import mapa from "../assets/mapa.png";
import ayuda from "../assets/ayuda.png";
import ahorro from "../assets/ahorro.png";
import ventas from "../assets/tendencia.png";
import cazador from "../assets/cazador.png";

const Landing = () => {
    return (
        <div className="hunter__landing__content">

            <div className="navbar__landing">
                <div className="containerLanding__hunter flexing">
                    <img className="aguilaLanding" src={aguila} alt="" />
                    <nav>
                        <ul>

                            <li className="firstLi"><a href="features.html">Empresas</a></li>
                            <li className="firstLi"><a href="index.html">Contacto</a></li>
                            <li className="firstLi"><a href="index.html">Inicio</a></li>
                            <li className="singIn"><a href="index.html">Iniciar Sesion</a></li>
                            <li className="singIn"><a href="index.html">Registrarme</a></li>

                        </ul>
                    </nav>
                </div>
            </div>





            <section class="showcase">
                
                <div class="containerLanding__hunter grid">
                    
                    <div class="showcase-text">
                        <h1 class="title-hunter"><span class="hunter-pe">P</span>rice <span class="hunter-pe">H</span>unter</h1>
                        <p class="description-hunter">Price Hunter es la primera aplicacion que le permite <small class="hunter-pe">informar los precios</small> de sus productos favoritos para ayudar a otros consumidores y además,
                            <small class="hunter-pe"> obtener recompensas</small> por ello  !
                        </p>
                        <a href="features.html" class="btnLanding btn-outline__hunter">Sobre nosotros</a>
                        <a href="features.html" class="btnLanding btn-outline__hunter">Empresas</a>

                    </div>



                    <div class="showcase-form ">
                        <div class="hero__phone">
                            <img class="img__super" src={cazador} alt=""/>
                        </div>
                    </div>


                </div>

            </section>





            <section class="stats">
                <div class="containerLanding__hunter">


                    <div class="grid grid-3 text-center my-4">
                        <div>
                            <img class="img__publicidad" src={ahorro} alt="" />
                            <h3 class="h3">Consiga el mejor precio y ahorre dinero</h3>

                        </div>
                        <div>
                            <img class="img__publicidad" src={ayuda} alt="" />
                            <h3 class="h3">Capture precios y ayude a otros consumidores</h3>

                        </div>
                        <div>
                            <img class="img__publicidad" src={mapa} alt="" />
                            <h3 class="h3">Consiga el precio mas cercano a su hogar</h3>
                        </div>
                    </div>
                </div>
            </section>



            
    <section class="how-it-works">
        
        <div class="containerLanding ">
            <div class="row justify-content-center">
                <div>
                    <div class="section-title">
                        <h2>¿Como funciona Price Hunter?</h2>
                    </div>
                </div>
            </div>

            <div class="grider__functions grid grid-3 text-center">
                <div>
                    <div class="how-it-works-item">
                        <div class="step">1</div>
                        <h3>Únase a los desafios propuestos por nuestros clientes</h3>
                        <p>El desafío es sobre un producto determinado y habrá una cantidad de precios por cazar</p>
                    </div>
                </div>
                <div>
                    <div class="how-it-works-item ">
                        <div class="step">2</div>
                        <h3> Dirijase a su tienda favorita y cargue el precio del producto</h3>
                        <p>Cargue en Price Hunter el precio del producto que ha sido establecido en el desafio</p>
                    </div>
                </div>
                <div>
                    <div class="how-it-works-item">
                        <div class="step">3</div>
                        <h3>Capture la mayor cantidad de precios posibles de ese producto</h3>
                        <p>Tenga en cuenta que no se puede cargar el precio de un producto dos veces en el mismo lugar</p>
                    </div>
                </div>
                <div>
                    <div class="how-it-works-item">
                        <div class="step">4</div>
                        <h3>Cuantos mas precios capture, mas HunterPoints acumulará</h3>
                        <p>En su panel de usuario podra administrar sus puntos y canjearlos por grandes recompensas!</p>
                    </div>
                </div>
            </div>
        </div>

        
    </section>





    



  
    <section class="empresas my-2 py-2">
        <div class="containerLanding__hunter grid">
            <div class="text-center">
                <h2 class="lg">Price Hunter Empresas</h2>
                <p class="lead my-1">Price Hunter le acerca información detallada sobre del precio de sus productos en el mercado, 
                    permitiendole tomar mejores decisiones, adoptar estrategias de precios adecuadas y maximizar sus ventas.
                </p>
                <a href="features.html" class="btnLanding btn-outline__hunter">Ver planes</a>
                
            </div>
            <img class="img__empresas" src={ventas} alt=""/>
        </div>
    </section>




    <footer class="footer py-5">
        <div class="containerLanding__hunter grid grid-3">
            <div>
                <h1>Prince Hunter
                </h1>
                <p>Copyright &copy; 2021</p>
            </div>
            <nav>
                <ul>
                    <li><a href="index.html">Nosotros</a></li>
                    <li><a href="features.html">Funciones</a></li>
                    <li><a href="docs.html">Contacto</a></li>
                    <li><a href="docs.html">Empresas</a></li>
                </ul>
            </nav>
            <div class="social">
               
                <a href="!#"><i class="fab fa-facebook fa-2x"></i></a>
                <a href="!#"><i class="fab fa-instagram fa-2x"></i></a>
                <a href="!#"><i class="fab fa-twitter fa-2x"></i></a>
            </div>
        </div>
    </footer>

 
















        </div>
    );
}

export default Landing;