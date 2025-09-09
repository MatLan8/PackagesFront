import React from "react";

export interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  pattern?: string;
  placeholder?: string;
  maxLength?: number; // <-- add maxLength here
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  required,
  type = "text",
  pattern,
  placeholder,
  maxLength, // <-- receive it here
}) => {
  return (
    <div className="mb-3 d-flex justify-content-center">
      <div>
        <label className="form-label">{label}</label>
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          type={type}
          pattern={pattern}
          placeholder={placeholder}
          maxLength={maxLength} // <-- pass it to input
          className="form-control"
        />
      </div>
    </div>
  );
};

export default FormInput;
