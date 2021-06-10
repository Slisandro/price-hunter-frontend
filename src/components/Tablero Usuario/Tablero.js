import React, {useState} from 'react';
import Main from '../main/Main';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import  "./Tablero.css";



function Tablero() {

  const [sidebar, setSidebar] = useState(false);

  const openSidebar = () => {
    setSidebar(true);
  }
  const closeSidebar = () => {
    setSidebar(false);
  }

  
  return (
    <div className="contenedor">
  
      <Navbar sidebar={sidebar} openSidebar={openSidebar} />
      <Main/>
      <Sidebar sidebar={sidebar} closeSidebar={closeSidebar}/>
    
    </div>

  
  );
}

export default Tablero;



