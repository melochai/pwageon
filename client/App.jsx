import React, { Component } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Main from "./components/Main";
import ComposeMessage from "./components/ComposeMessage";
import ConfirmMessage from "./components/ConfirmMessage";

// Components

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      displayCompose: false,
      messageBody: '',
      messageTo: '',
      messageTitle: '',
      messageFrom: '',
      messageLocation: '',

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
        { name: "pugi", 
          speed: "F", 
          stamina: "A", 
          success: "C",
          image: "../assets/dimpidgey.png" 
        },
        { name: "boogi", 
          speed: "F", 
          stamina: "A", 
          success: "C",
          image: "../assets/fattydove.png" 
        },
        { name: "fubai", 
          speed: "F", 
          stamina: "A", 
          success: "C",
          image: "../assets/deadpidgey.png" 
        }
      
      ],
      increment: 0
    };
  };
  changeMessage = (e) => {
      if(e.target.id === 'message-title'){
         this.setState({messageTitle: e.target.value})
      }
      if(e.target.id === 'message-to'){
         this.setState({messageTo: e.target.value})

      }
      if(e.target.id === 'message-body'){
         this.setState({messageBody: e.target.value})
      }
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
        <div>
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
          <Route path="/compose" render={() => <ComposeMessage changeMessage={this.changeMessage}/>} />
          <Route path="/confirm" render={() => <ConfirmMessage statey={this.state}/>} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
