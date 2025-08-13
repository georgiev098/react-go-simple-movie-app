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
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  let navigate = useNavigate();
  const [jwtToken, setJwtToken] = useState(null);

  function onLogin({ email, password }) {
    if (email === "test@mail.com" && password === "test") {
      const fakeToken = "fake-jwt-token-123456";
      setJwtToken(fakeToken);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  }

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
            {/* Private Routes */}
            <Route element={<PrivateRoute isAuthenticated={jwtToken} />}>
              <Route path="/genres" element={<Genres />} />
              <Route path="/movies/:id" element={<Movie />} />
              <Route path="/add-movie" element={<AddMovie />} />
              <Route path="/edit-movie/:id" element={<EditMovie />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/graphql" element={<GraphQL />} />
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
