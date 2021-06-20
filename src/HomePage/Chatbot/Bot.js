import "./Bot.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";
import logoAguila from "../../assets/aguila.png";

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      email: "",
      edad: "",
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { nombre, email, edad } = steps;

    this.setState({ nombre, email, edad });
  }

  render() {
    const { nombre, email, edad } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <h3>Resúmen</h3>
        <table>
          <tbody>
            <tr>
              <td>Nombre</td>
              <td>{nombre.value}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{email.value}</td>
            </tr>
            <tr>
              <td>Edad</td>
              <td>{edad.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

function Bot() {
  return (
    <>
      <div className="bot">
        <ChatBot
          botAvatar={logoAguila}
          // floatingIcon={logoAguila}
          floating={true}
          enableSmoothScroll={true}
          placeholder={"Escriba su mensaje"}
          steps={[
            {
              id: "1",
              message: "¡Hola! ¿En qué le podemos ayudar?",
              trigger: "2",
            },
            {
              id: "2",
              options: [
                { value: 1, label: "Ver Desafíos", trigger: "5" },
                { value: 2, label: "Ver Recompensas", trigger: "3" },
                { value: 3, label: "Ver Planes Empresariales", trigger: "6" },
              ],
            },
            {
              id: "3",
              message:
                "¡Regístrate para ver todas las recompensas disponibles!",
              trigger: "9",
            },
            {
              id: "5",
              message: "¡Registrate para ver todos los desafios disponibles!",
              trigger: "9",
            },
            {
              id: "6",
              message: "Ingrese sus datos y lo contactaremos a la brevedad",
              trigger: "7",
            },
            {
              id: "9",
              options: [
                { value: 4, label: "Más tarde", trigger: "11" },
                { value: 5, label: "Registrarme", trigger: "10" },
              ],
            },
            {
              id: "10",
              message:
                "Para Registrarse ingrese sus datos en la sección 'Registrarse'",
              trigger: "20",
            },
            {
              id: "11",
              message: "¡De Acuerdo! ¿En qué más le podemos ayudar?",
              trigger: "2",
            },
            {
              id: "20",
              message: "¿En qué más le podemos ayudar?",
              trigger: "2",
            },
            {
              id: "7",
              message: "¿Cuál es su nombre?",
              trigger: "nombre",
            },
            {
              id: "nombre",
              user: true,
              trigger: "12",
            },
            {
              id: "12",
              message: "¡Hola {previousValue}! ¿Cuál es su email?",
              trigger: "email",
            },
            {
              id: "email",
              // options: [
              //   { value: "Masculino", label: "Masculino", trigger: "5" },
              //   { value: "Femenino", label: "Femenino", trigger: "5" },
              //   { value: "No Binario", label: "No Binario", trigger: "5" },
              // ],
              user: true,
              validator: (value) => {
                if (
                  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
                    value
                  )
                ) {
                  return true;
                }
                return "value should be an email";
              },
              trigger: "13",
            },
            {
              id: "13",
              message: "¿Qué edad tiene?",
              trigger: "edad",
            },
            {
              id: "edad",
              user: true,
              trigger: "14",
              validator: (value) => {
                if (isNaN(value)) {
                  return "value must be a number";
                } else if (value < 0) {
                  return "no nos engañe!";
                } else if (value > 120) {
                  return `${value}? no nos engañe!`;
                }

                return true;
              },
            },
            {
              id: "14",
              message: "¡Genial! Revise su Resúmen",
              trigger: "resumen",
            },
            {
              id: "resumen",
              component: <Review />,
              asMessage: true,
              trigger: "actualiza",
            },
            {
              id: "actualiza",
              message: "¿Desea modificar algún dato?",
              trigger: "modificación",
            },
            {
              id: "modificación",
              options: [
                { value: "si", label: "Sí", trigger: "modifica" },
                { value: "no", label: "No", trigger: "end-message" },
              ],
            },
            {
              id: "modifica",
              message: "¿Qué dato desea modificar?",
              trigger: "modificar-dato",
            },
            {
              id: "modificar-dato",
              options: [
                {
                  value: "nombre",
                  label: "Nombre",
                  trigger: "modifica-nombre",
                },
                {
                  value: "email",
                  label: "Email",
                  trigger: "modifica-email",
                },
                { value: "edad", label: "Edad", trigger: "modifica-edad" },
              ],
            },
            {
              id: "modifica-nombre",
              update: "nombre",
              trigger: "14",
            },
            {
              id: "modifica-email",
              update: "email",
              trigger: "14",
            },
            {
              id: "modifica-edad",
              update: "edad",
              trigger: "14",
            },
            {
              id: "end-message",
              message:
                "¡Sus datos fueron cargados correctamente, en breve nos pondremos en contacto!",
              trigger: "20",
            },
          ]}
        />
      </div>
    </>
  );
}

export default Bot;
