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
                <h1 class="h3 mb-4 font-weight-normal">Formulario de contacto</h1>
                <Form.Group className="mb-3 w-50">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control 
                        size='lg'
                        autoFocus={true}
                        type="text"
                        name='nombre'
                        placeholder='Nombre'
                        value = {nombre}
                        onChange = {e => setNombre(e.target.value)}
                         />
                </Form.Group>
                <Form.Group className="mb-3 w-50">
                    <Form.Label>Email</Form.Label>
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
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control 
                        size='lg'
                        name = 'mensaje'
                        placeholder='Introduce aqui tu mensaje'
                        as="textarea" 
                        rows={4}
                        value = {mensaje} 
                        onChange = {e => setMensaje(e.target.value)}

                        />
                </Form.Group>
                <button type='submit' className='btn btn-outline-dark active mb-3 btn-lg' disabled={mensajeError}>Enviar</button>
                <p>{mensajeError}</p>
            </Form>
       </Container>
       </div>
    )
}

const confirmarValidacion = () => {
    if (validar)
        alert('Mensaje enviado correctamente')
    else 
        alert('Ha ocurrido un error')
}

const validar = (email, nombre, mensaje) => {
    if(nombre.length === 0) 
        return <div className="alert alert-warning opacity-75 w-50" role="alert">Introduce un nombre válido</div>;
    if(!email.includes('@')) 
        return <div className="alert alert-warning opacity-75 w-50" role="alert">Introduce un email válido</div>;
    if(mensaje.length === 0) 
        return <div className="alert alert-warning opacity-75 w-50" role="alert">Introduce un mensaje</div>;
    else if (mensaje.length <10) 
        return <div className="alert alert-warning opacity-75 w-50" role="alert">Mensaje de mínimo 10 caracteres</div>;
}

export default Contacto
