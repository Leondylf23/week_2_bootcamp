import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import DetailCountry from "./pages/DetailCountry";

import classes from "./style.module.scss"
import "./index.css";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
        path: "/detail",
        element: <DetailCountry />
      },
  ]);

export default function App(){
    const [darkMode, setDarkMode] = useState("light");

    const darkTheme = createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
        ...(darkMode ? ({
            primary: {
                main: '#fff',
            },
            secondary: {
                main: '#202D36',
            },
        }) : ({
            primary: {
                main: '#202D36',
            },
            secondary: {
                main: '#fff',
            },
        }))
    });

    function toggleDarkMode() {
        if(darkMode === "light") {
            const name = "dark";
            document.documentElement.setAttribute("data-theme", name);
            setDarkMode(name);
        } else {
            const name = "light";
            document.documentElement.setAttribute("data-theme", name);
            setDarkMode(name);
        }
    }

    return(
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <NavBar darkModeToggle={toggleDarkMode} isDarkmode={darkMode === "dark"} />
            <div className={classes.main}>
                <RouterProvider router={router} />  
            </div>
        </ThemeProvider>
    )
}