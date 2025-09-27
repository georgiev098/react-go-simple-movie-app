import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Movie() {
  const { id } = useParams(); // Get movie ID from the URL
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers,
    };

    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/movies/${id}`,
          requestOptions
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovie();
  }, [id]);

  if (movie.genres) {
    movie.genres = Object.values(movie.genres);
    console.log("11111", movie);
  } else {
    movie.genres = [];
  }

  // If movie not found
  if (!movie) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
        <Link
          to="/movies"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
      <p className="text-gray-500 mb-2">
        <span className="font-medium">Release Date:</span> {movie.release_date}
      </p>
      <p className="text-gray-500 mb-4">
        <span className="font-medium">Rating:</span> {movie.mpaa_rating}
      </p>
      {movie.genres.map((g) => {
        return (
          <span key={g.id} className="bg bg-gray-400 m-2 px-2 py-1 rounded m-3">
            {g.genre}
          </span>
        );
      })}
      {movie.image !== "" && (
        <div className="m-3">
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.image}`}
            alt="poster"
          />
        </div>
      )}
      <p className="text-gray-700 mb-6">{movie.description}</p>

      <Link
        to="/movies"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Back to Movies
      </Link>
    </div>
  );
}
