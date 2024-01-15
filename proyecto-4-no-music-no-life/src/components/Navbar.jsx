import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Navbar = () => {

    console.log(useContext(UserContext))
    const {user,setUser} = useContext(UserContext)   

    const navigate = useNavigate()

    //funcion login
    const loginUsuario = () => {
        setUser(true)
        navigate("/login")
    }

    // funcion cerrar sesion
    const cerrarSesion = () => {
        setUser(false)
        navigate("/")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <a className="navbar-brand" href="/">No Music No Life</a>
                <NavLink to="/" className="btn btn-link text-light text-decoration-none">Home</NavLink>

                {/* condicional si hay usuario */}
                {
                    user?(
                    <>
                        <NavLink to ="/perfil" className="btn btn-link text-light text-decoration-none"> Perfil </NavLink>
                        <button className="btn btn-link text-light text-decoration-none" onClick={() => cerrarSesion()}>Log Out</button>
                    </>
                    ):(
                        <button className="btn btn-link text-light text-decoration-none" onClick={() => loginUsuario()}>Login</button>)
                };

                <NavLink to="/contacto" className="btn btn-link text-light text-decoration-none">Contacto</NavLink> 
            </nav>
        </div>
    )
}

export default Navbar