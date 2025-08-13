import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex flex-1">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<Movie />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/edit-movie/:id" element={<EditMovie />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/graphql" element={<GraphQL />} />
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
