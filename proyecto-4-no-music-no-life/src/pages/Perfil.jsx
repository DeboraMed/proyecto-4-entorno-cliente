import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Container,Card } from 'react-bootstrap'

const Perfil = () => {

    const {user,setUser} = useContext(UserContext)
    console.log(user)

    return (
        <Container>
        <Card className='mx-3'>
            <Card.Title>Bienvenido {user.nombre}</Card.Title>
            <Card.Subtitle>Email: {user.email}</Card.Subtitle>
        </Card>
        </Container>
    )
}

export default Perfil