import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://spotify-rec-axk8.onrender.com"; // Your backend URL
const BACKGROUND_IMAGE_URL = "https://pbs.twimg.com/media/BG48ENgCEAAIDl9.jpg";

const App = () => {
    const [playlist, setPlaylist] = useState([]);
    const [userName, setUserName] = useState(null);

    const generatePlaylist = async () => {
        try {
            const response = await axios.get("https://api.spotify.com/v1/me/tracks?limit=5", {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            const tracks = response.data.items.map(item => `${item.track.name} - ${item.track.artists[0].name}`);

            const playlistResponse = await axios.post(`${API_BASE_URL}/generate-playlist`, { tracks });
            setPlaylist(playlistResponse.data.recommendations);
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
                backgroundSize: "contain", // "contain" ensures the entire image fits within the viewport
                backgroundRepeat: "no-repeat", // Prevent the image from repeating
                backgroundPosition: "center center", // Keep the image centered
                minHeight: "100vh", // Make sure it takes up the full viewport height
                color: "white",
                textAlign: "center",
                padding: "20px",
            }}
        >
            <h1>Spotify AI Playlist Generator</h1>
            {userName && <h2>Welcome, {userName}</h2>}
            <button onClick={handleLogin}>Login</button>
            <button onClick={generatePlaylist}>Generate Playlist</button>
            <div style={{ marginTop: "20px", textAlign: "left" }}>
                {playlist.map((track, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <img
                            src={track.albumArt || "https://via.placeholder.com/50"}
                            alt={`${track.name} album art`}
                            style={{ width: "50px", height: "50px", marginRight: "10px", borderRadius: "4px" }}
                        />
                        <div>
                            <div style={{ fontWeight: "bold", fontSize: "14px" }}>{track.name}</div>
                            <div style={{ fontSize: "12px", color: "gray" }}>{track.artist}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
