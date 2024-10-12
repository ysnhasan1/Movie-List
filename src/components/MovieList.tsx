// React
import { useState, useEffect } from "react"

// Redux
import { useAppDispatch, useAppSelector } from "../redux/app/store"
import { getMovies } from "../redux/features/movies/moviesSlice"

// Components
import Movie from "./Movie"

// Functions
import { filterMovies } from "../helpers/filter"
import { sortMovies } from "../helpers/sort"

const MovieList = () => {

  const [input, setInput] = useState<string>("")
  const [sortedByName, setSortedByName] = useState<string>("default")

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMovies())
  }, [])

  let movies = useAppSelector((state) => state.moviesReducer.movies)
  movies = filterMovies({ movies, input })
  movies = sortMovies({ movies, sortedByName })

  return (
    <div className="row movie-list">
      <div className="d-flex justify-content-center justify-content-sm-between align-items-center">
        <h2 className="d-none d-sm-block text-secondary fw-bold my-3">Movie List</h2>
        <div className="d-md-flex align-items-center gap-2">
          <div className="dropdown mb-1 mb-md-0 mt-2 mt-md-0">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="sortedByNameButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sorted By Movie Name
            </button>
            <div className="dropdown-menu" aria-labelledby="sortedByNameButton">
              <a onClick={() => setSortedByName("default")} className="dropdown-item btn fw-bold" style={sortedByName === "default" ? { color: "red" } : undefined}>Default</a>
              <a onClick={() => setSortedByName("a-z")} className="dropdown-item btn fw-bold" style={sortedByName === "a-z" ? { color: "red" } : undefined}>A-Z</a>
              <a onClick={() => setSortedByName("z-a")} className="dropdown-item btn fw-bold" style={sortedByName === "z-a" ? { color: "red" } : undefined}>Z-A</a>
            </div>
          </div>
          <input onChange={(e) => setInput(e.target.value)} className="p-2 mb-2 mb-md-0 card text-secondary fw-bold" placeholder="Search movie" spellCheck="false" />
        </div>
      </div>

      {movies?.map((movie, index) => (
        <div key={index} className="col-6 col-md-4 col-lg-3 col-xl-2 mb-3">
          <Movie movie={movie} />
        </div>
      ))}
    </div>
  )
}

export default MovieList