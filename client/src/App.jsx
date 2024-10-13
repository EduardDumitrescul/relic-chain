import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import {ThemeProvider} from "@mui/material";
import {Theme} from "./Theme";

function App() {

    return (
    <EthProvider>
        <ThemeProvider theme={Theme}>
              <div id="App">
                <div className="container">
                  <Intro/>
                </div>
              </div>
        </ThemeProvider>
    </EthProvider>
  );
}

export default App;
