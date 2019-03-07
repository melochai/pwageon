import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";
import Main from "./components/Main";
import ComposeMessage from "./components/ComposeMessage";
import ConfirmMessage from "./components/ConfirmMessage";
import ErrorMessage from "./components/ErrorMessage";
import D3Container from "./containers/D3Container";

// Components

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      displayCompose: false,

      pigeons: [
        {
          name: "pigi",
          speed: "C",
          stamina: "C",
          success: "B",
          image: "../assets/pigeon-standard.png"
        },
        {
          name: "mugi",
          speed: "B",
          stamina: "D",
          success: "B",
          image: "../assets/courier_pidgeon.jpg"
        },
        { name: "pugi", speed: "F", stamina: "A", success: "C" }
      ],
      increment: 0
    };
  }
  incrementPigi = () => {
    if (this.state.increment + 1 >= this.state.pigeons.length) {
      this.setState({ increment: 0 });
    } else {
      this.setState({ increment: this.state.increment + 1 });
    }
  };
  click = () => {
    this.setState({ loggedIn: !this.state.loggedIn });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              this.state.loggedIn ? (
                <Main
                  displayPigi={this.state.pigeons[this.state.increment]}
                  incrementPigi={this.incrementPigi}
                />
              ) : (
                <SignIn click={this.click} />
              )
            }
          />
          <Route path="/compose" component={ComposeMessage} />
          <Route path="/confirm" component={ConfirmMessage} />
          <Route path="/map" component={D3Container} />
          <Route component={ErrorMessage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
