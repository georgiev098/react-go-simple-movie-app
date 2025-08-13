import { Link } from "react-router-dom";

export default function Sidebar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Genres", path: "/genres" },
    { name: "Add Movie", path: "/add-movie" },
    { name: "Manage Catalogue", path: "/manage-catalogue" },
    { name: "GraphQL", path: "/graphql" },
  ];

  return (
    <aside className="w-56 bg-white border-r shadow-sm">
      <nav className="flex flex-col p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="text-left px-4 py-2 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition-colors font-medium"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
