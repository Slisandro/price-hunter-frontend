import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cerrarSesion } from "../../Redux/actions";
import "./AsideAdm.css";

const AsideAdm = (props) => {
  const dispatch = useDispatch();
  const autenticado = useSelector((store) => store.autenticado);

  return (
    <div id="aside">
      <div className="account-profile">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="Not Found"
        />
        <div className="blob-wrap">
          <div className="blob"></div>
          <div className="blob"></div>
          <div className="blob"></div>
        </div>
        <button className="account-title2" onClick={() => props.setState("")}>
          Administrador
        </button>

        <br></br>
        <button
          className="account-title4"
          value={"Configuracion"}
          onClick={() => props.setState("Configuracion")}
        >
          Configuración
        </button>
        <br></br>
        <button
          className="account-title2"
          onClick={() => dispatch(cerrarSesion())}
        >
          Cerrar Sesión
        </button>
      </div>

      {/* <div className="account cardAdm card1">
        <div className="user-income">Desafíos Totales: 40</div>
        <div className="user-income">Desafíos Activos: 25</div>
        <div className="user-income">Total de Productos: 15</div>
        <p className="user-info">***********************</p>
      </div>
      <div className="account card"></div> */}
    </div>
  );
};

export default AsideAdm;
