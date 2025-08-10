import { useState, useEffect, useMemo } from 'react'

import { useSelector } from "react-redux";
import { Radios, RecentArtists, RecentAlbums, Suggestion, Songs } from "../components/List"; // Keep Songs for top tracks
import { getData } from "../utils/getData";
import { useSearchSongsQuery } from '../redux/services/saavnApi'; // Use Saavn API

const Discover = () => {
    const library = useSelector(state => state.library);

    // Use Saavn search for general "top songs" or "trending"
    const { data: topSongsData, isFetching: isFetchingTopSongs, error: errorFetchingTopSongs } = useSearchSongsQuery('tamil latest songs');
    const topTracks = useMemo(() => topSongsData ? getData({ data: topSongsData.data.results.slice(0, 6), type: 'tracks' }) : [], [topSongsData, library]);
    
    // Fetch data for English most played songs
    const { data: englishSongsData, isFetching: isFetchingEnglishSongs, error: errorFetchingEnglishSongs } = useSearchSongsQuery('english most played songs');
    const englishMostPlayedSongs = useMemo(() => englishSongsData ? getData({ data: englishSongsData.data.results.slice(0, 15), type: 'tracks' }) : [], [englishSongsData, library]);

    const englishMostPlayedPlaceholder = useMemo(() => ({ id: 'english_mix', name: 'English Most Played', image: [{ link: 'https://i.pinimg.com/originals/ed/54/d2/ed54d2fa700d36d4f2671e1be84651df.jpg' }] }), []); // Placeholder for radio image

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
                Tamil Latest Songs
            </Songs>

            <Suggestion
                isFetching={isFetchingEnglishSongs}
                error={errorFetchingEnglishSongs}
                radioTracks={englishMostPlayedSongs}
                radio={englishMostPlayedPlaceholder} // Use placeholder radio data
                songs={englishMostPlayedSongs} // Use English songs for suggestions column
                suggestionTitle="English Most Played"
            />
        </div>
    )
};

export default Discover;