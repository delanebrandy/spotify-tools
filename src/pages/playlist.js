import React, { useContext, useEffect } from "react";
import { spotifyApi } from '../spotify';
import { GlobalStateContext } from './genre-playlists';

export default function Playlist() {
    const { selectedPlaylist } = useContext(GlobalStateContext);


    return (
        <div>
            <h1>{selectedPlaylist.name}</h1>
        </div>
    );
}
