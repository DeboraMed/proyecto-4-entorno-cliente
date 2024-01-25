import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Container,Card } from 'react-bootstrap'

const Perfil = () => {

    const {user,setUser} = useContext(UserContext)
    let nombre = user.nombre
    let email = user.email
    console.log(user)

    return (
        <Container>
        <Card className="bg-dark text-white pt-4 pb-4 px-3 mt-4 mb-4 w-50">
            <Card.Title>Bienvenido/a {user.nombre}</Card.Title>
            <Card.Subtitle className='pt-1'>Nombre: {nombre}</Card.Subtitle>
            <Card.Subtitle className='pt-1'>Email: {email}</Card.Subtitle>
        </Card>
        </Container>
    )
}

export default Perfil