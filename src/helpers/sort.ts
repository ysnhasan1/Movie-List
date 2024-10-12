// Model
import { MovieModel } from "../models/movieModel"

export const sortMovies = ({ movies, sortedByName }: { movies: MovieModel[], sortedByName: string }) => {
    if (sortedByName == "a-z") {
        movies = movies.slice().sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortedByName == "z-a") {
        movies = movies.slice().sort((a, b) => b.title.localeCompare(a.title))
    }
    return movies
}