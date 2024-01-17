import Form from 'react-bootstrap/Form';
import { Container} from 'react-bootstrap';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { validaUsuario } from '../database/DBusuarios';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const mensajeError= validar(email,password);
    console.log(email,password)
    //TODO:cargar los datos del login del IndexedDB

    return (
        <div className='Home mx-3 mt-5'>
        <Container>
            <Form
                onSubmit={e=> {
                    e.preventDefault();
                    login(email,password);
                }}>
                <Form.Group className="mb-3 w-25">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        name='email'
                        placeholder="email@example.com"
                        autoComplete='off'
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                         />
                </Form.Group>
                <Form.Group className="mb-3 w-25">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type="password"
                        name='password'
                        placeholder='Contraseña'
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                         />
                </Form.Group>
                <button type='submit' className='btn btn-outline-primary active' disabled={mensajeError}>Logueate</button>
                <p>{mensajeError}</p>
            </Form>
            <button className='btn btn-outline-primary active' onClick={() => navigate("/registro")}>Regístrate</button>
            <p>Regístrate sino tienes una cuenta</p>
       </Container>
       </div>
    )
}

const login = async (email, password) => {
    let credencialesvalidas = await validaUsuario(email, password)
    if (credencialesvalidas)
        alert('Login correcto')
    else
        alert('Login incorrecto')
    /*
    if (email === 'prueba@prueba.com' && password === 'test')
        alert('Login correcto')
    else alert('Login incorrecto')*/
}

const validar = (email, password) => {
    if(!email.includes('@')) return 'Email incorrecto.';
    if(password.length === 0) return 'Introduce la contraseña.';
    //else if (password.length <4) return 'Contraseña de mínimo 4 caracteres.';
}

export default Login