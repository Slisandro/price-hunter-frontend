import React, {useState} from 'react';
import Main from '../main/Main';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import  "./Tablero.css";
import Aside from "../aside/Aside";



function Tablero() {

  const [sidebarOpen, setSidebar] = useState(false);

  const openSidebar = () => {
    setSidebar(true);
  }
  const closeSidebar = () => {
    setSidebar(false);
  }

  
  return (
    <div className="contenedor">
  
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <Main/>
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
      <Aside/>
    
    </div>

  
  );
}

export default Tablero;



