import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Navbar = () => {
    const {user,setUser} = useContext(UserContext)   
    const navigate = useNavigate()

    const loginUsuario = () => {
        setUser(false)
        navigate("/login")
    }

    const cerrarSesion = () => {
        setUser(true)
        navigate("/")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <NavLink to="/" className="navbar-brand">No Music No Life</NavLink>
                <NavLink to="/" className="btn btn-link text-light text-decoration-none">Home</NavLink>
                {/* condicional si hay usuario */}
                {
                    user?(
                    <>
                        <NavLink to ="/perfil" className="btn btn-link text-light text-decoration-none"> Perfil </NavLink>
                        <button onClick={() => cerrarSesion()} className="btn btn-link text-light text-decoration-none" >Log Out</button>
                    </>
                    ):(
                        <button  onClick={() => loginUsuario()} className="btn btn-link text-light text-decoration-none">Login</button>)
                };
                <NavLink to="/registro" className="btn btn-link text-light text-decoration-none">Registrate</NavLink> 
                <NavLink to="/contacto" className="btn btn-link text-light text-decoration-none">Contacto</NavLink> 
            </nav>
        </div>
    )
}

export default Navbar