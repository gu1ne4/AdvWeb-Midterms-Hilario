import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./index.css";
import spotifyLogo from "./assets/spotify-logo.webp";

function App() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [rating, setRating] = useState("");
  const [label, setLabel] = useState("");
  const [role, setRole] = useState("");

  const [titleError, setTitleError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [artistError, setArtistError] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [labelError, setLabelError] = useState("");
  const [roleError, setRoleError] = useState("");

  const [tracks, setTracks] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [page, setPage] = useState(1);

  const [genreFilter, setGenreFilter] = useState("All");
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [activeTrack, setActiveTrack] = useState(null);

  useEffect(() => {
    setActiveTrack(selectedTrack);
  }, [selectedTrack]);

  const tracksPerPage = 3;

  const handleSubmit = (e) => {
    e.preventDefault();

    setTitleError("");
    setGenreError("");
    setArtistError("");
    setRatingError("");
    setLabelError("");
    setRoleError("");

    let valid = true;

 
    if (title === "") {
      setTitleError("Track title is required.");
      valid = false;
    } else if (title.length < 3) {
      setTitleError("Track title must be at least 3 characters.");
      valid = false;
    }

    
    if (genre === "") {
      setGenreError("Genre is required.");
      valid = false;
    }


    if (artist === "") {
      setArtistError("Artist name is required.");
      valid = false;
    }


    if (rating === "") {
      setRatingError("Rating is required.");
      valid = false;
    } else if (rating < 1 || rating > 100) {
      setRatingError("Rating must be between 1 and 100.");
      valid = false;
    }


    if (label === "") {
      setLabelError("Record label is required.");
      valid = false;
    }


    if (role === "") {
      setRoleError("Please select a user role.");
      valid = false;
    }

    if (valid) {
      alert("Track registered successfully!");


      const newTrack = {
        id: tracks.length + 1,
        title: title,
        genre: genre,
        artist: artist,
        rating: rating,
        label: label,
        role: role,
      };

      setTracks([...tracks, newTrack]);
      setShowTable(true);
      setPage(1);
      setTitle("");
      setGenre("");
      setArtist("");
      setRating("");
      setLabel("");
      setRole("");
    }
  };


  const columns = [
    {
      header: "Track Title",
      accessorKey: "title",
    },
    {
      header: "Genre",
      accessorKey: "genre",
    },
    {
      header: "Artist",
      accessorKey: "artist",
    },
    {
      header: "Rating",
      accessorKey: "rating",
    },
    {
      header: "Record Label",
      accessorKey: "label",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
  ];

  
  const filteredTracks = genreFilter === "All"
    ? tracks
    : tracks.filter((track) => track.genre === genreFilter);

  const start = (page - 1) * tracksPerPage;
  const end = start + tracksPerPage;

  const currentTracks = filteredTracks.slice(start, end);

  const totalPages = Math.ceil(
    filteredTracks.length / tracksPerPage
  );


  const table = useReactTable({
    data: currentTracks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>

      <nav className="bg-black text-white px-8 py-4 flex items-center shadow-lg">
        <div className="flex items-center gap-3">
          <img
            src={spotifyLogo}
            alt="Spotify Logo"
            className="w-10 h-10 object-contain"
          />

          <span className="text-2xl font-bold">
            Spotify
          </span>
        </div>
      </nav>


      {!showTable && (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black text-white flex items-center justify-center px-4 py-10">

          <form
            onSubmit={handleSubmit}
            className="bg-zinc-800 w-full max-w-lg rounded-2xl p-8 shadow-xl"
          >
            <h1 className="text-3xl font-bold text-green-400 text-center mb-8">
              Register a Track
            </h1>


            <div className="mb-5">
              <label className="block mb-2">
                Track Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter track title"
                className="w-full bg-zinc-700 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              />

              {titleError && (
                <p className="text-red-400 text-sm mt-1">
                  {titleError}
                </p>
              )}
            </div>

          
            <div className="mb-5">
              <label className="block mb-2">
                Genre
              </label>

              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-zinc-700 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select a genre</option>
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Indie">Indie</option>
                <option value="Jazz">Jazz</option>
              </select>

              {genreError && (
                <p className="text-red-400 text-sm mt-1">
                  {genreError}
                </p>
              )}
            </div>

     
            <div className="mb-5">
              <label className="block mb-2">
                Artist Name
              </label>

              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Enter artist name"
                className="w-full bg-zinc-700 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              />

              {artistError && (
                <p className="text-red-400 text-sm mt-1">
                  {artistError}
                </p>
              )}
            </div>

            
            <div className="mb-5">
              <label className="block mb-2">
                Rating (1–100)
              </label>

              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Enter rating"
                className="w-full bg-zinc-700 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              />

              {ratingError && (
                <p className="text-red-400 text-sm mt-1">
                  {ratingError}
                </p>
              )}
            </div>

            
            <div className="mb-5">
              <label className="block mb-2">
                Record Label Name
              </label>

              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Enter record label"
                className="w-full bg-zinc-700 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
              />

              {labelError && (
                <p className="text-red-400 text-sm mt-1">
                  {labelError}
                </p>
              )}
            </div>

            
            <div className="mb-6">
              <label className="block mb-2">
                User Role
              </label>

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="Creator"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Creator
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="Listener"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  Listener
                </label>
              </div>

              {roleError && (
                <p className="text-red-400 text-sm mt-1">
                  {roleError}
                </p>
              )}
            </div>

         
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-full"
            >
              Register Track
            </button>
          </form>
        </div>
      )}


      {showTable && (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-black text-white px-8 py-10">

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-green-400">
              Track Registry
            </h1>

            <button
              onClick={() => setShowTable(false)}
              className="bg-green-500 hover:bg-green-600 text-black font-bold px-5 py-2 rounded-full"
            >
              Add Track
            </button>
          </div>

          <div className="mb-4">
            <label className="mr-3">Filter by Genre:</label>
            <select
              value={genreFilter}
              onChange={(e) => {
                setGenreFilter(e.target.value);
                setPage(1);
              }}
              className="bg-zinc-700 p-2 rounded-lg"
            >
              <option value="All">All Genres</option>
              <option value="Pop">Pop</option>
              <option value="Rock">Rock</option>
              <option value="Indie">Indie</option>
              <option value="Jazz">Jazz</option>
            </select>
          </div>


          <div className="overflow-x-auto bg-zinc-800 rounded-xl">

            <table className="w-full">
              <thead className="bg-zinc-700">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>

                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-left p-4"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}

                  </tr>
                ))}
              </thead>

              <tbody>
                {currentTracks.map((track) => (
                  <tr
                    key={track.id}
                    onClick={() => setSelectedTrack(track)}
                    className={`border-t border-zinc-700 hover:bg-zinc-700 cursor-pointer ${
                      activeTrack?.id === track.id ? "bg-zinc-700" : ""
                    }`}
                  >
                    <td className="p-4">
                      {track.title}
                    </td>

                    <td className="p-4">
                      {track.genre}
                    </td>

                    <td className="p-4">
                      {track.artist}
                    </td>

                    <td className="p-4">
                      {track.rating}
                    </td>

                    <td className="p-4">
                      {track.label}
                    </td>

                    <td className="p-4">
                      {track.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

          {activeTrack && (
            <div className="bg-zinc-800 rounded-xl p-6 mt-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">
                {activeTrack.title}
              </h2>
              <p><strong>Title:</strong> {activeTrack.title}</p>
              <p><strong>Genre:</strong> {activeTrack.genre}</p>
              <p><strong>Artist:</strong> {activeTrack.artist}</p>
              <p><strong>Rating:</strong> {activeTrack.rating}</p>
              <p><strong>Record Label:</strong> {activeTrack.label}</p>
              <p className="mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    activeTrack.role === "Creator"
                      ? "bg-green-500 text-black"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {activeTrack.role}
                </span>
              </p>
            </div>
          )}
   
          <div className="flex justify-between items-center mt-6">

            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="bg-zinc-700 px-5 py-2 rounded-lg disabled:opacity-40"
            >
              Previous
            </button>

            <p>
              Page {page} of {totalPages}
            </p>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="bg-green-500 hover:bg-green-600 text-black px-5 py-2 rounded-lg font-bold disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </div>
      )}

      <footer className="bg-black text-white text-center text-sm py-3">
        Set A - Margaret Anne Hilario
      </footer>
    </>
  );
}

export default App;
