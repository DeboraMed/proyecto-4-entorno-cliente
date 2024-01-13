import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CLIENT_ID = "b3c7011458054337b04a46502fedb7ac"
const CLIENT_SECRET = "3f52a0360e524b1fab33d250428464bd"

function App() {
  const [inputBusqueda, setInputBusqueda] = useState("")
  const [tokenAcceso, setTokenAcceso] = useState("") // token de acceso

  // se ejecuta al comienzo 
  useEffect(() => {
    // API token acceso Spotify
    let parametrosAutor = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token',parametrosAutor)
      //promesa
      .then(result => result.json())
      .then(data => setTokenAcceso(data.token_acceso)) 
      .then(data => console.log(data)) 
      // TODO: voy por aqui
  }, [])

  // busqueda
  async function busqueda() {
    console.log("Busqueda de " + inputBusqueda)

    //request por Id de artista
    let parametrosArtista = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenAcceso
      }
    }
    let IdArtista = await fetch('https://api.spotify.com/v1/search?q='+ inputBusqueda + '&type=artist', parametrosArtista)
      .then( response => response.json())
      .then( data => console.log(data))

  }

  return (
    <>
      <div className='App'>
      {/* elementos de Bootstrap */}
       <Container>
        <InputGroup className='mb-3' size='lg'>
        <FormControl
          placeholder='Busqueda de Artista'
          type='input'
          onKeyDown={e => {
            if (e.key === 'Enter'){
              busqueda();
            }
          }}
          onChange={e => setInputBusqueda(e.target.value)}
        />
        <Button onClick={busqueda}>Buscar</Button>
        </InputGroup>
       </Container>
       <Container>
          <Row className='mx-2 row row-cols-4'>
            <Card.Img src="#"/>
              <Card.Body>
                <Card.Title>Nombre del disco</Card.Title>
              </Card.Body>        
            <Card.Img src="#"/>
              <Card.Body>
                <Card.Title>Nombre del disco</Card.Title>
              </Card.Body>        
            <Card.Img src="#"/>
              <Card.Body>
                <Card.Title>Nombre del disco</Card.Title>
              </Card.Body>      
            <Card.Img src="#"/>
              <Card.Body>
                <Card.Title>Nombre del disco</Card.Title>
              </Card.Body>         
          </Row>
       </Container>
      </div> 
    </>
  )
}

export default App
