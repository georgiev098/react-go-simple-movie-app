import { useParams, Link } from "react-router-dom";

export default function Movie() {
  const { id } = useParams(); // Get movie ID from the URL

  // Temporary movie data (same as Movies.jsx)
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

  // Find the movie that matches the ID from the URL
  const movie = tempMovies.find((m) => m.id === Number(id));

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
