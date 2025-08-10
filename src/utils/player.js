import { playPause, prevSong, nextSong, setActiveSong, setAlbum, stop, shuffleOn, shuffleOff, setRepeat, addToUpNext } from "../redux/features/playerSlice"
import { store } from '../redux/store';
import { displayMessage } from "./prompt"

export function play() {
    store.dispatch(playPause(true));
    displayMessage('Playing song...');
}

export function pause () {
    store.dispatch(playPause(false));
    displayMessage('Song paused.');
}

export function next (i) {
    store.dispatch(stop());
    store.dispatch(nextSong(i));
    displayMessage('Playing next song.');
}

export function prev (i) {
    store.dispatch(stop());
    store.dispatch(prevSong(i));
    displayMessage('Playing previous song.');
}

export function onShuffle (isSongPlaying) {
    store.dispatch(shuffleOn(isSongPlaying));
    displayMessage('Shuffle on.');
}

export function offShuffle () {
    store.dispatch(shuffleOff())
    displayMessage('Shuffle off.');
}

export function onRepeat () {
    store.dispatch(setRepeat(true))
    displayMessage('Repeat on.');
}

export function offRepeat () {
    store.dispatch(setRepeat(false))
    displayMessage('Repeat off.');
}

export const playSongs = ({ tracks, song, i, album}) => {
    if (tracks.length < 1) {
        pause();
        displayMessage('No tracks to play.');
        return;
    }
    store.dispatch(setActiveSong({ tracks, song, i }));
    if (album) store.dispatch(setAlbum(album));
    play();
}

export const playNext = ({ tracks, album }) => {
    store.dispatch(addToUpNext(tracks));
    if (album) store.dispatch(setAlbum(album));
    displayMessage('Added to Queue!');
}