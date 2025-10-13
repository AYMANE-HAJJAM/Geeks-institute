import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      post: "",
      responseMessage: ""
    };
  }

  async componentDidMount() {
    const response = await fetch("http://localhost:5000/api/hello");
    const data = await response.json();
    this.setState({ message: data.message });
  }

  handleChange = (e) => {
    this.setState({ post: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/world", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: this.state.post })
      });

      const data = await response.json();
      this.setState({ responseMessage: data.message });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  render() {
    const { message, post, responseMessage } = this.state;

    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>{message}</h1>

        <form onSubmit={this.handleSubmit} style={{ marginTop: "20px" }}>
          <input
            type="text"
            name="post"
            value={post}
            onChange={this.handleChange}
            placeholder="Type something..."
            style={{ padding: "8px", width: "250px" }}
          />
          <button
            type="submit"
            style={{ marginLeft: "10px", padding: "8px 15px" }}
          >
            Send
          </button>
        </form>

        {responseMessage && (
          <h3 style={{ marginTop: "30px", color: "green" }}>{responseMessage}</h3>
        )}
      </div>
    );
  }
}

export default App;
