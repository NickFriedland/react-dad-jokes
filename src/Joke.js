import React, { Component } from 'react';

class Joke extends Component {
  render() {
    return (
      <span>
        {this.props.joke}
        <button onClick={this.props.voteDown}>
          <i className="fas fa-thumbs-down" />
        </button>
        <button onClick={this.props.voteUp}>
          <i className="fas fa-thumbs-up" />
        </button>
        Net Score: {this.props.netScore}
      </span>
    );
  }
}

export default Joke;
