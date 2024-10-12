// React
import { useState } from "react"

// Redux
import { useAppDispatch } from "../redux/app/store"
import { deleteMovie } from "../redux/features/movies/moviesSlice"

// Components
import UpdateModal from "./UpdateModal"
import DetailModal from "./DetailModal"

// Model
import { MovieModel } from "../models/movieModel"

const Movie = ({ movie }: { movie: MovieModel }) => {

    const [updateModalShow, setUpdateModalShow] = useState<boolean>(false)
    const [detailModalShow, setDetailModalShow] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const handleDelete = () => {
        if (movie.id) {
            dispatch(deleteMovie(movie.id))
        }
    }

    return (
        <div className="movie rounded card p-1">
            <div className="d-flex justify-content-end mb-1 hover-to-display">
                <i onClick={() => setDetailModalShow(true)} className="btn bi bi-info-circle text-danger fs-6"></i>
            </div>

            <img
                className="rounded border border-1"
                src={movie?.poster_path && movie?.poster_path.startsWith('http')
                    ? movie?.poster_path
                    : `https://image.tmdb.org/t/p/w220_and_h330_face/${movie?.poster_path}`
                }
                alt={`${movie?.title} poster image`}
                width="100%"
                height="auto"
                style={{ aspectRatio: 3 / 4 }}
            />

            <div className="title fw-bold text-secondary">{movie?.title}</div>

            <div className="imdb-rating">
                <i className="bi bi-star-fill bs-star-icon me-1"></i>
                <span className="fw-bold text-secondary">{(movie?.vote_average === 0 || isNaN(movie?.vote_average)) ? "NR" : (movie?.vote_average?.toFixed(1))}</span>
            </div>

            <div className="release-date text-muted">{movie?.release_date.slice(0, 4)}</div>

            <div className="d-flex justify-content-center mt-1 gap-1">
                <button onClick={() => setUpdateModalShow(true)} className="btn btn-primary d-flex justify-content-center align-items-center col-6">
                    <i className="bi bi-pencil-fill text-white fs-5"></i>
                </button>
                <button onClick={handleDelete} className="btn btn-success d-flex justify-content-center align-items-center col-6">
                    <i className="bi bi-trash2-fill text-white fs-5"></i>
                </button>
            </div>

            <DetailModal show={detailModalShow} onHide={() => setDetailModalShow(false)} movie={movie} />
            <UpdateModal show={updateModalShow} onHide={() => setUpdateModalShow(false)} movie={movie} />
        </div>
    )
}

export default Movie