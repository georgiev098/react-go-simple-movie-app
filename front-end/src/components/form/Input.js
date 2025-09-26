const Input = (props) => {
  return (
    <div className="mb-4">
      {/* Label */}
      {props.title && (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {props.title}
        </label>
      )}

      {/* Input field */}
      <input
        type={props.type || "text"}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={`w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 ${
          props.className || ""
        }`}
      />

      {/* Error message */}
      {props.errorMsg && (
        <div className={props.errorDiv || "mt-2 text-sm text-red-600"}>
          {props.errorMsg}
        </div>
      )}
    </div>
  );
};

export default Input;
