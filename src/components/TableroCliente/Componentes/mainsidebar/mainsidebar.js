import React, { useState } from "react";
import SideBar from "../sidebar/sidebar";
import Main from "../main/main";
import "./mainsidebar.css";

function MainSidebar() {
  return (
    <div id="conteiner-mainsidebar">
      {/* <SideBar /> */}
      <Main />
    </div>
  );
}

export default MainSidebar;
