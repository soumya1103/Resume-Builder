import React from "react";
import "./Input.css";

function Input({ label, name, min, max, type, value, onChange, className, maxLength, disabled, readOnly, margin = "3%" }) {
  return (
    <div className="form-content" style={{ marginTop: margin }}>
      <label htmlFor={name} className="form-field-label">
        {label}
      </label>
      <br />
      {type === "textarea" ? (
        <textarea
          className={disabled ? `form-field-input disabled ${className}` : `form-field-input ${className}`}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e)}
          autoComplete="on"
          min={min}
          max={max}
          placeholder={label}
          maxLength={maxLength}
          readOnly={readOnly}
          rows={label === "Objective" ? 11 : label === "Summary" ? 5 : 1}
        />
      ) : (
        <input
          className={disabled ? `form-field-input disabled ${className}` : `form-field-input ${className}`}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e)}
          autoComplete="on"
          min={min}
          max={max}
          placeholder={label}
          maxLength={maxLength}
          readOnly={readOnly}
        />
      )}
    </div>
  );
}

export default Input;
