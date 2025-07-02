import React from "react";

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = "" }) => {
  return (
    <div
      className={`flex w-full items-center justify-center ${className} mt-8`}
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--light-green-bg)] border-t-transparent" />
    </div>
  );
};

export default LoadingSpinner;
