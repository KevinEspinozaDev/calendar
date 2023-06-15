import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice } from './';

export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer
    },

    // Permite setear como variables las fechas de forma directa
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})