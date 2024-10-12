// React
import { useEffect } from 'react'

// Redux
import { useAppDispatch } from "../redux/app/store"
import { updateMovie } from '../redux/features/movies/moviesSlice'

// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form"
import Modal from 'react-bootstrap/Modal'

// Model
import { formModel } from '../models/formModel'

const UpdateModal = (props: any) => {

    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<formModel>()

    useEffect(() => {
        if (props.show && props.movie) {
            reset(props.movie)
        }
    }, [props.show, props.movie, reset])

    const onSubmit: SubmitHandler<formModel> = (data: any) => {
        dispatch(updateMovie(data))
        props.onHide()
    }

    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Update Movie Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)} className="row d-flex justify-content-center">
                    <div className="col-12">
                        <input className="card mb-2 p-2 col-12" placeholder="Movie Name" {...register("title", { required: true })} spellCheck="false" autoComplete="off" />
                        {errors.title && <span className="text-success bg-dark fw-bold">Movie name is required</span>}

                        <input className='btn btn-secondary w-100 fw-bold' type="submit" value="Update" />
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default UpdateModal