import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Example1 from "./components/Exemple1.js";
import Example2 from "./components/Exemple2.js";
import Example3 from "./components/Exemple3.js";
import Webhook from "./components/Webhook.js";

function App() {
  return (
    <div className="App">
      <h1 className="text-center mt-4 mb-4">Display JSON Data in React</h1>
      <Example1 />
      <Example2 />
      <Example3 />
      <Webhook />
    </div>
  );
}

export default App;
