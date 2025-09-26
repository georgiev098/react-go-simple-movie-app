const TextArea = (props) => {
  return (
    <div className="mb-4">
      {/* Label */}
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {props.title}
      </label>

      {/* Textarea */}
      <textarea
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        rows={props.rows || 4}
        className="w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3 text-gray-900 shadow-sm"
      />

      {/* Error message */}
      {props.errorMsg && (
        <div className="mt-2 text-sm text-red-600">{props.errorMsg}</div>
      )}
    </div>
  );
};

export default TextArea;
