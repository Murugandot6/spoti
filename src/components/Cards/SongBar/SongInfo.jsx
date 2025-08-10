import { Link } from "react-router-dom"

import { BsDot } from "react-icons/bs"
import { MdExplicit } from "react-icons/md"

const SongInfo = ({ song, artistId }) => {
  return (
    <div className="flex-1 flex flex-col justify-center mx-3">
      <Link to={`/songs/${song.id}`}>
        <p className="text-xs md:text-sm font-semibold text-white truncate max-w-[200px]">{song?.name}</p>
      </Link>
        <div className="flex flex-row flex-wrap gap-1 items-center text-gray-300">
          {
            artistId ?
            // Saavn API's primaryArtists is a string, not an array of contributors.
            // We'll just display the primary artist name.
            <Link to={`/artists/${song.artist.id}`}>
              <p className="text-[0.75em] font-semibold text-gray-200 flex flex-row items-center justify-start truncate">
                {song?.primaryArtists}
              </p>
            </Link> :
            <Link to={`/artists/${song.artist.id}`}>
              <p className="text-[0.75em] font-semibold text-gray-300 max-w-[200px] flex flex-row items-center justify-start gap-1 truncate">
                {song?.primaryArtists}
              </p>
            </Link>
          }
          {song?.explicitContent === 1 && <MdExplicit size={20} />}
        </div>
      {
        song?.album?.name && 
        <p className="text-xs text-gray-500 font-semibold truncate max-w-[200px]">
          {song.album.name}
        </p>
      }
    </div>
  )
}

export default SongInfo