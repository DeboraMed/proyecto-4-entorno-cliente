import Form from 'react-bootstrap/Form';
import { Container} from 'react-bootstrap';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { validaUsuario } from '../database/DBusuarios';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {user,setUser} = useContext(UserContext)

    const mensajeError= validar(email,password);

    const login = async (email, password) => {
        let credencialesvalidas = await validaUsuario(email, password)
        if (credencialesvalidas) {
            alert('Login correcto')
            setUser(credencialesvalidas)
            navigate("/")
        }
        else
            alert('Login incorrecto')
    }

    return (
        <div className='Home mx-3 mt-5 mb-5'>
        <Container>
            <Form
                onSubmit={e=> {
                    e.preventDefault();
                    login(email,password);
                }}>
                <h1 className="h3 mb-4 font-weight-normal">Logueate</h1>
                <Form.Group className="mb-3 w-25">
                    <Form.Control 
                        size='lg'
                        autoFocus={true}
                        type="email" 
                        name='email'
                        placeholder="email@example.com"
                        autoComplete='off'
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                         />
                </Form.Group>
                <Form.Group className="mb-3 w-25">
                    <Form.Control 
                        size='lg'
                        type="password"
                        name='password'
                        placeholder='Contraseña'
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                         />
                </Form.Group>
                <button type="submit" className='btn btn-outline-dark active mb-3 btn-lg' disabled={mensajeError}>Logueate</button>
                <p>{mensajeError}</p>
            </Form>
       </Container>
       </div>
    )
}

const validar = (email, password) => {
    if(!email.includes('@') && !email.includes('.')) 
        return <div className="alert alert-warning opacity-75 w-25" role="alert">Introduce un email.</div>;
    if(password.length === 0) 
        return <div className="alert alert-warning opacity-75 w-25" role="alert">Introduce la contraseña.</div>;
    else if (password.length <4) 
        return <div className="alert alert-warning opacity-75 w-25" role="alert">Contraseña de mínimo 4 caracteres.</div>;
}

export default Login