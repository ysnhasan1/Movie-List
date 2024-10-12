import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// Axios
import axios from 'axios'

// Random ID
import { v4 as uuidv4 } from 'uuid'

// Model
import { MoviesModel } from '../../../models/moviesModel'
import { MovieModel } from '../../../models/movieModel'

// API
const api_key = process.env.REACT_APP_API_KEY
const base_url = "https://api.themoviedb.org/3"

export const getMovies = createAsyncThunk<MovieModel[]>("getMovies", async () => {
    const response = await axios.get(`${base_url}/movie/top_rated?api_key=${api_key}&language=tr-TR&page=1`)
    return response.data.results
})

const initialState: MoviesModel = {
    loading: false,
    movies: [],
    error: null
}

export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovie: (state, action: PayloadAction<MovieModel>) => {
            state.movies = [...state.movies, { ...action.payload, id: uuidv4() }]
        },
        deleteMovie: (state, action: PayloadAction<string>) => {
            state.movies = state.movies.filter((movie) => movie.id !== action.payload)
        },
        updateMovie: (state, action: PayloadAction<MovieModel>) => {
            const index: number = state.movies.findIndex((movie) => movie.id == action.payload.id)
            state.movies[index] = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMovies.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getMovies.fulfilled, (state, action) => {
            state.loading = false
            state.movies = action.payload
        })
        builder.addCase(getMovies.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something went wrong"
        })
    }
})

export default moviesSlice.reducer
export const { addMovie, deleteMovie, updateMovie } = moviesSlice.actions