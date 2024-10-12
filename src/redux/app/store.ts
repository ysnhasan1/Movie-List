import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import moviesSlice from "../features/movies/moviesSlice"

export const store = configureStore({
    reducer: {
        moviesReducer: moviesSlice
    }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector