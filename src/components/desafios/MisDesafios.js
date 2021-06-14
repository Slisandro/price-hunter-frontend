import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import { Link } from "react-router-dom";
import "./styles/MisDesafios.css";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function MisDesafios({ setState }) {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Ingrese un desafío");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Desafío Editado");
    } else {
      showAlert(true, "success", "Desafío Agregado");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "Sin Desafíos");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "Desafío Eliminado!");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="contextC">
      <section className="section-center">
        <form className="challenges-form" onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h3>Mis Desafíos</h3>
          <div className="form-control">
            <input
              type="text"
              className="challenges"
              placeholder="Ej. Cazar 10 precios de Bebidas..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? "editar" : "agregar"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="challenges-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className="clear-btn" onClick={clearList}>
              Eliminar Todos
            </button>
          </div>
        )}
        {/* <p onClick={() => setState("Home")} style={{ color: "#e7e7e7" }}>
          Regresar a Mi Tablero
        </p> */}
      </section>
    </div>
  );
}

export default MisDesafios;
