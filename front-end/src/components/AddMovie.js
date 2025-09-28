import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./form/Input";
import Select from "./form/Select";
import TextArea from "./form/TextArea";
import CheckBox from "./form/CheckBox";

export default function AddMovie({ jwtToken }) {
  const navigate = useNavigate();
  // const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    release_date: "",
    runtime: "",
    mpaa_rating: "",
    description: "",
    genres: [],
    genres_array: [],
  });
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

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers,
    };

    const getGenres = async () => {
      try {
        const res = await fetch(`http://localhost:8080/genres`, requestOptions);

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        const checks = [];
        data.forEach((element) => {
          checks.push({
            id: element.id,
            checked: false,
            genre: element.genre,
          });
        });

        setMovie((prevMovie) => ({
          ...prevMovie,
          genres: checks,
          genres_array: [],
        }));
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    getGenres();
  }, [jwtToken, navigate]);

  const hasError = (key) => errors.indexOf(key) !== -1;

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   let errors = [];
  //   let required = [
  //     {
  //       field: movie.title,
  //       name: "title",
  //     },
  //     {
  //       field: movie.release_date,
  //       name: "release_date",
  //     },
  //     {
  //       field: movie.runtime,
  //       name: "runtime",
  //     },
  //     {
  //       field: movie.description,
  //       name: "description",
  //     },
  //     {
  //       field: movie.mpaa_rating,
  //       name: "mpaa_rating",
  //     },
  //   ];

  //   required.forEach((req) => {
  //     if (req.field === "") {
  //       errors.push(req.name);
  //     }
  //   });

  //   if (movie.genres_array.length === 0) {
  //     alert("You must choose at least one genre.");
  //     errors.push("genres");
  //   }

  //   setErrors(errors);

  //   if (errors.length > 0) {
  //     return false;
  //   }

  //   const headers = new Headers();
  //   headers.append("Content-Type", "application/json");
  //   headers.append("Authorization", "Bearer " + jwtToken);

  //   const requestBody = movie;
  //   requestBody.release_date = new Date(movie.release_date);
  //   requestBody.runtime = parseInt(movie.runtime, 10);

  //   let requestOptions = {
  //     body: JSON.stringify(requestBody),
  //     method: "PUT",
  //     headers,
  //     credentials: "include",
  //   };

  //   fetch("http://localhost:8080/admin/movies", requestOptions).then((resp) =>
  //     resp
  //       .json()
  //       .then((data) => {
  //         if (data.error) {
  //           console.log(data.error);
  //         } else {
  //           navigate("/catalog");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //   );
  // };

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

      const response = await fetch("http://localhost:8080/admin/movies", {
        method: "PUT",
        headers,
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.error) {
        console.error(data.error);
      } else {
        navigate("/movies");
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

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Add a movie</h2>
      <form onSubmit={handleSubmit}>
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
          errorDiv={hasError("release_date") ? "mt-2 text-sm text-red-600" : ""}
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
          value={movie.mpaa_rating}
          options={mpaaOptions}
          onChange={handleChange}
          placeHolder={"Choose"}
          errorMsg={
            hasError("mpaa_rating") ? "Please enter an MPPA rating." : ""
          }
          errorDiv={hasError("mpaa_rating") ? "mt-2 text-sm text-red-600" : ""}
        />

        <TextArea
          title={"Description"}
          name={"description"}
          value={movie.description}
          rows={"3"}
          onChange={handleChange}
          errorDiv={hasError("description") ? "mt-2 text-sm text-red-600" : ""}
          errorMsg={
            hasError("description") ? "Please enter a description." : ""
          }
        />

        <hr />

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

        <button
          type="submit"
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  );
}
