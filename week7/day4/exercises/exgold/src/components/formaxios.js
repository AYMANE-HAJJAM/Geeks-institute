import React, { Component } from "react";
import axios from "axios";

class FormAxios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            title: "",
            body: ""
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { userId, title, body } = this.state;

        const data = { userId, title, body };

        try {
            const response = await axios.post(
                "https://jsonplaceholder.typicode.com/users/",
                data,
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Posted data:", response.data);
            alert("Data posted successfully! Check console.");
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };

    render() {
        const { userId, title, body } = this.state;

        return (
            <div className="container mt-5">
                <h2 className="mb-4">POST JSON Data with Axios</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="userId" className="form-label">User ID</label>
                        <input
                            type="number"
                            id="userId"
                            name="userId"
                            placeholder="Enter user ID"
                            className="form-control"
                            value={userId}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter title"
                            className="form-control"
                            value={title}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="body" className="form-label">Body</label>
                        <textarea
                            id="body"
                            name="body"
                            placeholder="Enter body"
                            className="form-control"
                            value={body}
                            onChange={this.handleChange}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default FormAxios;
