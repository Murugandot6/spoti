import { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { Songs, SongLyrics } from "../components/List";

import { useGetLyricsQuery } from "../redux/services/MusixMatchApi"; // Keep MusixMatch for now, but it might not work
import { useGetSongDetailsByIdQuery, useSearchSongsQuery } from "../redux/services/saavnApi"; // Use Saavn API
import { getSingleData } from "../utils/getData";
import { DetailsContext } from "../components/Details";


const SongDetails = () => {
    const { blacklist, favorites } = useSelector( state => state.library )

    const { data, updateData, colors, ...others } = useContext(DetailsContext)
    const [lyrics, setLyrics] = useState([])

    const { songid } = useParams()

    // Use Saavn's getSongDetailsById or search for the song by ID
    const { data: songDetails, isFetching, error } = useGetSongDetailsByIdQuery( songid );
    const song = songDetails?.data?.[0] || songDetails?.data; // Adjust based on actual Saavn response for single song

    // Musixmatch API requires ISRC, which Saavn API might not provide.
    // Lyrics functionality might be broken or removed.
    const { data: lyricsData, isFetching: isFetchingLyrics, error: errorFetchingLyrics } = useGetLyricsQuery( song?.isrc || 0, { skip: !song?.isrc } );
    
    // For related songs, use a general search or search by artist name
    const { data: relatedSongsData, isFetching: isFetchingRelated, error: errorFetchingRelated } = useSearchSongsQuery( song?.primaryArtists || 'top songs', { skip: !song?.primaryArtists } );
    const relatedSongs = relatedSongsData?.data?.results?.filter(s => s.id !== songid)?.slice(0, 6);

    useEffect(() => { 
        updateData({ isFetching: true, error: false, data: {}, colors: [] })
    }, [songid])
    
    useEffect(() => {
        if (song) {
            const refinedData = getSingleData({ type: 'tracks', data: song, favorites, blacklist })
            updateData({ ...others, colors, isFetching, error, data: {...refinedData, song: refinedData, tracks: [refinedData]} })
        }
    }, [song, favorites, blacklist, isFetching, error])

    useEffect(() => {
        const text = `Isai Song - ${isFetching ? 'Loading...' : error ? 'Uh oh! Song data could not be loaded :(' : song?.name}` // Use song.name
        document.getElementById('site_title').innerText = text
    }, [song, isFetching, error]);

    useEffect(() => {
        // Check if lyricsData exists and has lyrics_body
        if (lyricsData?.message?.body?.lyrics?.lyrics_body) {
            setLyrics(
                lyricsData.message.body.lyrics.lyrics_body
                .replace(/(\*{7}[a-z|\s]+\*{7}|\(\d+\))/ig, '')
                .split('\n')
            )
        } else {
            setLyrics([]); // Clear lyrics if not found
        }
    }, [lyricsData])

    return (
        <div className="min-h-[100vh] p-2 md:p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <section>
                <SongLyrics showBlur={true} isFetching={isFetchingLyrics} error={errorFetchingLyrics} lyrics={lyrics} lyricsData={lyricsData} />
            </section>
            <section>
                <div className="md:sticky md:top-[85px]">
                    <Songs
                        full={true}
                        bg={colors?.length > 0 && colors[1]}
                        bg2={colors?.length > 0 && colors[0]}
                        blacklist={blacklist}
                        favorites={favorites}
                        isFetching={isFetchingRelated}
                        error={errorFetchingRelated}
                        songData={data}
                        songs={relatedSongs}
                    >
                        Similar Songs
                    </Songs>
                </div>
            </section>
        </div>
    )
};

export default SongDetails;