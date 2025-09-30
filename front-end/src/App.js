import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Movies from "./components/Movies";
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";
import Catalogue from "./components/Catalogue";
import AddMovie from "./components/AddMovie";
import Genres from "./components/Genres";
import GraphQL from "./components/GraphQL";
import Login from "./components/Login";
import EditMovie from "./components/EditMovie";
import Movie from "./components/Movie";
import { useEffect, useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import OneGenre from "./components/OneGenre";

function App() {
  let navigate = useNavigate();
  const [jwtToken, setJwtToken] = useState(null);

  function onLogin({ email, password }) {
    // build request payload
    let payload = {
      email,
      password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    };

    fetch(`http://localhost:8080/auth`, requestOptions)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.message);
        } else {
          setJwtToken(data.access_token);
          navigate("/");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost:8080/refresh", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not logged in");

        const data = await res.json();
        if (data.access_token) {
          setJwtToken(data.access_token);
        }
      } catch (err) {
        setJwtToken(null);
        console.log("User not logged in", err);
      }
    };

    checkLogin();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header jwtToken={jwtToken} setJwtToken={setJwtToken} />

      {/* Main Layout */}
      <div className="flex flex-1">
        <Sidebar jwtToken={jwtToken} />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={onLogin} />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<Movie />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/genres/:id" element={<OneGenre />} />
            <Route path="/graphql" element={<GraphQL />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute isAuthenticated={jwtToken} />}>
              <Route
                path="/admin/add-movie"
                element={<AddMovie jwtToken={jwtToken} />}
              />
              <Route
                path="/admin/movies/:id"
                element={<EditMovie jwtToken={jwtToken} />}
              />
              <Route
                path="/admin/catalogue"
                element={<Catalogue jwtToken={jwtToken} />}
              />
            </Route>
            {/* END Private Routes */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          {/* END  Main Content */}
        </main>
      </div>
      {/* END Main Layout */}
    </div>
  );
}

export default App;
