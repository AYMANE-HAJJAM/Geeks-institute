import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <div className="App container mt-5">
      <h1 className="text-center mb-4 text-primary">
        Exercise: React Modal with Error Handling
      </h1>
      <ErrorBoundary />
    </div>
  );
}

export default App;
