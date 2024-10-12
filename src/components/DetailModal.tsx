// React Bootstrap
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

// @ts-ignore
import Style from "style-it"

const DetailModal = (props: any) => {
    return (
        <>
            {props.show &&
                <Style>
                    {`
                    .detail-container::before {
                    content: "";
                    background-image: url("https://image.tmdb.org/t/p/original/${props?.movie?.backdrop_path}");
                    background-size: cover;
                    background-repeat: no-repeat;
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    opacity: 0.6;
                    filter: blur(10px);
                    `}
                </Style>
            }

            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <div className="detail-container d-flex flex-column justify-content-center p-2">
                        <div style={{ wordBreak: "break-word" }} className="title fw-bold text-white fs-1 mb-3">{props?.movie?.title}</div>
                        <div className="fw-bold text-white fs-5 mb-1">Overview</div>
                        <div className="overview text-white fs-6">
                            {props?.movie?.overview ? props?.movie?.overview :
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dictum feugiat neque, nec vulputate magna suscipit ut. Donec convallis, metus eget pharetra tincidunt, nibh lectus mollis erat, a rutrum sapien."
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn-secondary' onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DetailModal