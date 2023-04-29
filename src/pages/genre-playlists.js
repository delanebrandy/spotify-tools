import React, { useState, useEffect } from "react";
import { spotifyApi, spotifyAuth } from '../spotify';
export default function GenrePlaylists() {
    const accessToken = spotifyApi.getAccessToken();
    const topSongs = spotifyApi.getMyTopTracks( {limit: 5});
    //parse topSongs to get the song names and artists
    //display the song names and artists
    console.log(topSongs);
    return (
        <div>
            <h1>Genre Playlists</h1>
            <h2>Access token: {accessToken}</h2>
            {/*<h2>Top Songs: {topSongs}</h2>*/}
        </div>
    );
}
