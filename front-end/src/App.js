import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";
import Movies from "./components/Movies";
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";

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
            <Route path="/movies" element={<Movies />} />
            {/* <Route path="/genres" element={<Genres />} /> */}
            {/* <Route path="/add-movie" element={<AddMovie />} /> */}
            {/* <Route path="/manage-catalogue" element={<ManageCatalogue />} /> */}
            {/* <Route path="/graphql" element={<GraphQLPage />} /> */}
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
