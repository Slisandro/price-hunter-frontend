import React, { useState } from "react";
import MainAdm from "./MainAdmin/MainAdm";
import NavbarAdm from "./NavbarAdmin/NavbarAdm";
import AsideAdm from "./AsideAdmin/AsideAdm";
import SideAdm from "./SidebarAdmin/SidebarAdm";

function AdminPage() {
  const [state, setState] = useState("");
  const [sidebarOpen, setSidebar] = useState(false);

  const openSidebar = () => {
    setSidebar(true);
  };
  const closeSidebar = () => {
    setSidebar(false);
  };

  return (
    <div className="contenedor">
      <NavbarAdm sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      <MainAdm state={state} setState={setState} />
      <SideAdm
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
        setState={setState}
      />
      <AsideAdm />
    </div>
  );
}

export default AdminPage;
