import Nav from 'react-bootstrap/Nav';

const Footer = () => {
    return (
        <>
        <footer className='footer fixed-bottom mt-auto py-3 bg-light'>
        <div className="container">
        <Nav className="justify-content-center border-bottom pb-3 mb-3" activeKey="/">
            <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link href="/contacto">Contacto</Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
                Login
            </Nav.Link>
            </Nav.Item>
            <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
                Perfil
            </Nav.Link>
            </Nav.Item>  
        </Nav>
        <p className="text-center text-muted mt-4 mb-4">Debora Medina Rivero 2º DAW ©2024</p>
        </div>
      </footer>
      </>
    )
}

export default Footer