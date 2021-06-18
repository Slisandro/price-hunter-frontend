
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./Categorias.css";
import { NavLink } from 'react-router-dom'
import { getSubcategoriasId } from "../Redux/actions";

const Categorias = ({ categorias, setState }) => {

    const dispatch = useDispatch();

    const subcategorias = useSelector(x => x.subcategorias)
    // console.log(subcategorias)

    const handleClick = (e, id) => {
        e.preventDefault();
        setState("Search");
        dispatch(getSubcategoriasId(id))
    }



    return (
        <div className="categorias">
            <ul className="menu-main">
                {categorias && categorias.map(familia => (
                    <li><a href="!#">{familia.nombre_familia}</a>
                        <div className="menu-sub">
                            <div className="menu-col-1 ">
                                {familia.categoria.map(categoria => (
                                    <>
                                        <div className="grid-category">
                                            <h3 className="menu-categoria">{categoria.nombre_categoria}</h3>
                                            <div className="sub-categoria-container">

                                                <ul className="grid-ul">
                                                    {categoria.subcategoria.map(subcategoria => (
                                                        <li className="sub">
                                                            <NavLink to="" value={subcategoria.nombre_subcategoria}
                                                                onClick={(e) => handleClick(e, subcategoria.id)}
                                                            >{subcategoria.nombre_subcategoria}</NavLink>
                                                        </li>
                                                    ))
                                                    }
                                                </ul>

                                            </div>
                                        </div>
                                    </>
                                )
                                )}
                            </div>
                        </div>
                    </li>
                ))
                }
            </ul>
        </div >
    );
}

export default Categorias;