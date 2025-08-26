import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Catalogue({ jwtToken }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) {
      navigate("/");
      return;
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + jwtToken);

    const requestOptions = {
      method: "GET",
      headers,
    };

    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/admin/movies`,
          requestOptions
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, [jwtToken, navigate]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Manage Catalogue
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/admin/movies/${movie.id}`}>
            <div
              key={movie.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
              <p className="text-gray-500 mb-1">
                <span className="font-medium">Release:</span>{" "}
                {movie.release_date}
              </p>
              <p className="text-gray-500 mb-3">
                <span className="font-medium">Rating:</span> {movie.mpaa_rating}
              </p>
              <p className="text-gray-700 text-sm">{movie.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
