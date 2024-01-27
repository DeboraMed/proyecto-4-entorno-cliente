import { useRouteError } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const error = useRouteError()
    const navigate = useNavigate()

    return (
        <div className='Home mx-3'>
             <div className="d-flex align-items-center justify-content-center vh-100">
             <div className="text-center bg-secondary px-5 pt-5 pb-5 bg-opacity-75 rounded-3">

                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> No se encuentra la página.</p>
                <p className="lead">
                    La página que estas buscando no existe.
                    <p>{error.statusText} || {error.message}</p>
                  </p>
                <button className='btn btn-outline-dark active btn-lg' onClick={() => navigate("/")}>Ir al inicio</button>
                </div>
            </div>
        </div>
    )
}

export default NotFound