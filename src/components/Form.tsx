// Redux
import { useAppDispatch } from "../redux/app/store"
import { addMovie } from "../redux/features/movies/moviesSlice"

// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form"

// Model
import { formModel } from "../models/formModel"

const Form = () => {

    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<formModel>()

    const onSubmit: SubmitHandler<formModel> = (data: any) => {
        dispatch(addMovie({ ...data, vote_average: Number(data?.vote_average) }))
        reset()
    }

    return (
        <div className="form-container card py-5 mt-2">
            <h2 className="text-white text-center fs-1 fw-bold my-3">Add a new movie to your list!</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="row d-flex justify-content-center">
                <div className="col-12 col-md-6">
                    <input className="card mb-2 p-2 col-12" placeholder="Movie Name" {...register("title", { required: true })} spellCheck="false" autoComplete="off" />
                    {errors.title && <span className="text-success bg-dark fw-bold">Movie name is required</span>}

                    <input className="card mb-2 p-2 col-12" placeholder="Image URL" {...register("poster_path", { required: true })} spellCheck="false" autoComplete="off" />
                    {errors.poster_path && <span className="text-success bg-dark fw-bold">Image URL is required</span>}

                    <input className="card mb-2 p-2 col-12" type="text" placeholder="IMDb Rating" {...register("vote_average", { required: true })} spellCheck="false" autoComplete="off" />
                    {errors.vote_average && <span className="text-success bg-dark fw-bold">IMDB Rating is required</span>}

                    <input className="card mb-2 p-2 col-12" placeholder="Year" {...register("release_date", { required: true })} spellCheck="false" autoComplete="off" />
                    {errors.release_date && <span className="text-success bg-dark fw-bold">Year is required</span>}

                    <input className='btn btn-secondary w-100 fw-bold' type="submit" value="Add" />
                </div>
            </form>
        </div>
    )
}

export default Form