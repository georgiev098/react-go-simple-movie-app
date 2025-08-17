import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Temporary movie data
const tempMovies = [
  {
    id: 1,
    title: "Inception",
    release_date: "2010-07-16",
    mpaa_rating: "PG-13",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into a CEO's mind.",
  },
  {
    id: 2,
    title: "The Matrix",
    release_date: "1999-03-31",
    mpaa_rating: "R",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  },
  {
    id: 3,
    title: "Interstellar",
    release_date: "2014-11-07",
    mpaa_rating: "PG-13",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
];

export default function Movies() {
  const [movies, setMovies] = useState(tempMovies);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers,
    };

    const fetchMovies = async () => {
      try {
        const res = await fetch(`http://localhost:8080/movies`, requestOptions);

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Movies List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
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
