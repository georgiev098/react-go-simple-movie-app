import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./form/Input";
import Select from "./form/Select";
import TextArea from "./form/TextArea";

export default function AddMovie({ jwtToken }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [movie, setMovie] = useState();

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
  }, [jwtToken, navigate]);

  const hasError = (key) => errors.indexOf(key) !== -1;
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setMovie({
      ...movie,
      [name]: value,
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
          onChange={handleChange}
          errorDiv={hasError("title") ? "mt-2 text-sm text-red-600" : ""}
          errorMsg={hasError("title") ? "Please enter a title." : ""}
        />

        <Input
          title={"Release Date"}
          type={"date"}
          name={"release_date"}
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
          onChange={handleChange}
          errorDiv={hasError("runtime") ? "mt-2 text-sm text-red-600" : ""}
          errorMsg={hasError("runtime") ? "Please enter a runtime." : ""}
        />

        <Select
          title={"MPAA Rating"}
          name={"mpaa_rating"}
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
          rows={"3"}
          onChange={handleChange}
          errorDiv={hasError("description") ? "mt-2 text-sm text-red-600" : ""}
          errorMsg={
            hasError("description") ? "Please enter a description." : ""
          }
        />
      </form>
    </div>
  );
}
