import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://spotify-rec-axk8.onrender.com"; // Update this with your backend URL

const App = () => {
    const [playlist, setPlaylist] = useState([]);
    
    const generatePlaylist = async () => {
        const tracks = ["Imagine - John Lennon", "Bohemian Rhapsody - Queen"];
        try {
            const response = await axios.post(`${API_BASE_URL}/generate-playlist`, { tracks });
            setPlaylist(response.data.recommendations);
        } catch (error) {
            console.error("Error generating playlist:", error);
        }
    };

    return (
        <div>
            <h1>Spotify AI Playlist Generator</h1>
            <button onClick={generatePlaylist}>Generate Playlist</button>
            <ul>
                {playlist.map((song, index) => <li key={index}>{song}</li>)}
            </ul>
        </div>
    );
};

export default App;
