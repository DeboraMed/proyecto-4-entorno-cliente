import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Navbar = () => {

    console.log(useContext(UserContext))
    const {user,setUser} = useContext(UserContext)   

    const navigate = useNavigate()

    // funcion cerrar sesion
    const cerrarSesion = () => {
        setUser(false)
        navigate("/")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <a class="navbar-brand" href="#">No Music No Life</a>
            <NavLink to="/" className="btn btn-outline-primary">Home</NavLink>

            {/* condicional si hay usuario */}
            {
                user?(
                <>
                    <NavLink to ="/perfil" className="btn btn-outline-primary"> Perfil </NavLink>
                    <button onClick={() => cerrarSesion()}>Log Out</button>
                </>
                ):(
                    <button onClick={() => setUser(true)}>Login</button>)
            };

            <NavLink to="/contacto" className="btn btn-outline-primary">Contacto</NavLink> 
          
            </nav>
        </div>
    )
}

export default Navbar