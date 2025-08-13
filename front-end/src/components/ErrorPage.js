import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
      <h1 className="text-9xl font-extrabold text-gray-200">404</h1>
      <h2 className="text-3xl font-bold text-gray-800 mt-4">
        Oops! Page not found
      </h2>
      <p className="text-gray-500 mt-2 mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
      >
        Go Home
      </Link>
    </div>
  );
}
