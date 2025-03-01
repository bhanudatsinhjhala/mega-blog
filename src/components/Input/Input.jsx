import { forwardRef } from 'react';

function Input(
  {
    id = 'label',
    label = undefined,
    bgColor = 'bg-gray-200',
    borderColor = 'border-gray-300',
    textColor = 'text-white-900',
    ringColor = 'rung-gray-300',
    placeHolderColor = 'placeholder-gray-500',
    childHtml,
    className = '',

    name = 'name',
    type,
    ...props
  },
  ref
) {
  return (
    <div>
      {label && type !== 'submit' && (
        <label htmlFor={id} className={`block mt-2 mb-2 text-sm font-medium ${textColor}`}>
          {label}
        </label>
      )}
      {childHtml}
      <div className="mt-2">
        <input
          type={type}
          id={id}
          name={name}
          ref={ref}
          className={` ${bgColor} ${textColor} ${borderColor} text-sm rounded-lg focus:${ringColor} focus:${borderColor} block w-full p-2.5 dark:${bgColor} dark:${borderColor} dark:${placeHolderColor} dark:${textColor} dark:focus:${ringColor} dark:focus:${borderColor} ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}

export default forwardRef(Input);
