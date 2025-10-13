import React from "react";

export default function Input({ label, type, name, value, onChange, error }) {
  return (
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", fontWeight: "bold" }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "250px",
          padding: "8px",
          borderRadius: "5px",
          border: error ? "2px solid red" : "1px solid #ccc",
        }}
      />
      {error && (
        <p style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
          {error}
        </p>
      )}
    </div>
  );
}
