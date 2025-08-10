import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import libraryReducer from './features/librarySlice';
import promptReducer from './features/promptSlice';
import { saavnApi } from './services/saavnApi'; // Import the new Saavn API
import { musixMatchApi } from './services/MusixMatchApi'; // Keep MusixMatch for now, but it might not work without ISRC

export const store = configureStore({
  reducer: {
    [saavnApi.reducerPath]: saavnApi.reducer, // Use Saavn API reducer
    [musixMatchApi.reducerPath]: musixMatchApi.reducer,
    player: playerReducer,
    library: libraryReducer,
    prompt: promptReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saavnApi.middleware, musixMatchApi.middleware) // Use Saavn API middleware
});