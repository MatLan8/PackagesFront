import React from "react";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
}) => {
  return (
    <div className="mb-3 d-flex justify-content-center">
      <div>
        <label className="form-label">{label}</label>
        <input
          type={type}
          className="form-control w-100"
          style={{ maxWidth: "250px" }}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </div>
  );
};

export default FormInput;
