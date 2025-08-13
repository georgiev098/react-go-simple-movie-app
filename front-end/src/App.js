import Home from "./components/Home";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white shadow-sm p-4">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Go Watch a Movie!
        </h1>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r shadow-sm">
          <nav className="flex flex-col p-4 space-y-2">
            {[
              "Home",
              "Movies",
              "Genres",
              "Add Movie",
              "Manage Catalogue",
              "GraphQL",
            ].map((item) => (
              <button
                key={item}
                className="text-left px-4 py-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition-colors font-medium"
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <Home />
      </div>
    </div>
  );
}

export default App;
