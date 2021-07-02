import React, { useState } from "react";
import {
  BackgroundColorContext,
  backgroundColors,
} from "../../contexts/BackgroundColorContext";

export default function BackgroundColorWrapper(props) {
  const [color, setColor] = useState(backgroundColors.blue);

  function changeColor(color) {
    setColor(color);
  }

  return (
    <BackgroundColorContext.Provider
      value={{ color: color, changeColor: changeColor }}
    >
      {props.children}
      {/* <img src="aguila.png" alt="PRICE HUNTER"></img> */}
    </BackgroundColorContext.Provider>
  );
}
