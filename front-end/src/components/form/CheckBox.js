export default function CheckBox(props) {
  return (
    <div className="flex items-center space-x-2">
      {/* Checkbox input */}
      <input
        id={props.name}
        type="checkbox"
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        checked={props.checked}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />

      {/* Label */}
      <label
        htmlFor={props.name}
        className="text-sm font-medium text-gray-700 cursor-pointer"
      >
        {props.title}
      </label>
    </div>
  );
}
