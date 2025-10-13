import React, { Component } from "react";
import data from "../data.json";

class Example3 extends Component {
    render() {
        return (
            <div className="container mt-4">
                <h3>Experiences</h3>
                {data.Experiences.map((exp, index) => (
                    <div key={index} className="card mb-3 shadow-sm">
                        <div className="card-body">
                            <h5>
                                <a href={exp.url} target="_blank" rel="noopener noreferrer">
                                    {exp.companyName}
                                </a>
                            </h5>
                            <img
                                src={exp.logo}
                                alt={exp.companyName}
                                style={{ width: "100px", marginBottom: "10px" }}
                            />
                            {exp.roles.map((role, idx) => (
                                <div key={idx} className="mb-2">
                                    <strong>{role.title}</strong>
                                    <p>{role.description}</p>
                                    <small>
                                        {role.startDate} - {role.endDate} | {role.location}
                                    </small>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Example3;
