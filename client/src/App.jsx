import useEth from "./contexts/EthContext/useEth";
import Intro from "./components/Intro/";
import {ThemeProvider} from "@mui/material";
import {Theme} from "./Theme";
import React, {useEffect} from "react";
import {BrowserRouter, createBrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
    const {state} = useEth();

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
                <div className="container">
                    {state.accounts && state.accounts.length > 0 ? (
                        <BrowserRouter>
                            <NavBar/>
                            <Routes>
                                <Route path="" element={<p>Home</p>} />
                            </Routes>
                        </BrowserRouter>
                    ) : (
                        <Intro/>
                    )}
                </div>
              </div>
        </ThemeProvider>
  );
}

export default App;
