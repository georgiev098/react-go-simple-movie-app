import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const reqOptions = {
      method: "GET",
      headers,
    };

    const getGenres = async () => {
      try {
        const res = await fetch(`http://localhost:8080/genres`, reqOptions);

        const data = await res.json();

        if (data.error) setError(data.message);

        setGenres(data);
      } catch (err) {
        console.log(err);
      }
    };

    getGenres();
  }, []);

  if (error !== null) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-2">Genres</h2>
        <hr className="border-gray-300 mb-4" />

        <div className="flex flex-col space-y-2">
          {genres.map((g) => (
            <Link
              key={g.id}
              to={`/genres/${g.id}`}
              state={{ genreName: g.genre }}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 
                       shadow-sm text-gray-800 font-medium transition duration-200"
            >
              {g.genre}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
