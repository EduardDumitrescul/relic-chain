import useEth from "./contexts/EthContext/useEth";
import Intro from "./components/Intro/";
import {ThemeProvider, useTheme} from "@mui/material";
import {Theme} from "./Theme";
import React, {useEffect} from "react";
import {BrowserRouter, createBrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import MyRelics from "./components/Home/MyRelics";
import "./styles.css";

function App() {
    const {state} = useEth();
    useEffect(() => {
        const theme = Theme;
        document.documentElement.style.setProperty("--primary-light", theme.palette.primary.light);
        document.documentElement.style.setProperty("--primary-main", theme.palette.primary.main);
        document.documentElement.style.setProperty("--primary-dark", theme.palette.primary.dark);
        document.documentElement.style.setProperty("--primary-contrast-text", theme.palette.primary.contrastText);
        document.documentElement.style.setProperty("--secondary-light", theme.palette.secondary.light);
        document.documentElement.style.setProperty("--secondary-main", theme.palette.secondary.main);
        document.documentElement.style.setProperty("--secondary-dark", theme.palette.secondary.dark);
        document.documentElement.style.setProperty("--secondary-contrast-text", theme.palette.secondary.contrastText);
        document.documentElement.style.setProperty('--spacing-8', theme.spacing(8));
        document.documentElement.style.setProperty('--spacing-2', theme.spacing(2));
        document.documentElement.style.setProperty('--spacing-4', theme.spacing(4));
    }, []);

    useEffect(() => {
        if (window.ethereum) {
            const handleConnect = () => {
                console.log("Connected");
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            };
            const handleDisconnect = () => {
                console.log("Disconnected");
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            };

            // Add event listeners
            window.ethereum.on('connect', handleConnect);
            window.ethereum.on('disconnect', handleDisconnect);

            // Cleanup function to remove event listeners
            return () => {
                window.ethereum.removeListener('connect', handleConnect);
                window.ethereum.removeListener('disconnect', handleDisconnect);
            };
        }
    }, []);


    return (
        <ThemeProvider theme={Theme}>
              <div id="App">
                    {state.accounts && state.accounts.length > 0 ? (
                        <BrowserRouter>
                            <NavBar/>
                            <div className="centered-page">
                                <Routes>
                                    <Route path="" element={MyRelics()} />
                                </Routes>
                            </div>
                        </BrowserRouter>
                    ) : (
                        <Intro/>
                    )}
              </div>
        </ThemeProvider>
  );
}

export default App;
