import useEth from "./contexts/EthContext/useEth";
import Intro from "./components/Intro/";
import {ThemeProvider} from "@mui/material";
import {Theme} from "./Theme";

function App() {
    const {state} = useEth();
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
