import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function OneGenre() {
  const location = useLocation();
  const { genreName } = location.state;

  const [movies, setMovies] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const reqOptions = {
      method: "GET",
      headers,
    };

    const getGenres = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/genres/${id}`,
          reqOptions
        );

        const data = await res.json();

        setMovies(data);
      } catch (err) {
        console.log(err);
      }
    };

    getGenres();
  }, [id]);

  return (
    <>
      <h2>Genre: {genreName}</h2>

      <div className="overflow-x-auto">
        {movies ? (
          <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Movie
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Release Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {movies.map((m) => (
                <tr
                  key={m.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-2">
                    <Link
                      to={`/movies/${m.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {m.title}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-gray-600">{m.release_date}</td>
                  <td className="px-4 py-2 text-gray-600">{m.mpaa_rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No movies in this genre</p>
        )}
      </div>
    </>
  );
}
