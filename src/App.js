import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://spotify-rec-axk8.onrender.com"; // Your backend URL
const BACKGROUND_IMAGE_URL = "https://pbs.twimg.com/media/BG48ENgCEAAIDl9.jpg";

const App = () => {
    const [playlist, setPlaylist] = useState([]);
    const [userName, setUserName] = useState(null);

    const generatePlaylist = async () => {
        const tracks = ["Imagine - John Lennon", "Bohemian Rhapsody - Queen"];
        try {
            const response = await axios.post(`${API_BASE_URL}/generate-playlist`, { tracks });
            setPlaylist(response.data.recommendations);
        } catch (error) {
            console.error("Error generating playlist:", error);
        }
    };

    const handleLogin = () => {
        window.location.href = `${API_BASE_URL}/login`;
    };

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("spotify_access_token"); // Retrieve the token from localStorage or other storage
            if (token) {
                const response = await axios.get(`${API_BASE_URL}/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserName(response.data.display_name); // Set the user’s display name after login
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div
            style={{
                backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                color: "white",
                textAlign: "center",
                padding: "20px",
            }}
        >
            <h1>Spotify AI Playlist Generator</h1>
            {userName && <h2>Welcome, {userName}</h2>}
            <button onClick={handleLogin}>Login</button>
            <button onClick={generatePlaylist}>Generate Playlist</button>
            <ul>
                {playlist.map((song, index) => (
                    <li key={index}>{song}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;