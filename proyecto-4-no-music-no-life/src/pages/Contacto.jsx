import Form from 'react-bootstrap/Form';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState } from 'react';


const Contacto = () => {
    const [contenidoForm, setContanidoForm] = useState("")

    function enviar(){
        //TODO: manejar el contenido del formulario
        console.log(contenidoForm)
    }

    return (
        <Container className='mx-3 mt-5'>
            <Form>
                <Form.Group className="mb-3" controlId="ControlInput1">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ControlInput2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ControlTextarea1">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <button className='btn btn-outline-primary active' onClick={enviar}>Enviar</button>
                </Form>
       </Container>
    )
}

export default Contacto