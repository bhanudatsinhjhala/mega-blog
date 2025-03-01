import React from 'react';

function Select({ options, label, id, bgColor, appColor, className = '', ...props }, ref) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className={`block mb-2 text-sm font-medium text-gray-900`}>
          {label}
        </label>
      )}
      <select
        id="countries"
        ref={ref}
        className={`bg-${bgColor}-50 border border-${bgColor}-300 text-gray-900 text-sm rounded-lg focus:ring-${appColor}-500 focus:border-${appColor}-500 block w-full p-2.5 `}
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
