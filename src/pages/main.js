import React, { useState, useEffect } from 'react';
import GenrePlaylists from "./genre-playlists";
import { spotifyApi, spotifyAuth } from '../spotify';

function Main() {
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        setAccessToken(accessToken);
    }, []);

    if (!accessToken) {
        return(
            <div>
                <h1>ERROR</h1>
                <h2>Access token not set</h2>
                <button onClick={spotifyAuth}>Click here to authenticate</button>
            </div>
        )
    }

    spotifyApi.setAccessToken(accessToken);
    window.history.pushState("", document.title, window.location.pathname);
    // Render the rest of your application here
    return <GenrePlaylists />;

}

export default Main;
