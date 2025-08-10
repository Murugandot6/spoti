import React from 'react'
import { LyricLoading, Error } from '../LoadersAndError'

const SongLyrics = ({ lyrics, lyricsData, isFetching, showBlur, error, nowPlaying = false }) => {

    if(isFetching) return <LyricLoading num={8} />

    if(error) return <Error title="Could not load lyrics." />
        
    return (
        <div className={`mb-8 px-3 ${showBlur ? 'border border-white/5 rounded-[20px] backdrop-blur-lg p-3' : ''}`}>
            {
                !nowPlaying &&
                <h3 className="text-2xl font-bold text-white/80 mb-4">Lyrics</h3>
            }
            {
                lyrics && lyrics.length > 0 && lyrics[0] !== '' ? // Check if lyrics array is not empty and first element is not empty string
                lyrics.map( (line, i) => <p key={i} className="text-white text-base font-bold my-1">{line}</p> ) :
                <p className="text-gray500 text-base font-bold text-white">"Sorry, no lyrics found!"</p>
            }

            <p className="text-xs text-gray-500">
                { 
                    // Musixmatch copyright might not be relevant if lyrics are not from Musixmatch
                    lyricsData?.message?.body?.lyrics?.lyrics_copyright ?
                    lyricsData?.message?.body?.lyrics?.lyrics_copyright.split(' ').map(
                        (elem, i) => elem === 'www.musixmatch.com.' ? <a key={i} href="https://www.musixmatch.com" target="_blank" className="text-gray-400 font-semibold">{'musixmatch. '}</a> : elem + ' '
                    ) :
                    'Lyrics provided by Saavn (if available)' // Generic message
                }
            </p>
        </div>
    )
}

export default SongLyrics