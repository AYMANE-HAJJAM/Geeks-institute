import React, { useState } from "react";

function FormExercise2() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email.includes("@")) {
            alert("Please enter a valid email.");
            return;
        }

        setSubmitted(true);
    };

    const handleReset = () => {
        setFormData({
            firstName: "",
            lastName: "",
            phone: "",
            email: ""
        });
        setSubmitted(false);
    };

    return (
        <div>
            <h2>Exercise 2: Display user input from a Form</h2>

            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Phone:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success me-2">
                        Submit
                    </button>
                    <button type="button" onClick={handleReset} className="btn btn-secondary">
                        Reset
                    </button>
                </form>
            ) : (
                <div className="mt-4">
                    <h4>User Data:</h4>
                    <p><strong>First Name:</strong> {formData.firstName}</p>
                    <p><strong>Last Name:</strong> {formData.lastName}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <button onClick={handleReset} className="btn btn-primary">
                        Back to Form
                    </button>
                </div>
            )}
        </div>
    );
}

export default FormExercise2;
