import Form from 'react-bootstrap/Form';
import {Alert, Container} from 'react-bootstrap';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {DBusuarios, validaUsuario} from '../database/DBusuarios';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext)

    const [error, setError] = useState("")

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }

        event.preventDefault();

        const formData = new FormData(form);
        const usuario = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            login(usuario.email, usuario.password);
        } catch (error) {
            console.error('Error al guardar el usuario en la base de datos:', error);

            alert('Error al registrar el usuario');
        }
    };


    const login = async (email, password) => {
        let credencialesvalidas = await validaUsuario(email, password)
        if (credencialesvalidas) {
            credencialesvalidas.mensaje = 'Usuario ha accedido correctamente'
            setUser(credencialesvalidas)
            navigate("/")
        } else {
            setError("Credenciales Incorrectas")
        }
    }

    return (
        <div className='Home mx-3 mt-5'>
            <Container>
                <Form noValidate validated={validated}
                      onSubmit={handleSubmit}>
                    <h1 className="h3 mb-4 font-weight-normal">Logueate</h1>
                    <Form.Group className="mb-3 w-50">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            size='lg'
                            autoFocus={true}
                            type="email"
                            name='email'
                            placeholder="email@example.com"
                            autoComplete='off'
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Introduzca una dirección de Email valida.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3 w-50">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            size='lg'
                            type="password"
                            name='password'
                            placeholder="Contraseña"
                            autoComplete='off'
                            required
                            minLength='4'
                        />
                        <Form.Control.Feedback type="invalid">
                            Introduzca una contraseña de al menos 4 caracteres.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <button type='submit' className='btn btn-outline-dark active mb-3 btn-lg'>Logueate</button>
                    {error!=="" && (
                        <div className="alert alert-warning opacity-75 w-25" role="alert">{error}</div>
                    )}
                </Form>
            </Container>
        </div>
    )
}


export default Login