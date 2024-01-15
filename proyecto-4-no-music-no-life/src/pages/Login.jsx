import Form from 'react-bootstrap/Form';
import { Container} from 'react-bootstrap';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const mensajeError= validar(email,password);
    console.log(email,password)

    return (
        <div className='Home mx-3 mt-5'>
        <Container>
            <Form
                onSubmit={e=> {
                    e.preventDefault();
                    login(email,password);
                }}>
                <Form.Group className="mb-3">
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
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type="password"
                        name='password'
                        placeholder='Contraseña'
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                         />
                </Form.Group>
                <button type='submit' className='btn btn-outline-primary active' disabled={mensajeError}>Iniciar sesión</button>
                <p>{mensajeError}</p>
            </Form>
       </Container>
       </div>
    )
}

const login = (email, password) => {
    if (email === 'prueba@prueba.com' && password === 'test')
        alert('Login correcto')
    else alert('Login incorrecto')
}

const validar = (email, password) => {
    if(!email.includes('@')) return 'Email incorrecto.';
    if(password.length === 0) return 'Introduce la contraseña.';
    else if (password.length <4) return 'Contraseña de mínimo 4 caracteres.';
}

export default Login