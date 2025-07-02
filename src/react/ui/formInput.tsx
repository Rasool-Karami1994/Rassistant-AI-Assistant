import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  className?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ placeholder, type, hasError, className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`block min-h-11 w-full rounded-lg border ${
          hasError
            ? "border-[var(--danger-color)]"
            : "border-[var(--secondary-color)] focus:border-[var(--light-green-bg)]"
        } p-3 text-sm text-[var(--placeholder-color)] focus:outline-none ${className || ""}`}
        placeholder={placeholder}
        {...rest}
      />
    );
  }
);

export default FormInput;