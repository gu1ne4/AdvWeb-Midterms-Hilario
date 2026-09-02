import { useState } from "react";
import "./index.css";
import spotifyLogo from "./assets/spotify-logo.webp";

function App() {
  return (
    <>
    <div>
      <img
        src={spotifyLogo}
        alt="Spotify Logo"
        className="w-10 h-10"
      />
      <p>Spotify</p>
    </div>
    </>
  );
}

export default App;