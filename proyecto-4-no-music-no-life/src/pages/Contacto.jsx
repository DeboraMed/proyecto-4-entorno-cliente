import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { useState } from 'react';


const Contacto = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");
    

    const mensajeError= validar(email,nombre,mensaje);
    console.log(email,nombre, mensaje)

    return (
        <div className='Home mx-3 mt-5'>
        <Container>
            <Form
                onSubmit={e=> {
                    e.preventDefault();
                    confirmarValidacion(email,nombre,mensaje);
                }}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        type="text"
                        name='nombre'
                        placeholder='Nombre'
                        value = {nombre}
                        onChange = {e => setNombre(e.target.value)}
                         />
                </Form.Group>
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
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control 
                        name = 'mensaje'
                        placeholder='Introduce aqui tu mensaje'
                        as="textarea" 
                        rows={4}
                        value = {mensaje} 
                        onChange = {e => setMensaje(e.target.value)}

                        />
                </Form.Group>
                <button type='submit' className='btn btn-outline-primary active' disabled={mensajeError}>Iniciar sesión</button>
                <p>{mensajeError}</p>
            </Form>
       </Container>
       </div>
    )
}

const confirmarValidacion = () => {
    if (validar)
        alert('Mensaje enviado correctamente')
    else alert('Datos incorrectos')
}

const validar = (email, nombre, mensaje) => {
    if(nombre.length === 0) return 'Introduce un nombre.';
    if(!email.includes('@')) return 'Email incorrecto.';
    if(mensaje.length === 0) return 'Introduce un mensaje.';
    else if (mensaje.length <10) return 'Mensaje de mínimo 10 caracteres.';
}

export default Contacto
