export default function Home() {
  return (
    <main className="flex-1 p-8 flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Find a movie to watch tonight!
      </h2>
      <img
        src="/tickets.png"
        alt="Movie Tickets"
        className="w-40 h-auto  rounded-lg transform hover:scale-105 transition-transform duration-300"
      />
    </main>
  );
}
