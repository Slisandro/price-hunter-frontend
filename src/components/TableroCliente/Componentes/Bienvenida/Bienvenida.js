import React from 'react';
import { Jumbotron} from 'reactstrap';
import grafico from "./icons8-ventas-totales-96.png";

const Bienvenida = () => {
  return (
    <div>
    
      <Jumbotron style={{backgroundColor:"transparent"}}>
        <h1 style={{ color: "rgba(96, 214, 0, 0.959)" }} className="display-3">Bienvenido</h1>
        <h4>Gracias por escoger Price Hunter, juntos llevaremos sus ventas hacia la cima !</h4>
        <hr className="my-2" />
        <img width={105} src={grafico} alt=""></img>
      </Jumbotron>

      
    </div>
    
  );
};

export default Bienvenida;