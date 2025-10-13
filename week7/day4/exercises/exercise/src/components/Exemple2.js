import React, { Component } from "react";
import data from "../data.json";

class Example2 extends Component {
    render() {
        return (
            <div className="container mt-4">
                <h3>Skills</h3>
                {data.Skills.map((skillGroup, index) => (
                    <div key={index} className="mb-3">
                        <h5>{skillGroup.Area}</h5>
                        <ul>
                            {skillGroup.SkillSet.map((skill, idx) => (
                                <li key={idx}>
                                    {skill.Name} {skill.Hot ? "🔥" : ""}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    }
}

export default Example2;
