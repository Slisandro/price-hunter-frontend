import React, {useState} from 'react';
import Main from '../main/Main';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import  "./Tablero.css";
import Aside from "../aside/Aside";



function Tablero() {
  const [state, setState] = useState("")
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
      <Main state={state} setState={setState}/>
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} setState={setState}/>
      <Aside/>
    
    </div>

  
  );
}

export default Tablero;



