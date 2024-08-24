import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ error="", label, ...props }) => {
  return (
    <div className="mb-2 w-full flex flex-col">
      <label className="block text-sm font-medium text-gray-700" htmlFor={label}>{label}</label>
      <input
        autoCapitalize='none'
        id={label}
        {...props}
        className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#FF7A00] focus:border-[#FF7A00] ${props.className}`}
      />
      { error != '' && (
        <p className='text-red-500 text-sm'>{error}</p>
      )}
    </div>
  );
};

export default Input;