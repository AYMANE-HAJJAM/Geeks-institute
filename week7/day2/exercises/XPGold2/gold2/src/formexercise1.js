import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function FormExercise1() {
    const [formData, setFormData] = useState({ author: "", title: "", genre: "", publicationYear: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        setSubmitted(true);
    };

    return (
        <div className="container flex-column">
            <h2>Exercise 1: Use data from a Form</h2>

            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Author:</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Genre:</label>
                        <input
                            type="text"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            className="form-control"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Publication Year:</label>
                        <input
                            type="number"
                            name="publicationYear"
                            value={formData.publicationYear}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            ) : (
                <h4 className="text-success mt-3">Form submitted successfully!</h4>
            )}
        </div>
    );
}

export default FormExercise1;
