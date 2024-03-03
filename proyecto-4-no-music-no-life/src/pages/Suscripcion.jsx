import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';

const Suscripcion = () => {
    const [nombre, setNombre] = useState('');
    const [nombreValido, setNombreValido] = useState(true);
    const [email, setEmail] = useState('');
    const [emailValido, setEmailValido] = useState(true);
    const [mayorEdad, setMayorEdad] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [fechaNacimientoValida, setFechaNacimientoValida] = useState(true);

    const handleNombreChange = (e) => {
        const nuevoNombre = e.target.value;
        setNombre(nuevoNombre);
        setNombreValido(nuevoNombre.length >= 3);
    };
    
    const handleEmailChange = (e) => {
        const nuevoEmail = e.target.value;
        setEmail(nuevoEmail);
        setEmailValido(/\w+@\w+\.+[a-z]/.test(nuevoEmail));
    };
    
    const handleFechaNacimientoChange = (e) => {
        const nuevaFecha = e.target.value; 
        const fechaActual = new Date();
        const dieciochoAnios = new Date(fechaActual.getFullYear() - 18, fechaActual.getMonth(), fechaActual.getDate());
      
        setFechaNacimiento(nuevaFecha);
        setFechaNacimientoValida(true);

        if (mayorEdad === 'Si' && nuevaFecha >= dieciochoAnios.toISOString().split("T")[0]) {
          setFechaNacimientoValida(false);
        } else if (mayorEdad === 'No' && nuevaFecha > dieciochoAnios.toISOString().split("T")[0]) {
          setFechaNacimientoValida(false);
        }
    };
    
    const validarFormulario = () => {
        return nombreValido && emailValido && mayorEdad && fechaNacimientoValida;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validarFormulario()) {
          console.log('Nombre enviado:', nombre);
          console.log('Email enviado:', email);
          console.log('¿Mayor de edad?', mayorEdad);
          console.log('Fecha de nacimiento:', fechaNacimiento);
        } else {
          console.log('Formulario incompleto o inválido');
        }
    };

    return (
        <div className='Home mx-3 mt-5'>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-4 font-weight-normal">Suscríbete a nuestra Newsletter</h1>
                    <Form.Group className="mb-3 w-50">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control 
                            size='lg'
                            autoFocus={true}
                            type="text"
                            name='nombre'
                            placeholder='Nombre'
                            autoComplete='off'
                            required
                            minLength='3'
                            value={nombre}
                            onChange={handleNombreChange}
                            isInvalid={!nombreValido} 
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
                            value={email}
                            onChange={handleEmailChange}
                            isInvalid={!emailValido} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Introduzca una dirección de Email válida.
                        </Form.Control.Feedback>
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
                            onChange={() => setMayorEdad('Si')}
                        />
                        <Form.Check
                            size='lg'
                            name='mayorEdad'
                            type='radio'
                            label='No'
                            value='No'
                            checked={mayorEdad === 'No'}
                            onChange={() => setMayorEdad('No')}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 w-50">
                        <Form.Label>Selecciona tu fecha de nacimiento</Form.Label>
                        <Form.Control 
                            size='lg'
                            name='fechaNacimiento'
                            type='date'
                            required
                            value={fechaNacimiento}
                            onChange={handleFechaNacimientoChange}
                            isInvalid={!fechaNacimientoValida} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Selecciona una fecha de nacimiento válida.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <button type='submit' disabled={!validarFormulario()} className='btn btn-outline-dark active mb-3 btn-lg'>Enviar</button>
                </Form>
            </Container>
        </div>
    );
};

export default Suscripcion;

