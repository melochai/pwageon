import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import Main from './components/Main';
import ComposeMessage from './components/ComposeMessage';
import ConfirmMessage from './components/ConfirmMessage';
import ErrorMessage from './components/ErrorMessage';
import D3Container from './containers/D3Container';

// Components

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      displayCompose: false,
      messagesSent: [],
      messagesInTransit: [],
      messagesRecieved: [],
      messageBody: '',
      messageTo: '',
      messageTitle: '',
      messageFrom: '',
      messageLocation: '',

      pigeons: [{}],
      increment: 0,
    };
  }

  componentWillMount() {
    fetch('/api/getAllUserPigeons', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: 2 }),
    })
      .then(res => res.json())
      .then(pigeons => {
        this.setState({ pigeons: pigeons });
      });
  }
  changeMessage = e => {
    if (e.target.id === 'message-title') {
      this.setState({ messageTitle: e.target.value });
    }
    if (e.target.id === 'message-to') {
      this.setState({ messageTo: e.target.value });
    }
    if (e.target.id === 'message-body') {
      this.setState({ messageBody: e.target.value });
    }
  };
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
  sendMessage() {
    fetch('/api/sendMessage', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_sending_id: 2,
        user_receiving_id: 1,
        email_address: 'chang@gamil.com',
      }),
    })
      .then(res => res.json())
      .then(pigeons => {
        this.setState({ pigeons: pigeons });
      });
  }

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
          <Route
            path="/compose"
            render={() => <ComposeMessage changeMessage={this.changeMessage} />}
          />
          <Route path="/confirm" render={() => <ConfirmMessage statey={this.state} />} />
          <Route path="/map" component={D3Container} />
          <Route component={ErrorMessage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
