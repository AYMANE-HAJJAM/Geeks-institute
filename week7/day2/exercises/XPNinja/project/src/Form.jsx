import React, { useState } from "react";
import Input from "./Input";
export default function Form() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const validate = () => {
    let newErrors = {};
    if (!values.firstName.trim()) newErrors.firstName = "First name is required";
    if (!values.lastName.trim()) newErrors.lastName = "Last name is required";
    const phoneRegex = /^[0-9]{10}$/; 
    if (!values.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(values.phone))
      newErrors.phone = "Invalid phone number (must be 10 digits)";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(values.email))
      newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("✅ Submitted data:", values);
      alert("Form submitted successfully!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🧾 Form Validation</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "inline-block",
          textAlign: "left",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <Input
          label="First Name"
          name="firstName"
          type="text"
          value={values.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />

        <Input
          label="Last Name"
          name="lastName"
          type="text"
          value={values.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />

        <Input
          label="Phone"
          name="phone"
          type="text"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
