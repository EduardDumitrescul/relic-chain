import useEth from "./contexts/EthContext/useEth";
import Intro from "./components/Intro/";
import {ThemeProvider} from "@mui/material";
import {Theme} from "./Theme";
import {useEffect} from "react";

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
