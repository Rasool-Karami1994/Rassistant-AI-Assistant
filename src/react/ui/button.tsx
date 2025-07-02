import { ButtonProps } from "@lib/types";
import React from "react";

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  icon,
  onClick,
  width,
  className,
  ...rest
}) => {
  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses = "text-[#1F1F26] bg-[var(--light-green-bg)]";
      break;
    case "secondary":
      variantClasses = "text-[var(--secondary-color)] border border-[var(--secondary-color)] bg-inherit";
      break;
    case "danger":
      variantClasses = "text-white bg-[#FF002B]";
      break;
    default:
      variantClasses = "text-[#1F1F26] bg-[var(--light-green-bg)]";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1 ${width} ${variantClasses} h-10 rounded-lg p-2 text-sm font-medium transition-colors duration-200 ${className} cursor-pointer`}
      {...rest}
    >
      {icon && <span className="inline-flex h-3 w-3">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default Button;
