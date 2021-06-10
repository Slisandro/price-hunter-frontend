import React from 'react';
import "./Sidebar.css";
import aguila from "../../assets/aguila.png";


const Sidebar = ({sidebar , closeSidebar}) => {
    return ( 
        <div className={  sidebar ? "sidebar-responsive" : ""  } id="sidebar">

            <div className="sidebar__title">
                <div className="sidebar__img">
                    <img src={aguila} alt="logo"/>
                    <h1>PH</h1>
                </div>
                <i  
                    className="far fa-times-circle"
                    id="sidebarIcon"
                    onClick={() => closeSidebar()}>
                    
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