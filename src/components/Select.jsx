import React, { useId } from 'react';
import PropTypes from 'prop-types';

const Select = React.forwardRef(function Select({
  options,
  label,
  className = '',
  ...props
}, ref) {
  const id = useId();

  return (
    <div className=" flex justify-between items-center">
      {label && <label htmlFor={id} className="">{label}</label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 w-4/6 h-12 py-2 rounded-lg  text-black outline-none focus:bg-gray-900 duration-200 border ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Select;
