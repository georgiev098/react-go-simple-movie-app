const Select = (props) => {
  return (
    <div className="mb-4">
      {/* Label */}
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {props.title}
      </label>

      {/* Select dropdown */}
      <select
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        className="w-full rounded-lg border border-gray-300 bg-white p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
      >
        {/* Placeholder */}
        <option value="">{props.placeHolder}</option>

        {/* Options */}
        {props.options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>

      {/* Error message */}
      {props.errorMsg && (
        <div className="mt-2 text-sm text-red-600">{props.errorMsg}</div>
      )}
    </div>
  );
};

export default Select;
