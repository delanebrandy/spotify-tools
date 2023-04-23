import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

const spotifyAuth = () => {
    const CLIENT_ID = '1c993a1df206421787be649ce5d81837';
    const REDIRECT_URI = 'http://localhost:3000/genre/';
    const SCOPES = ['user-read-private', 'user-read-email'];

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    if (params.access_token) {
        spotifyApi.setAccessToken(params.access_token);
        return Promise.resolve();
    } else if (params.error) {
        return Promise.reject(params.error);
    } else {
        const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join('%20')}`;
        window.location = authorizeUrl;
    }
};

export { spotifyApi, spotifyAuth };
