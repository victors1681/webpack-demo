import React from "react";
import "./Counter.scss";

export default class Counter extends React.PureComponent {
  state = {
    counter: 0
  };

  increaseCounter = () =>
    this.setState(prevState => ({ counter: prevState.counter + 1 }));

  render() {
    return (
      <div className="counter-wrapper">
        <h1 className="counter-header">This is my counter</h1>
        <p className="counter-result">Counter is: {this.state.counter}</p>
        <button className="counter-button" onClick={this.increaseCounter}>
          Increase
        </button>
      </div>
    );
  }
}
