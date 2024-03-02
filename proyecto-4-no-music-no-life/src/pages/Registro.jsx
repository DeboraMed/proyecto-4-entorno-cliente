import Form from 'react-bootstrap/Form';
import { Container} from 'react-bootstrap';
import {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {DBusuarios, validaUsuario} from '../database/DBusuarios';
import {UserContext} from "../context/UserContext.jsx";

const Registro = () => {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const usuario = { nombre, email, password }
    const {user,setUser} = useContext(UserContext)

    //const mensajeError= validar(nombre,email,password);

    /*
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
    };*/

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            console.log("No validao")
            return;
        }

        event.preventDefault();

        const formData = new FormData(form);
        const usuario = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            DBusuarios(usuario);
            alert('Usuario registrado correctamente');
            login(usuario.email,usuario.password);
        } catch (error) {
            console.error('Error al guardar el usuario en la base de datos:', error);
            alert('Error al registrar el usuario');
        }
    };

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
        <div className='Home mx-3 mt-5'>
        <Container>
            <Form noValidate validated={validated}
                onSubmit={handleSubmit}>
                <h1 className="h3 mb-4 font-weight-normal">Registrate</h1>

                <Form.Group className="mb-3 w-50">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        size='lg'
                        autoFocus={true}
                        type="text"
                        name='nombre'
                        placeholder="Nombre"
                        autoComplete='off'
                        required
                        minLength='3'
                    />
                    <Form.Control.Feedback type="invalid">
                        Introduzca un nombre de al menos 3 caracteres.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 w-50">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        size='lg'
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

                <button type='submit' className='btn btn-outline-dark active mb-3 btn-lg'>Registrate</button>

            </Form>
       </Container>
       </div>
    )
}

export default Registro