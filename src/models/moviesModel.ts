import { MovieModel } from "./movieModel"

export interface MoviesModel {
    loading: boolean
    movies: MovieModel[]
    error: string | null
}