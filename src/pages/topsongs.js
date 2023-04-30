import React, { useState, useEffect } from "react";
import { spotifyApi } from '../spotify';

export default function TopSongs() {
    const [topSongs, setTopSongs] = useState([]);

    useEffect(() => {
        spotifyApi.getMyTopTracks({ limit: 5 })
            .then(data => {
                setTopSongs(data.items);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>Top songs</h1>
            <ul>
                {topSongs.map((song, index) => (
                    <li key={index}>{song.name} - {song.artists[0].name} [{song.popularity}]</li>
                ))}
            </ul>
        </div>
    );
}