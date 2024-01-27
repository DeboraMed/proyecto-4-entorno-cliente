import Form from 'react-bootstrap/Form';
import { Container} from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DBusuarios } from '../database/DBusuarios';

const Registro = () => {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const usuario = { nombre, email, password }

    const mensajeError= validar(nombre,email,password); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mensajeError) {
            try {
                DBusuarios(usuario);
                alert('Usuario registrado correctamente');
            } catch (error) {
                console.error('Error al guardar el usuario en la base de datos:', error);
                alert('Error al registrar el usuario');
            }
        }
    };

    return (
        <div className='Home mx-3 mt-5'>
        <Container>
            <Form
                onSubmit={handleSubmit}>
                <h1 class="h3 mb-4 font-weight-normal">Registrate</h1>
                <Form.Group className="mb-3 w-50">
                    <Form.Control 
                        size='lg'
                        autoFocus={true}
                        type="text" 
                        name='nombre'
                        placeholder="Nombre"
                        autoComplete='off'
                        value = {nombre}
                        onChange = {e => setNombre(e.target.value)}
                         />
                </Form.Group>
                <Form.Group className="mb-3 w-50">     
                    <Form.Control 
                        size='lg'
                        type="email" 
                        name='email'
                        placeholder="email@example.com"
                        autoComplete='off'
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                         />
                </Form.Group>
                <Form.Group className="mb-3 w-50">      
                    <Form.Control 
                        size='lg'
                        type="password"
                        name='password'
                        placeholder='Contraseña'
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                         />
                </Form.Group>
                <button type='submit' className='btn btn-outline-dark active mb-3 btn-lg' disabled={mensajeError}>Registrate</button>
                {mensajeError}
            </Form>
            <button className='btn btn-outline-dark active btn-lg' onClick={() => navigate("/login")}>Logueate</button>
            <p className='font-weight-bold'>¿Ya tienes una cuenta? Logueate.</p>
       </Container>
       </div>
    )
}


const validar = (nombre,email, password) => {
    if(nombre.length <3) 
        return <div className="alert alert-warning opacity-75 w-50" role="alert">'Nombre de mínimo 3 caracteres.'</div>;
    if(!email.includes('@')) 
        return <div className="alert alert-warning opacity-75 w-50" role="alert">'Email incorrecto.'</div>;
    if(password.length === 0) 
        return <div className="alert alert-warning opacity-75 w-50" role="alert">'Introduce la contraseña.'</div>;
    else if (password.length <4) 
        return <div className="alert alert-warning opacity-75 w-50" role="alert">'Contraseña de mínimo 4 caracteres'</div>;
}

export default Registro