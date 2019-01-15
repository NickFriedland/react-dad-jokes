import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';

class JokesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      netScore: 0
    };
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    // Get previous jokes from localStorage (if available)
    if (localStorage.jokes) {
      let storedJokes = JSON.parse(localStorage.jokes);
      this.setState({ jokes: storedJokes });
    }
  }

  async handleRefresh() {
    const randInt = Math.floor(Math.random() * 52) + 1;
    const response = await axios.get(
      `https://icanhazdadjoke.com/search?page=${randInt}&limit=10`,
      {
        headers: { Accept: 'application/json' }
      }
    );
    console.log(response);
    const { results } = response.data;
    const jokes = results.map(r => ({ ...r, netScore: 0 }));
    this.setState({ jokes: jokes });
  }

  handleVoteUp(id) {
    this.setState(
      {
        jokes: this.state.jokes.map(joke => {
          if (joke.id === id) {
            joke.netScore += 1;
          }
          return joke;
        })
      } /* FUNCTION localStorage.setItem for jokes */
    );
  }

  handleVoteDown(id) {
    this.setState(
      {
        jokes: this.state.jokes.map(joke => {
          if (joke.id === id) {
            joke.netScore -= 1;
          }
          return joke;
        })
      } /* FUNCTION localStorage.setItem for jokes */
    );
  }

  componentDidUpdate(prevProps, prevState) {
    let jokes = JSON.stringify(this.state.jokes);
    localStorage.setItem('jokes', jokes);
  }

  render() {
    // let sortedJokes = this.state.jokes

    let sortedJokes;
    if (this.state.jokes.length !== 0) {
      sortedJokes = this.state.jokes.sort(function(a, b) {
        return b.netScore - a.netScore;
      });
    }
    return (
      <div>
        <h1>HERE ARE SOME GREAT JOKES!!!!</h1>
        {sortedJokes
          ? sortedJokes.map(joke => (
              <p key={joke.id}>
                <Joke
                  joke={joke.joke}
                  netScore={joke.netScore}
                  voteDown={this.handleVoteDown.bind(this, joke.id)}
                  voteUp={this.handleVoteUp.bind(this, joke.id)}
                />
              </p>
            ))
          : ''}
        <button onClick={this.handleRefresh}>Get new jokes!</button>
      </div>
    );
  }
}

export default JokesList;
