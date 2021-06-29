import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Categorias.css";
import { getSubcategoriasId } from "../Redux/actions";
import swal from 'sweetalert';

const Categorias = ({ categorias, setState, ubicacion }) => {
  const dispatch = useDispatch();
  const [categoria, setCategoria] = useState([]);
  const [subcategoria, setSubcategoria] = useState([]);
  // let nombreFamilia = {
  //   value: ""
  // };

  const handleCategorias = (e) => {
    const idFamilia = e.target.value;
    const arrayCategorias = [];

    if (idFamilia) {
      for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].id == idFamilia) {
          for (let j = 0; j < categorias[i].categoria.length; j++) {
            arrayCategorias.push(
              {
                idCategoria: categorias[i].categoria[j].id,
                nombreCategoria: categorias[i].categoria[j].nombre_categoria,
                subcategorias: categorias[i].categoria[j].subcategoria
              }
            )
          }
        }
      }
    } else {
      setSubcategoria([]);
    }
    return setCategoria(arrayCategorias);
  }

  const handleSubcategorias = (e) => {
    const idCategoria = e.target.value;
    const arraySubcategorias = [];
    if (idCategoria) {
      for (let i = 0; i < categoria.length; i++) {
        if (categoria[i].idCategoria == idCategoria) {
          for (let j = 0; j < categoria[i].subcategorias.length; j++) {
            arraySubcategorias.push(
              {
                idSubcategoria: categoria[i].subcategorias[j].id,
                nombreSubcategoria: categoria[i].subcategorias[j].nombre_subcategoria
              }
            )
          }
        }
      }
    }
    return setSubcategoria(arraySubcategorias);
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (ubicacion.latitud && ubicacion.longitud) {
      if (e.target.value) {
        if (ubicacion.dis > 0) {
          setState("Search");
          dispatch(getSubcategoriasId(e.target.value, ubicacion));
          setCategoria([])
          setSubcategoria([])
          document.getElementsByName("familia")[0].value = null
          // nombreFamilia.value = ""
        } else {
          swal("Debe ingresar un valor para el radio de búsqueda")
        }
      } else {
        swal("No hemos podido acceder a su ubicación", " ", "error");
      }
    }
  }

  return (
    <div className="categorias">
      <select name={"familia"} onChange={e => handleCategorias(e)}>
        <option></option>
        {categorias &&
          categorias.map((familia) => (
            <option key={familia.id} value={familia.id}>{familia.nombre_familia}</option>
          ))
        }
      </select>
      {
        categoria.length === 0 ? null : (
          <select name={"categoria"} onChange={e => handleSubcategorias(e)}>
            <option></option>
            {categoria &&
              categoria.map((arg) => (
                <option key={arg.idCategoria} value={arg.idCategoria}>{arg.nombreCategoria}</option>
              ))
            }
          </select>
        )
      }
      {
        subcategoria.length === 0 || ubicacion.dis === 0 ? <label>Debe seleccionar distancia</label> : (
          <select name={"subcategoria"} onClick={e => handleClick(e)}>
            <option></option>
            {
              subcategoria && categoria &&
              subcategoria.map((sub) => (
                <option key={sub.idSubcategoria} value={sub.idSubcategoria}>{sub.nombreSubcategoria}</option>
              ))
            }
          </select>
        )
      }
    </div>
  );
};

export default Categorias;
