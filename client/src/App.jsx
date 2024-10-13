import useEth from "./contexts/EthContext/useEth";
import Intro from "./components/Intro/";
import {ThemeProvider} from "@mui/material";
import {Theme} from "./Theme";
import {useEffect} from "react";

function App() {
    const {state} = useEth();

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            })
            window.ethereum.on('connect', () => {
                window.location.reload();
            })
            window.ethereum.on('disconnect', () => {
                window.location.reload();
            })
            window.ethereum.on('accountsChanged', () => {
                window.location.reload();
            })
        }
    });


    return (
        <ThemeProvider theme={Theme}>
              <div id="App">
                <div className="container">
                    {state.accounts && state.accounts.length > 0 ? (
                        <p>Connected Account: {state.accounts[0]}</p>
                    ) : (
                        <Intro/>
                    )}
                </div>
              </div>
        </ThemeProvider>
  );
}

export default App;
