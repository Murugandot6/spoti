import { useState, useEffect, useMemo } from 'react'

import { useSelector } from "react-redux";
import { Radios, RecentArtists, RecentAlbums, Suggestion, Songs } from "../components/List"; // Keep Songs for top tracks
import { getData } from "../utils/getData";
import { useSearchSongsQuery } from '../redux/services/saavnApi'; // Use Saavn API

const Discover = () => {
    const library = useSelector(state => state.library);

    // Use Saavn search for general "top songs" or "trending"
    const { data: topSongsData, isFetching: isFetchingTopSongs, error: errorFetchingTopSongs } = useSearchSongsQuery('trending songs');
    const topTracks = useMemo(() => topSongsData ? getData({ data: topSongsData.data.results.slice(0, 6), type: 'tracks' }) : [], [topSongsData, library]);
    
    // Saavn API doesn't have direct "top artists", "recent albums", "top radios" endpoints like Deezer.
    // We will simplify these sections or remove them for now.
    // For "Popular Artists", we can search for popular artists and display their top songs.
    // For "Recent Albums", we can search for "new releases" and display as songs.
    // For "Popular Radios", we can search for "radio hits" or similar.

    // For simplicity, let's just show a general list of popular songs and a "suggestion" based on a generic search.
    // The "Suggestion" component currently uses radio data, which is not directly available.
    // We'll adapt it to use a generic "top mix" of songs.

    const { data: radioSongsData, isFetching: fetchingRadioTracks, error: errorFetchingRadioTracks } = useSearchSongsQuery('top mix');
    const topRadioSongs = useMemo(() => radioSongsData ? getData({ data: radioSongsData.data.results.slice(0, 15), type: 'tracks' }) : [], [radioSongsData, library]);
    const topRadioPlaceholder = useMemo(() => ({ id: 'top_mix', name: 'Top Mix', image: [{ link: 'https://i.pinimg.com/originals/ed/54/d2/ed54d2fa700d36d4f2671e1be84651df.jpg' }] }), []); // Placeholder for radio image

    useEffect(() => {   
        document.getElementById('site_title').innerText = 'Isai - Web Player: Rhythm for everyone.'
    }, [])

    return (
        <div className="flex flex-col p-4 gap-10 lg:gap-6">
            {/* Removed RecentAlbums, RecentArtists, Radios components as direct data sources are unavailable */}
            
            <Songs
                isFetching={isFetchingTopSongs}
                error={errorFetchingTopSongs}
                songs={topTracks}
            >
                Popular Songs
            </Songs>

            <Suggestion
                isFetching={fetchingRadioTracks}
                error={errorFetchingRadioTracks}
                radioTracks={topRadioSongs}
                radio={topRadioPlaceholder} // Use placeholder radio data
                songs={topTracks} // Re-use topTracks for suggestions
            />
        </div>
    )
};

export default Discover;