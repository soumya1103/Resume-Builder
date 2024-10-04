import React from "react";
import "./Input.css";

function Input({ label, name, min, max, type, value, onChange, className, maxLength, disabled, readOnly }) {
  return (
    <div className="form-content">
      <label htmlFor={name} className="form-field-label">
        {label}
      </label>
      <input
        className={disabled ? `form-field-input disabled ${className}` : `form-field-input ${className}`}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        autoComplete="off"
        min={min}
        max={max}
        placeholder={label}
        maxLength={maxLength}
        readOnly={readOnly}
      />
    </div>
  );
}

export default Input;
