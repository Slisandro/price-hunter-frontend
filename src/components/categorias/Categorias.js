import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import "./Categorias.css";
import {getSubcategoriasId} from "../Redux/actions"; 

const Categorias = ({categorias}) => {

    const dispatch = useDispatch();
    
const subcategorias= useSelector(x => x.subcategorias)
console.log(subcategorias)

    
    
    
    
    return ( 
        <div className="categorias">
                                
        <ul className="menu-main">
                { categorias && categorias.map(familia => (
                    <li className="family"><a href="!#">{familia.nombre_familia}</a>
                        
                        <div className="menu-sub">  
                            
                            <div className="menu-col-1 ">
                                
                                {familia.categoria.map( categoria => (
                                    <>
                                    <div className="grid-category">
                                    <h3 className="menu-categoria">{categoria.nombre_categoria}</h3>
                                        <div className="sub-categoria-container">
                                        
                                        <ul className="grid-ul">
                                        {categoria.subcategoria.map( subcategoria => (
                                            <li className="sub" onClick={() => dispatch(getSubcategoriasId(subcategoria.id))}>{subcategoria.nombre_subcategoria}</li>
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
        


       </div>
     );
}
 
export default Categorias;