import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CLIENT_ID = "b3c7011458054337b04a46502fedb7ac"
const CLIENT_SECRET = "3f52a0360e524b1fab33d250428464bd"


function Home() {
  const [ inputBusqueda, setInputBusqueda] = useState("")
  const [ tokenAcceso, setTokenAcceso] = useState("")
  const [ albums, setAlbums] = useState([])
  const [ albumActual, setAlbumActual] = useState("")

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
      .then(data => setTokenAcceso(data.access_token)) 
  }, [])

  // busqueda
  async function busqueda() {
    //console.log("Busqueda de " + inputBusqueda)

    let parametrosBusqueda = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokenAcceso
      }
    }

     //request por Id de artista: 
    let idArtista = await fetch('https://api.spotify.com/v1/search?q='+ inputBusqueda + '&type=artist', parametrosBusqueda)
      .then( response => response.json())
      .then( data => { return data.artists.items[0].id})

      //console.log("el artista es " + idArtista)

      // obtener los 50 albunes del artista en españa: https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
    let obtenerAlbums = await fetch('https://api.spotify.com/v1/artists/'+ idArtista + '/albums'+ '?include_groups=album&market=ES&limit=50',parametrosBusqueda)
      .then(response => response.json())
      .then(data => { 
        console.log(data);
        setAlbums(data.items); 
      })
      
      // TODO: mostrar la infomación del album en otra pagina
  }
  //console.log(albums)
  
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
          <Row className="mx-2 row row-cols-4">
          {albums.map( (album, i) =>{
            console.log(albumActual)
            // mostrar los albunes
            return(
              <Card>
            <Card.Img src={album.images[0].url} onClick={() => setAlbumActual(album.id)}/>
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
              </Card.Body>   
            </Card> 
            )

          })}             
          </Row>
       </Container>
      </div> 
    </>
  )
}

export default Home
