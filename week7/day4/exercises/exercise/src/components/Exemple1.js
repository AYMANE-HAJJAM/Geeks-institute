import React, { Component } from "react";
import data from "../data.json";

class Example1 extends Component {
    render() {
        return (
            <div className="container mt-4">
                <h3>Social Medias</h3>
                <ul>
                    {data.SocialMedias.map((link, index) => (
                        <li key={index}>
                            <a href={link} target="_blank" rel="noopener noreferrer">
                                {link}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Example1;
