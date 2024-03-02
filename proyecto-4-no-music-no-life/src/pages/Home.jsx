import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, InputGroup, FormControl, Button, Row, Card, ListGroup, Alert} from 'react-bootstrap'
import {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import {UserContext} from "../context/UserContext.jsx";

const CLIENT_ID = "b3c7011458054337b04a46502fedb7ac"
const CLIENT_SECRET = "3f52a0360e524b1fab33d250428464bd"


function Home() {
  const [ inputBusqueda, setInputBusqueda] = useState("")
  const [ tokenAcceso, setTokenAcceso] = useState("")
  const [ artist, setArtist] = useState([])
  const [ albums, setAlbums] = useState([])
  const [ albumActual, setAlbumActual] = useState("")
  const [ canciones, setCanciones] = useState([])

  const {user,setUser} = useContext(UserContext)

  const navigate = useNavigate()

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

  async function busqueda() {

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
      .then( data => { 
        console.log(data)
        setArtist(data.artists.items[0])
        return data.artists.items[0].id})

    // LLAMADA ANIDADA obtener los 50 albunes del artista en españa: https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
    let obtenerAlbums = await fetch('https://api.spotify.com/v1/artists/'+ idArtista + '/albums'+ '?include_groups=album&market=ES&limit=50',parametrosBusqueda)
      .then(response => response.json())
      .then(data => { 
        setAlbums(data.items); 
    })

/*       // para las canciones: https://api.spotify.com/v1/albums/{album.id}/tracks
    let obtenerCanciones = await fetch('https://api.spotify.com/v1/albums/' + albumActual + '/tracks',parametrosBusqueda)
    .then(response => response.json())
    .then(data => { 
      setCanciones(data.items); 
    })  */
  }

  return (
    <>
      <div className='Home mx-3 mt-5'>
       <Container>
           {user && user.mensaje && (
               <Alert variant="success" onClose={() => user.mensaje = null} dismissible>
                   {user.mensaje}
               </Alert>
           )}
        <InputGroup className='mb-3' size='lg'>
        <FormControl
          name = 'busqueda'
          placeholder='Busqueda de Artista'
          type='input'
          onKeyDown={e => {
            if (e.key === 'Enter'){
              busqueda();
            }
          }}
          onChange={e => setInputBusqueda(e.target.value)}
        />
        <Button className='btn btn-outline-dark active btn-lg' onClick={busqueda}>Buscar</Button>
        </InputGroup>
      </Container>
      <Container className='mb-5'>
       <h1>{artist.name}</h1>
       <h4>{(artist.genres) ? artist.genres.map((genre) => genre).join(', ') : ''}</h4>
          <Row className="row row-cols-4 mb-5">
          {
            albums.map((album, i) =>{
            //console.log(album.id)
            // mostrar los albunes
            return(
              <Card key={i} className='mt-2'>
                <Card.Img className='mt-3' src={album.images[0].url} onClick={() => setAlbumActual(album.id)}/>
                <Card.Body>
                  <Card.Title>
                  <h5>{album.name}</h5>
                  </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    Release:<h6>{album.release_date}</h6>
                    <a onClick={()=> navigate(`/disco/${album.id}`)} className="link-dark position-absolute bottom-0 end-0">
                      <h1 className='position-absolute bottom-0 end-0 link-dark'>+
                      </h1>
                    </a>
                  </ListGroup.Item>
                </ListGroup>  
            </Card> 
            )
          })
          }             
          </Row>
       </Container>
      </div> 
    </>
  )
}

export default Home
