import React from 'react';

class Joke extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
  }

  handleUpClick(evt) {
    this.props.upVote(this.props.id);
  }
  // either do this or arrow fn, don't do both 

  handleDownClick(evt) {
    this.props.downVote(this.props.id);
  }

  render() {
    return (
      <p>
        {this.props.joke}
        <br></br><button onClick={this.handleUpClick}>Vote Up</button>
        <br></br><button onClick={this.handleDownClick}>Vote Down</button>
        <br></br>Score: {this.props.score}
        {/* use br */}
      </p>
    )
  }
}

export default Joke;