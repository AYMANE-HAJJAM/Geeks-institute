import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FormPost from "./components/formpost";
import FormAxios from "./components/formaxios";

function App() {
  return (
    <div className="App">
      <FormPost />
      <FormAxios />
    </div>
  );
}

export default App;
