// context/ThemeContext.js
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isSun, setIsSun] = useState(true);

  return (
    <ThemeContext.Provider value={{ isSun, setIsSun }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
