import { useEffect } from 'react';
import { spotifyApi, spotifyAuth } from './spotify';

function Spot() {
    useEffect(() => {
        spotifyAuth()
            .then(() => {
                // You can now use the spotifyApi object to make API calls
                spotifyApi.getMyTopTracks().then((data) => {
                    console.log(data);
                    // Do nothing

                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return <div>My Spot Component</div>;
}

export default Spot;
