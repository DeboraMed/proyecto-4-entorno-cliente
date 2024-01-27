import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Container,Card } from 'react-bootstrap'

const Perfil = () => {

    const {user,setUser} = useContext(UserContext)

    return (
        <div className='Home mx-3 mt-5 mb-5'>
        
        <Container>
        <h1 className="h3 mb-4 font-weight-normal">Perfil</h1>
        <Card className="bg-light text-black pt-4 pb-4 px-3 mt-4 mb-4 w-50 bg-opacity-25">
            <Card.Title>Bienvenido/a {user.nombre}</Card.Title>
            <Card.Subtitle className='pt-1'>Nombre: {user.nombre}</Card.Subtitle>
            <Card.Subtitle className='pt-1'>Email: {user.email}</Card.Subtitle>
        </Card>
        </Container>
        </div>
    )
}

export default Perfil