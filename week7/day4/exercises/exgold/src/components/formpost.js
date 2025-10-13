import React, { Component } from "react";

class FormPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            email: ""
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { user, email } = this.state;

        const data = { user, email };

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log("Posted data:", result);
            alert("Data posted successfully! Check console.");
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    render() {
        const { user, email } = this.state;

        return (
            <div className="container mt-5">
                <h2 className="mb-4">POST JSON Data</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">
                            User
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="user"
                            name="user"
                            value={user}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default FormPost;
