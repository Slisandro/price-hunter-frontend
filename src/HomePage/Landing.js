import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import aguila from "../assets/aguila.png";
import mapa from "../assets/mapa.png";
import ayuda from "../assets/ayuda.png";
import ahorro from "../assets/ahorro.png";
import ventas from "../assets/tendencia.png";

import cazador from "../assets/mira.png";
import Bot from "./Chatbot/Bot";
import coca from "../assets/img/logomarcas/cocacola.png";
import pepsi from "../assets/img/logomarcas/pepsi.png";
import cereal from "../assets/img/logomarcas/kelloggs.png";

import mondelez from "../assets/img/logomarcas/mondelez.png";
import colgate from "../assets/img/logomarcas/colgate.png";
import unilever from "../assets/img/logomarcas/unilever.png";
import {
  Nav,
  NavItem,
  Button,
  Jumbotron,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";

const Landing = () => {
  return (
    <div className="hunter__landing__content">
      <div className="navbar__landing">
        <div className="containerLanding__hunter flexing">
          <img className="aguilaLanding" src={aguila} alt="" />
          <Nav className="justify-content-center">
            <NavItem>
              <Link href="#">Inicio</Link>
            </NavItem>
            <NavItem>
              <Link to="/login">Iniciar Sesion</Link>
            </NavItem>
            <NavItem>
              <Link to="/registro">Registrarme</Link>
            </NavItem>
          </Nav>
        </div>
      </div>

      <section class="showcase">
        <div class="containerLanding__hunter grid">
          <div class="showcase-text">
            <h1 class="title-hunter">
              <span class="hunter-pe">P</span>rice{" "}
              <span class="hunter-pe">H</span>unter
            </h1>
            <p class="description-hunter">
              Price Hunter es la primera aplicacion que le permite{" "}
              <small class="hunter-pe">informar los precios</small> de sus
              productos favoritos para ayudar a otros consumidores y además,
              <small class="hunter-pe"> obtener recompensas</small> por ello !
            </p>
            <a href="features.html" class="btnLanding btn-outline__hunter">
              Sobre nosotros
            </a>
            <a href="features.html" class="btnLanding btn-outline__hunter">
              Empresas
            </a>
          </div>

          <div class="showcase-form ">
            <div class="hero__phone">
              <img class="img__super" src={cazador} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section class="stats">
        <div class="containerLanding__hunter">
          <div class="grid grid-3 text-center my-4">
            <div>
              <img class="img__publicidad" src={ahorro} alt="" />
              <h3 class="h3">Conseguí el mejor precio y ahorre dinero</h3>
            </div>
            <div>
              <img class="img__publicidad" src={ayuda} alt="" />
              <h3 class="h3">Capturá precios y ayude a otros consumidores</h3>
            </div>
            <div>
              <img class="img__publicidad" src={mapa} alt="" />
              <h3 class="h3">Encontrá el precio mas cercano a su hogar</h3>
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
            <Card
              style={{ width: "23rem", height: "17rem" }}
              className="card-instructions"
            >
              <CardBody>
                <CardTitle className="card__title__instructions">1</CardTitle>
                <CardSubtitle className="mb-2 ">
                  Únete a los desafios propuestos por nuestros clientes
                </CardSubtitle>
                <CardText>
                  El desafío es sobre un producto determinado y habrá una
                  cantidad de precios por cazar
                </CardText>
              </CardBody>
            </Card>
            <Card
              style={{ width: "23rem", height: "17rem" }}
              className="card-instructions"
            >
              <CardBody>
                <CardTitle className="card__title__instructions">2</CardTitle>
                <CardSubtitle className="mb-2">
                  Dirígete a su tienda favorita y cargue el precio del producto
                </CardSubtitle>
                <CardText>
                  Cargue en Price Hunter el precio del producto que ha sido
                  establecido en el desafio
                </CardText>
              </CardBody>
            </Card>
            <Card
              style={{ width: "23rem", height: "17rem" }}
              className="card-instructions"
            >
              <CardBody>
                <CardTitle className="card__title__instructions">3</CardTitle>
                <CardSubtitle className="mb-2 ">
                  Capturá la mayor cantidad de precios posibles de ese producto
                </CardSubtitle>
                <CardText>
                  Tenga en cuenta que no se puede cargar el precio de un
                  producto dos veces en el mismo lugar
                </CardText>
              </CardBody>
            </Card>
            <Card
              style={{ width: "23rem", height: "17rem" }}
              className="card-instructions"
            >
              <CardBody>
                <CardTitle className="card__title__instructions">4</CardTitle>
                <CardSubtitle className="mb-2">
                  Cuantos mas precios captures, mas HunterPoints acumularás
                </CardSubtitle>
                <CardText>
                  En su panel de usuario podras administrar tus puntos y
                  canjearlos por grandes recompensas!
                </CardText>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="containerLanding__hunter"></section>

      <section class="empresas my-2 py-2">
        <div class="containerLanding__hunter grid">
          <Jumbotron className="jumboLanding">
            <h1 className="display-3 title_jumbo">Price Hunter Empresas</h1>

            <p>
              Price Hunter le acerca información detallada sobre del precio de
              sus productos en el mercado, permitiendole tomar mejores
              decisiones, adoptar estrategias de precios adecuadas y maximizar
              sus ventas..
            </p>
            <p className="lead">
              <Button className="button_empresa" color="primary" block>
                Ver nuestros planes
              </Button>
            </p>
          </Jumbotron>
          <img className="img__empresas" src={ventas} width={90} alt="" />
        </div>
      </section>

      <section class="marcas containerLanding__hunter">
        <h2 class="md text-center ">Ya confian en nosotros</h2>
        <div className="grid grid-3 text-center">
          <div>
            <img className="img__marca" src={coca} alt="" />
          </div>

          <div>
            <img className="img__marca" src={pepsi} alt="" />
          </div>

          <div>
            <img className="img__marca" src={colgate} alt="" />
          </div>

          <div>
            <img className="img__marca" src={mondelez} alt="" />
          </div>

          <div>
            <img className="img__marca" src={cereal} alt="" />
          </div>

          <div>
            <img className="img__marca" src={unilever} alt="" />
          </div>
        </div>
      </section>

      <footer class="footer py-5">
        <div class="containerLanding__hunter grid grid-3">
          <div>
            <h1>Prince Hunter</h1>
            <p>Copyright &copy; 2021</p>
          </div>
          <nav>
            <ul>
              <li>Participaron en este proyecto: </li>
              <li>
                <a href="index.html">
                  {" "}
                  <i class="fab fa-linkedin"></i> Nicolas Arguello Casas
                </a>
              </li>
              <li>
                <a href="features.html">
                  {" "}
                  <i class="fab fa-linkedin"></i> Carlos Eduardo Lozano
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/tomás-torales-vazquez">
                  {" "}
                  <i class="fab fa-linkedin"></i> Tomas Torales
                </a>
              </li>
              <li>
                <a href="docs.html">
                  {" "}
                  <i class="fab fa-linkedin"></i> Pablo Molina
                </a>
              </li>
              <li>
                <a href="docs.html">
                  {" "}
                  <i class="fab fa-linkedin"></i> Marco Pablo Demaio
                </a>
              </li>
              <li>
                <a href="docs.html">
                  {" "}
                  <i class="fab fa-linkedin"></i> Linsandro Salvareschi
                </a>
              </li>
              <li>
                <a href="docs.html">
                  {" "}
                  <i class="fab fa-linkedin"></i> Cristian Fernandez
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/german-derbes-catoni/">
                  {" "}
                  <i class="fab fa-linkedin"></i> German Derbes Catoni
                </a>
              </li>
            </ul>
          </nav>

          <div class="social">
            <a href="!#">
              <i class="fab fa-facebook fa-2x"></i>
            </a>
            <a href="!#">
              <i class="fab fa-instagram fa-2x"></i>
            </a>
            <a href="!#">
              <i class="fab fa-twitter fa-2x"></i>
            </a>
          </div>
        </div>
      </footer>
      <Bot />
    </div>
  );
};

export default Landing;
