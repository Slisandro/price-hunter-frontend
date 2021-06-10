import React, {useState} from 'react';

import './NavBar.css'

function NavBar() {
    const [modal, setModal] = useState(false);

    const handleModal = () => {
        setModal(!modal)
    }

    return (
        <div className="containerNavBar">
            <h2 className="title">Price Hunter</h2>
            <div className="links">
                <p>Inicio</p>
                <p>Marcas</p>
                <p>Recompensas</p>
                <p>Servicios</p>
                <p>Sobre nosotros</p>
            </div>
            <button onClick={handleModal} className="button">
                Ingresar/Registrarse
            </button>
            {modal ? (
                <div className="modal">
                    Modal Abierto
                    <button onClick={handleModal}>x</button>
                </div>
            ) : null
            }
        </div>
    )
}

export default NavBar;