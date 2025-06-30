import logo from './logo.svg';
import './App.css';
import { httpClient } from "./HttpClient";

import Keycloak from 'keycloak-js';

let initOptions = {
  url: "http://localhost:8080",
  realm: "master",
  clientId: "react-client"
}

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: "login-required",
  checkLoginIframe: true,
  pkceMethod: "S256",
}).then((auth) => {
  if (!auth) {
    window.location.reload();
  }

  console.info("Authenticated");
  console.info("auth", auth);
  console.info("Keycloak", kc);
  console.info("Access Token", kc.token);

  httpClient.defaults.headers.common["Authorization"] = `Bearer ${kc.token}`;

  localStorage.onTokenExpired = () => {
    console.log("token expired");
  }
}, () => {
  console.error("Authentication Failed");
})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
