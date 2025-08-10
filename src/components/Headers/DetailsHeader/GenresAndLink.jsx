import { useMemo } from "react"
import { Link } from "react-router-dom"

import { FaDeezer } from "react-icons/fa" // Keep Deezer icon for now, but it's a Saavn link

const GenresAndLink = ({ data, text, bg }) => {
    // Saavn API doesn't seem to provide explicit genre data in the same way as Deezer.
    // This section might be empty or simplified.
    const genres = useMemo(() => data?.genres?.data, [data]) // This will likely be empty for Saavn

    return (
        <div className='mx-4 flex flex-row justify-between items-center gap-2 flex-wrap relative'>
            {
                (data.type === 'album') && 
                <p className="flex flex-row items-center gap-1">
                {
                    // This part will likely not render for Saavn data
                    genres &&
                    genres?.map(
                        (genre, i) =>
                        <Link key={i} to={`/genres/${genre.id}`} style={{ color: text }} className="text-xs w-fit font-bold">
                            {genre.name}{i < genres.length - 1 ? ',' : ''}
                        </Link>
                    )
                }
                </p>
            }
            {/* Assuming Saavn data has a 'url' or 'perma_url' for the item */}
            <a target="_blank" href={data?.url || data?.perma_url} style={{ backgroundColor: text, color: bg }} className="font-bold px-2 py-1 rounded-sm flex flex-row gap-1 items-center text-xs opacity-60 backdrop-blur-lg">
                <span><FaDeezer size={20} /></span><span>{data.type == 'artist' ? 'View artist ' : 'Listen '} on Saavn</span>
            </a>
        </div>
    )
}

export default GenresAndLink