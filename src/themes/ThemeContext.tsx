import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "void" | "blossom";

interface ThemeContextType {

  theme: Theme;

  toggleTheme: () => void;

}

const ThemeContext =
createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
}:{
  children:React.ReactNode;
}){

  const [theme,setTheme]=useState<Theme>("void");

  useEffect(()=>{

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

  },[theme]);

  function toggleTheme(){

    setTheme(prev=>

      prev==="void"
      ? "blossom"
      : "void"

    );

  }

  return(

    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>

  );

}

export function useTheme(){

  const context=useContext(ThemeContext);

  if(!context)
    throw new Error(
      "useTheme must be inside ThemeProvider"
    );

  return context;

}