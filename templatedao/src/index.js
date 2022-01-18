import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import {ThirdwebWeb3Provider} from '@3rdweb/hooks';

//polygon
const supportedChainIds = [80001,137]
//metamask is injected wallet
const connectors = {
  injected:{}
}

// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider 
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <div className='landing'>
        <App />
      </div>
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
