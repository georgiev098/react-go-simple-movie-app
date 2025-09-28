import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "./form/Input";
import Select from "./form/Select";
import TextArea from "./form/TextArea";
import CheckBox from "./form/CheckBox";

export default function EditMovie({ jwtToken }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    release_date: "",
    runtime: "",
    mpaa_rating: "",
    description: "",
    genres: [],
    genres_array: [Array(13).fill(false)],
  });

  let { id } = useParams();
  const mpaaOptions = [
    {
      id: "G",
      value: "G",
    },
    {
      id: "PG",
      value: "PG",
    },
    {
      id: "PG-13",
      value: "PG-13",
    },
    {
      id: "R",
      value: "R",
    },
    {
      id: "NC-17",
      value: "NC-17",
    },
    {
      id: "18-A",
      value: "18-A",
    },
  ];

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login");
      return;
    }

    const headers = new Headers({ "Content-Type": "application/json" });
    const requestOptions = { method: "GET", headers };

    const fetchGenres = async () => {
      try {
        const res = await fetch("http://localhost:8080/genres", requestOptions);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        return data.map((g) => ({
          id: g.id,
          genre: g.genre,
          checked: false,
        }));
      } catch (err) {
        console.error("Error fetching genres:", err);
        return [];
      }
    };

    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/movies/${id}`,
          requestOptions
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();

        // Normalize release_date
        const movieData = {
          ...data,
          release_date: new Date(data.release_date).toISOString().split("T")[0],
        };

        return movieData;
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError("Invalid response code: " + err);
        return null;
      }
    };

    const loadData = async () => {
      const [genres, movieData] = await Promise.all([
        fetchGenres(),
        fetchMovie(),
      ]);

      if (!movieData) return;

      // Merge genres with selection state
      const mergedGenres = genres.map((g) => ({
        ...g,
        checked: movieData.genres.some((mg) => mg.id === g.id),
      }));

      setMovie({
        ...movieData,
        genres: mergedGenres,
        genres_array: movieData.genres.map((g) => g.id),
      });
    };

    loadData();
  }, [jwtToken, navigate, id]);

  const hasError = (key) => errors.indexOf(key) !== -1;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // required fields validation
    const requiredFields = [
      { field: movie.title, name: "title" },
      { field: movie.release_date, name: "release_date" },
      { field: movie.runtime, name: "runtime" },
      { field: movie.description, name: "description" },
      { field: movie.mpaa_rating, name: "mpaa_rating" },
    ];

    const errors = requiredFields
      .filter((req) => !req.field)
      .map((req) => req.name);

    if (movie.genres_array.length === 0) {
      alert("You must choose at least one genre.");
      errors.push("genres");
    }

    setErrors(errors);

    if (errors.length > 0) return;

    try {
      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      });

      const requestBody = {
        ...movie,
        release_date: new Date(movie.release_date),
        runtime: parseInt(movie.runtime, 10),
      };

      const response = await fetch(`http://localhost:8080/admin/movies/${id}`, {
        method: "PATCH",
        headers,
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.error) {
        console.error(data.error);
      } else {
        navigate("/admin/catalogue");
      }
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const confirmDelete = async () => {
    try {
      const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      });
      const requestOptions = {
        method: "DELETE",
        headers,
      };

      const response = await fetch(
        `http://localhost:8080/admin/movies/${id}`,
        requestOptions
      );

      const data = await response.json();

      if (data.error) {
        console.error(data.error);
      } else {
        navigate("/admin/catalogue");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = (event, index) => {
    console.log("handle check called", event.target.value, index);

    let temp = movie.genres;

    temp[index].checked = !temp[index].checked;

    let tempIDs = movie.genres_array;
    if (!event.target.checked) {
      tempIDs.splice(tempIDs.indexOf(event.target.value));
    } else {
      tempIDs.push(parseInt(event.target.value, 10));
    }

    setMovie({
      ...movie,
      genres_array: tempIDs,
    });
  };

  if (error !== null) {
    return <div>Error : {error.message}</div>;
  } else {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Edit Movie</h2>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={movie.id} id="id"></input>
          <Input
            title={"Title"}
            type={"text"}
            name={"title"}
            value={movie.title}
            onChange={handleChange}
            errorDiv={hasError("title") ? "mt-2 text-sm text-red-600" : ""}
            errorMsg={hasError("title") ? "Please enter a title." : ""}
          />

          <Input
            title={"Release Date"}
            type={"date"}
            name={"release_date"}
            value={movie.release_date}
            onChange={handleChange}
            errorDiv={
              hasError("release_date") ? "mt-2 text-sm text-red-600" : ""
            }
            errorMsg={
              hasError("release_date") ? "Please enter a release date." : ""
            }
          />

          <Input
            title={"Runtime"}
            type={"text"}
            name={"runtime"}
            value={movie.runtime}
            onChange={handleChange}
            errorDiv={hasError("runtime") ? "mt-2 text-sm text-red-600" : ""}
            errorMsg={hasError("runtime") ? "Please enter a runtime." : ""}
          />

          <Select
            title={"MPAA Rating"}
            name={"mpaa_rating"}
            options={mpaaOptions}
            value={movie.mpaa_rating}
            onChange={handleChange}
            placeHolder={"Choose"}
            errorMsg={
              hasError("mpaa_rating") ? "Please enter an MPPA rating." : ""
            }
            errorDiv={
              hasError("mpaa_rating") ? "mt-2 text-sm text-red-600" : ""
            }
          />

          <TextArea
            title={"Description"}
            name={"description"}
            value={movie.description}
            rows={"3"}
            onChange={handleChange}
            errorDiv={
              hasError("description") ? "mt-2 text-sm text-red-600" : ""
            }
            errorMsg={
              hasError("description") ? "Please enter a description." : ""
            }
          />

          <h3>Genres</h3>

          {movie.genres && movie.genres.length > 1 && (
            <>
              {Array.from(movie.genres).map((genre, index) => {
                return (
                  <CheckBox
                    title={genre.genre}
                    name={"genre"}
                    key={index}
                    id={"genre-" + index}
                    onChange={(e) => handleCheck(e, index)}
                    value={genre.id}
                    checked={movie.genres[index].checked}
                  />
                );
              })}
            </>
          )}

          <hr />

          <button
            type="submit"
            className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save
          </button>

          <a
            href="#!"
            className="text-white mt-2 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            onClick={confirmDelete}
          >
            Delete{" "}
          </a>
        </form>
      </div>
    );
  }
}
