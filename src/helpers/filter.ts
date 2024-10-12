// Model
import { MovieModel } from "../models/movieModel"

export const filterMovies = ({ movies, input }: { movies: MovieModel[], input: string }) => {
    movies = movies.filter((movie) => movie.title.toLowerCase().includes(input.toLowerCase()))
    return movies
}