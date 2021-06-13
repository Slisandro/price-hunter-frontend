import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MisDesafios from '../desafios/MisDesafios';
import NavBarMain from '../navBarMain/NavBarMain';
import Table from '../Table.js'
import "./Main.css";

const Main = ({ state, setState }) => {
    const productos = useSelector(store => store.productos)
    const subcategorias = useSelector(store => store.subcategorias)
    const [producto, setProducto] = useState("");

    return (
        <main className="main">
            <div className="main__container">
                {
                    state === "Desafios" ?
                        null :
                        <div className="main__title">
                            <NavBarMain producto={producto} setProducto={setProducto} setState={setState} />
                        </div>
                }
                <div className="containerTableSearch">
                    {
                        state === "Search" ? <Table productos={productos} name={producto} /> :
                            state === "SubCategorias" ? <Table productos={subcategorias} name={producto}/> :
                                state === "Desafios" ? <MisDesafios /> :
                                    state === "Configuracion" ? <div>Configuración</div> : null
                    }
                </div>
              </div>
    
              <Categorias categorias={categorias} />
    
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input__text"
                  placeholder="Buscar productos por nombre"
                  onChange={handleChange}
                  value={producto}
                  name={producto}
                />
                <input type="submit" className="btn__main" value="Buscar" />
              </form>
            
            
            
            
            
            </div>
            {/* AQUI COMIENZA EL DIV DONDE VAMOS A IR RENDERIZANDO DIFERENTES COMPONENTES */}
    
            <div>
              {/* {
                                        productos.map(producto => (
                                            <div>
                                                
                                                <p>{producto.preoducto}</p>
                                                <p>{producto.precio}</p>
                                                <p>{producto.fecha}</p>
                                                <p>{producto.desafio}</p>
    
                                            </div>
                                        ))
                                    } */}
            </div>
            {/* {console.log(prodsuctos)} */}
            
            
            <div className="containerTableSearch">
              {productos.length === 0 ? (
                <div>Cargando...</div>
              ) : (
                <Table productos={productos} name={producto} />
              )}
            </div>
        </div>
    </main>
  );
};

export default Main;
