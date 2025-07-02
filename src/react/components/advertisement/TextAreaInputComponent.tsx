import React from "react";

interface TextAreaInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
  className?: string;
}

const TextAreaInput = React.forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ className, hasError, ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        {...rest}
        className={`block min-h-20 w-full rounded-lg border ${
          hasError
            ? "border-[var(--danger-color)]"
            : "border-[var(--secondary-color)] focus:border-[var(--light-green-bg)]"
        } p-3 text-sm text-[var(--placeholder-color)] focus:outline-none ${className || ""}`}
      />
    );
  }
);

export default TextAreaInput;