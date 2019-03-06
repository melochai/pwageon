import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Main from './components/Main';
import ComposeMessage from './components/ComposeMessage';
import ConfirmMessage from './components/ConfirmMessage';

// Components

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }
  
  click = () => {
    this.setState({ loggedIn: true });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => (
              this.state.loggedIn ? <Main /> : <SignIn click={this.click} />
            )}
          />
          <Route path="/compose" component={ComposeMessage} />
          <Route path="/confirm" component={ConfirmMessage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
