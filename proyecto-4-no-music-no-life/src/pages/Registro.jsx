import Form from 'react-bootstrap/Form';
import { Container} from 'react-bootstrap';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Registro = () => {
    // TODO: Hacer pagina de registro de usuario y guardarlo en IndexedDB 
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const mensajeError= validar(nombre,email,password);
    console.log(nombre,email,password)

    return (
        <div className='Home mx-3 mt-5'>
        <Container>
            <Form
                onSubmit={e=> {
                    e.preventDefault();
                    login(nombre,email,password);
                }}>
                <Form.Group className="mb-3 w-50">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        type="text" 
                        name='nombre'
                        placeholder="Nombre"
                        autoComplete='off'
                        value = {nombre}
                        onChange = {e => setNombre(e.target.value)}
                         />
                </Form.Group>
                <Form.Group className="mb-3 w-50">
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
                <Form.Group className="mb-3 w-50">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type="password"
                        name='password'
                        placeholder='Contraseña'
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                         />
                </Form.Group>
                <button type='submit' className='btn btn-outline-primary active' disabled={mensajeError}>Registrate</button>
                <p>{mensajeError}</p>
            </Form>
            <button className='btn btn-outline-primary active' onClick={() => navigate("/login")}>Logueate</button>
            <p>¿Ya tienes una cuenta? Logueate</p>
       </Container>
       </div>
    )
}

const login = (nombre,email, password) => {
    if (email === 'prueba@prueba.com' && password === 'test')
        alert('Login correcto')
    else alert('Login incorrecto')
}

const validar = (nombre,email, password) => {
    if(nombre.length <3) return 'Nombre de mínimo 3 caracteres.';
    if(!email.includes('@')) return 'Email incorrecto.';
    if(password.length === 0) return 'Introduce la contraseña.';
    else if (password.length <4) return 'Contraseña de mínimo 4 caracteres.';
}

export default Registro