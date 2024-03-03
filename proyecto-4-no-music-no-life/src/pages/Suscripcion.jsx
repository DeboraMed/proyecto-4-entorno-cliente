import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { useState } from 'react';


const Suscripcion = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [mayorEdad, setMayorEdad] = useState("");
    const [edad, setEdad] = useState("");
    
    const mensajeError= validar(email,nombre,edad);
    const mensajeEnviado= confirmarValidacion();

    const seleccionNacimiento = (e) => {
        const fechaSeleccionada = new Date(e.target.value);
        const fechaActual = new Date();
        const dieciochoAnios = new Date(fechaActual.getFullYear() - 18, fechaActual.getMonth(), fechaActual.getDate());
        setEdad(parseInt(e.target.value));

        if (mayorEdad === 'Si' && fechaSeleccionada >= dieciochoAnios) {
            alert('Debes ser mayor de edad para enviar el formulario.');
            setEdad(''); // limpia el input
        } else if (mayorEdad === 'No' && fechaSeleccionada < dieciochoAnios) {
            alert('No puedes ser menor de edad para enviar el formulario.');
            setEdad(''); 
        } else {
            setEdad(e.target.value);
        }
    };


    return (
        <div className='Home mx-3 mt-5'>
        <Container>
            <Form
                onSubmit={e=> {
                    e.preventDefault();
                    confirmarValidacion(email,nombre);
                }}>
                <h1 className="h3 mb-4 font-weight-normal">Suscribete a nuestra Newsletter</h1>
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
                    <Form.Label>¿Eres mayor de edad?</Form.Label>
                    <Form.Check
                        size='lg'
                        name='mayorEdad'
                        type='radio'
                        label='Si'
                        value='Si'
                        checked={mayorEdad === 'Si'}
                        onChange={e => setMayorEdad(e.target.value)}
                    />
                    <Form.Check
                        size='lg'
                        name='mayorEdad'
                        type='radio'
                        label='No'
                        value='No'
                        checked={mayorEdad === 'No'}
                        onChange={e => setMayorEdad(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3 w-50">
                    <Form.Label>Selecciona tu fecha de nacimiento</Form.Label>
                    <Form.Control 
                        size='lg'
                        name='edad'
                        type='date'
                        value={edad}
                        onChange={seleccionNacimiento}
                        />
                </Form.Group>
                <button type='submit' className='btn btn-outline-dark active mb-3 btn-lg' disabled={mensajeError}>Enviar</button>
                <p>{mensajeError}</p>
                <p>{mensajeEnviado}</p>
            </Form>
       </Container>
       </div>
    )
}

const confirmarValidacion = (mensajeEnviado,mensajeError) => {
    if (mensajeEnviado)
        return <div className="alert alert-info opacity-75 w-50" role="alert">Mensaje enviado correctamente</div>;
    else if (mensajeError)
        return <div className="alert alert-danger opacity-75 w-50" role="alert">Ha ocurrido un error en el envío del mensaje</div>;
    else
        return null;
}

const validateEmail= (email)  => {
    let re = /\w+@\w+\.+[a-z]/;
    return re.test(email);
}

const validar = (email, nombre,edad) => {
    if(nombre.length === 0) 
        return <div className="alert alert-warning opacity-75 w-50" role="alert">Introduce un nombre válido</div>;
    if(!validateEmail(email)) 
        return <div className="alert alert-warning opacity-75 w-50" role="alert">Introduce un email válido</div>;
    if(edad === '')
        return <div className="alert alert-warning opacity-75 w-50" role="alert">Campo edad requerido</div>;

}

export default Suscripcion
