import { Link, useNavigate } from "react-router-dom";

export default function Header({ jwtToken, setJwtToken }) {
  const navigate = useNavigate();
  function handleLogOut() {
    setJwtToken(null);
    navigate("/");
  }

  return (
    <header className="border-b bg-white shadow-sm p-4 flex items-center justify-between">
      <h1 className="text-3xl font-extrabold text-gray-800">
        Go Watch a Movie!
      </h1>

      {jwtToken ? (
        <button
          onClick={handleLogOut}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          Logout
        </button>
      ) : (
        <Link
          to="/login"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Login
        </Link>
      )}
    </header>
  );
}
