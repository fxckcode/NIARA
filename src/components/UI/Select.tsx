import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

const Select: React.FC<SelectProps> = ({ error = "", label, ...props }) => {
  return (
    <div className="mb-2 w-full">
      <label className="block text-sm font-medium text-gray-700" htmlFor={label}>
        {label}
      </label>
      <select
        id={label}
        {...props}
        className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#FF7A00] blue-500 focus:border-[#FF7A00] ${props.className}`}
      >
        {props.children}
      </select>
      {error !== '' && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default Select;