import React from 'react';
import Joke from './Joke'
import axios from 'axios';
import uuid from 'uuid/v4';

axios.defaults.headers.get['Accept'] = 'application/json'

class JokeList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };

    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  async componentDidMount() {
    let jokes = await this.createArray()
    this.setState({ jokes });
  }

  // for (let i = 0; i < 9; i++) {
  //   let joke = {
  //     content: jokesArr[i],
  //     id: uuid(),
  //     score: 0
  //   };

  //   this.setState(st => ({
  //     jokes: [...st.jokes, joke]
  //   }));
  // }
  // }

  async createArray() {
    let jokesArr = Array.from({ length: 10 });
    let jokesRequests = jokesArr.map(() => axios.get('https://icanhazdadjoke.com/'))
    let resolvedJokes = (await Promise.all(jokesRequests)).map(data => ({
      id: data.data.id,
      joke: data.data.joke,
      score: 0
    }));
    return resolvedJokes;
  }

  upVote(id) {
    this.setState(st => ({
      jokes: st.jokes.map(j => (j.id === id ? { ...j, score: j.score + 1 } : j))
    }))
  }

  downVote(id) {
    this.setState(st => ({
      jokes: st.jokes.map(j => (j.id === id ? { ...j, score: j.score - 1 } : j))
    }))
  }

  render() {
    return (
      <div>
        {this.state.jokes.map((j) =>
          <Joke joke={j.joke}
            key={j.id}
            id={j.id}
            score={j.score}
            upVote={this.upVote}
            downVote={this.downVote} />
          // without arrow fn, i'm invoking the fn 
          // the fn sets state but render sets state so it'll infinite loop
          // arrow fn passes down fn rather than invocation of fn
        )}
      </div>
    )
  }
}

export default JokeList;