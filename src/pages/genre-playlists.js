import React, { useState, useEffect } from "react";
import { spotifyApi } from '../spotify';

export default function GenrePlaylists() {
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [userName, setUserName] = useState([]);

    useEffect(() => {
        spotifyApi.getMe()
            .then(data => {
                setUserName([data.display_name, data.id]);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        const promises = [];

        for (let i = 0; i < 5; i++) {
            promises.push(spotifyApi.getUserPlaylists({ limit: 50, offset: i * 50 }));
        }

        Promise.all(promises)
            .then(data => {
                const playlists = data.flatMap(d => d.items).filter(playlist => playlist.owner.id === userName[1]);
                setUserPlaylists(playlists);
            })
            .catch(error => console.log(error));
    }, [userName]);

    console.log(userPlaylists);

    return (
        <div>
            <h1>My Playlists</h1>
            <ul>
                {userPlaylists.map((playlist, index) => (
                    <li key={index}><a target="_blank" rel="noreferrer" href={playlist.external_urls.spotify} >{playlist.name}</a>

                    </li>
                ))}
            </ul>
        </div>
    );
}
