import React from "react";
import ErrorBoundary from "./ErrorBoundary";

// BuggyCounter Component
class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick = () => {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }));
  };

  render() {
    if (this.state.counter === 5) {
      throw new Error("I crashed!");
    }

    return (
      <h2 onClick={this.handleClick} style={{ cursor: "pointer" }}>
        {this.state.counter}
      </h2>
    );
  }
}

// App Component
function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Click on the numbers to increase the counters.</h2>
      <p>
        The counter is programmed to throw an error when it reaches 5. This
        simulates a JavaScript error in a component.
      </p>

      {/* --- Simulation 1 --- */}
      <hr />
      <h3>Simulation 1:</h3>
      <p>
        These two counters are inside <strong>one ErrorBoundary</strong>. If one
        crashes, both will be replaced by the error message.
      </p>
      <ErrorBoundary>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>

      {/* --- Simulation 2 --- */}
      <hr />
      <h3>Simulation 2:</h3>
      <p>
        Each counter is inside <strong>its own ErrorBoundary</strong>. So if one
        crashes, the other keeps working.
      </p>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>

      {/* --- Simulation 3 --- */}
      <hr />
      <h3>Simulation 3:</h3>
      <p>
        This counter is <strong>not wrapped</strong> in an ErrorBoundary. If it
        crashes, the entire app will crash.
      </p>
      <BuggyCounter />
    </div>
  );
}

export default App;
