import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import JokesList from './JokesList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <JokesList />
      </div>
    );
  }
}

export default App;
