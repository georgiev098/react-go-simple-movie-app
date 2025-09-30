import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Input from "./form/Input";

export default function GraphQL() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [fullList, setFullList] = useState([]);

  const performSearch = async () => {
    const payload = `
    {
      search(titleContains: "${query}") {
        id
        title
        runtime
        release_date
        mpaa_rating
      }
    }`;

    try {
      const headers = new Headers({
        "Content-Type": "application/graphql",
      });

      const requestOptions = {
        method: "POST",
        headers,
        body: payload,
      };

      const response = await fetch(
        "http://localhost:8080/graph",
        requestOptions
      );
      const data = await response.json();

      if (data.error) {
        console.error(data.error);
      } else {
        // data.data.search should be the array returned by GraphQL
        setMovies(data.data.search);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();

    let value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      await performSearch();
    } else {
      setMovies(fullList);
    }
  };

  useEffect(() => {
    const payload = `
      {
        list {
        id
        title
        runtime
        release_date
        mpaa_rating
        }
      }`;

    const getData = async () => {
      try {
        const headers = new Headers({
          "Content-Type": "application/graphql",
        });
        const requestOptions = {
          method: "POST",
          headers,
          body: payload,
        };

        const response = await fetch(
          `http://localhost:8080/graph`,
          requestOptions
        );

        const data = await response.json();
        const list = Object.values(data.data.list);

        if (data.error) {
          console.error(data.error);
        } else {
          setMovies(list);
          setFullList(list);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">GraphQL</h2>
      <hr className="border-gray-300 mb-4" />

      <form onSubmit={handleChange} className="flex items-center space-x-2">
        <Input
          title="Search"
          type="search"
          name="search"
          value={query}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg 
                     shadow hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 transition duration-200"
        >
          Search
        </button>
      </form>
      {movies ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Movie
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Release Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {movies.map((movie) => (
                <tr
                  key={movie.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-3 text-gray-800 font-medium">
                    <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {new Date(movie.release_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-semibold">
                      {movie.mpaa_rating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Movies Found</p>
      )}
    </div>
  );
}
