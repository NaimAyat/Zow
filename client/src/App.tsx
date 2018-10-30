import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

const API_URL = "/api";

interface IState {
  apiMessage: string;
}

class App extends React.Component<{}, IState> {
  public state = { apiMessage: "" };

  public componentDidMount() {
    fetch(API_URL)
      .then(resp => resp.text())
      .then(text => this.setState({ apiMessage: text }));
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Zow</h1>
        </header>
        <p className="App-intro">Message from API: {this.state.apiMessage}</p>
      </div>
    );
  }
}

export default App;
