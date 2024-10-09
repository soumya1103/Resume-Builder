import React from "react";
import "./Input.css";

function Input({ label, name, min, max, type, value, onChange, className, maxLength, disabled, readOnly }) {
  return (
    <div className="form-content">
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
          // onChange={(e) => onChange(e)}
          autoComplete="on"
          min={min}
          max={max}
          placeholder={label}
          maxLength={maxLength}
          readOnly={readOnly}
          rows="11"
        />
      ) : (
        <input
          className={disabled ? `form-field-input disabled ${className}` : `form-field-input ${className}`}
          id={name}
          name={name}
          type={type}
          value={value}
          // onChange={(e) => onChange(e)}
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
