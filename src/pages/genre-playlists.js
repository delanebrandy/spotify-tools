import React, { useState, useEffect } from "react";
import { spotifyApi } from '../spotify';
import Playlist from "./playlist";

export const GlobalStateContext = React.createContext(null);

export default function GenrePlaylists() {
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [userName, setUserName] = useState([]);

    async function getIterator() {
        const data = await spotifyApi.getUserPlaylists({ limit: 1, offset: 0 });
        return Math.ceil(data.total / 50);
    }

    useEffect(() => {
        spotifyApi.getMe()
            .then(data => {
                setUserName([data.display_name, data.id]);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        getIterator().then((iterations) => {
            const promises = [];
            for (let i = 0; i < iterations; i++) {
                promises.push(spotifyApi.getUserPlaylists({ limit: 50, offset: i * 50 }));
            }

            Promise.all(promises)
                .then((data) => {
                    const playlists = data.flatMap((d) => d.items).filter((playlist) => playlist.owner.id === userName[1]);
                    setUserPlaylists(playlists);
                })
                .catch((error) => console.log(error));
        });
    }, [userName]);

    function setPlaylist(playListId) {

        spotifyApi.getPlaylist(playListId)
            .then(data => {
                setSelectedPlaylist(data);

            })
            .catch(error => console.log(error));

        return <Playlist />
    }

    return (
        <GlobalStateContext.Provider value={{ selectedPlaylist, userPlaylists, userName }}>
            <div>
                <h1>My Playlists</h1>
                <ul>
                    {userPlaylists.map((playlist, index) => (
                        <li key={index}>
                            <p onClick={() => setPlaylist(playlist.id)}>{playlist.name}</p>
                        </li>
                    ))}
                </ul>
                {selectedPlaylist && <Playlist />}
            </div>
        </GlobalStateContext.Provider>
    );


}
