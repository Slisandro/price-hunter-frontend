import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from "../../contexts/ThemeContext";

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.dark);

  function changeTheme(theme) {
    setTheme(theme);
  }

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.add("white-content");
        break;
      case themes.dark:
      default:
        document.body.classList.remove("white-content");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
      {/* <img src="aguila.png" style={{ opacity: "0.3" }} alt="PRICE HUNTER"></img> */}
    </ThemeContext.Provider>
  );
}
