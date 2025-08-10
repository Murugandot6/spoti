import { playSongs } from "../player"
import { addFavorites, removeFavorites, removeBlacklist } from "../library"
import { addToBlacklist } from "../prompt"

export const artistOptions = [
    {
        name: "Play songs",
        action: ({song, tracks, i}) => playSongs({song, tracks, i})
    },
    // "About artist" removed as detailed artist info is not directly available
    {
        name: "Add to favorites",
        action: ({artist}) => addFavorites('artists', artist)
    },
    {
        name: "Remove from favorites",
        action: ({artist}) => removeFavorites('artists', artist.id)
    },
    {
        name: "Don't show artist",
        action: ({artist}) => addToBlacklist({...artist, type: 'artists'})
    },
    {
        name: "Remove from blacklist",
        action: ({artist}) => removeBlacklist('artists', artist.id)
    },
]