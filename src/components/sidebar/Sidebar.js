import React from 'react';
import "./Sidebar.css";
import aguila from "../../assets/aguila.png";


const Sidebar = (props) => {
    return ( 
        <div className={ props.sidebarOpen ? "sidebar-responsive" : ""  } id="sidebar">

            <div className="sidebar__title">
                <div className="sidebar__img">
                    <img src={aguila} alt="logo"/>
                    <h1>PH</h1>
                </div>
                <i  
                    class="far fa-window-close"
                    id="sidebarIcon"
                    onClick={() => props.closeSidebar()}>
                    
                </i>
                
            </div>

            <div className="sidebar__menu">
                <div className="sidebar__link  active_menu_link">
                    <a href="!#">Panel de control</a>
                </div>
                <div className="sidebar__link">
                    <i className="fa fa-user-secret"></i>
                    <a href="!#">Mis desafios</a>
                </div>

                <div className="sidebar__link">
                    <i className="fa fa-user-secret"></i>
                    <a href="!#">Configuracion</a>
                </div>

                <div className="sidebar__link">
                    <i className="fa fa-user-secret"></i>
                    <a href="!#">Configuracion</a>
                </div>


            </div>
        </div>
    );
}

export default Sidebar;