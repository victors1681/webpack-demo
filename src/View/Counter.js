import React from "react";

export default class Counter extends React.PureComponent {
  state = {
    counter: 0
  };

  increaseCounter = () =>
    this.setState(prevState => ({ counter: prevState.counter + 1 }));

  render() {
    return (
      <div>
        <p>This is my counter</p>
        <p>Counter is: {this.state.counter}</p>
        <p>
          <button onClick={this.increaseCounter}>Increase</button>
        </p>
      </div>
    );
  }
}
