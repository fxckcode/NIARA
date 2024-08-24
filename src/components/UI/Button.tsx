// Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-[#FF7A00] text-white rounded-md hover:bg-[#e7852a] focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:ring-opacity-50 ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;