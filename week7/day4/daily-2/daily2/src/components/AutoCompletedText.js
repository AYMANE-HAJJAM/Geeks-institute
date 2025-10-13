import React, { Component } from "react";
import countries from "./Countries";
import "./AutoCompletedText.css"; 

class AutoCompletedText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            text: "",
        };
    }

    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, "i");
            suggestions = countries.sort().filter((v) => regex.test(v));
        }
        this.setState({ suggestions, text: value });
    };

    suggestionSelected(value) {
        this.setState({
            text: value,
            suggestions: [],
        });
    }

    renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <div className="suggestions-container">
                <ul>
                    {suggestions.map((item, index) => (
                        <li key={index} onClick={() => this.suggestionSelected(item)}>
                            <span className="bar"></span>
                            {item}
                        </li>
                    ))}
                </ul>
                <div className="footer">
                    Suggestions: {suggestions.length}
                </div>
            </div>
        );
    }

    render() {
        const { text } = this.state;

        return (
            <div className="auto-container">
                <h3>Auto Completed</h3>
                <input
                    type="text"
                    value={text}
                    onChange={this.onTextChanged}
                    placeholder="Type a country..."
                />
                {this.renderSuggestions()}
            </div>
        );
    }
}

export default AutoCompletedText;
