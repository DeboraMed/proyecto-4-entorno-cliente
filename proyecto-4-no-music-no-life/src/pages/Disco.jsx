import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Card, ListGroup, Col} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

const CLIENT_ID = "b3c7011458054337b04a46502fedb7ac"
const CLIENT_SECRET = "3f52a0360e524b1fab33d250428464bd"

const Disco = () => {

    const {albumActual} = useParams()
    let token = ""
    const [canciones, setCanciones] = useState([])
    const [portada, setPortada] = useState([])
    const [disco, setDisco] = useState([])
    const [artista, setArtista] = useState([])

    useEffect(() => {
        busqueda();
    }, []) // <-- empty dependency array

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return (seconds === 60 ? (minutes + 1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }

    async function getToken() {
        // API token acceso Spotify
        let parametrosAutor = {
            method: 'POST', headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }, body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }

        await fetch('https://accounts.spotify.com/api/token', parametrosAutor)
            //promesa
            .then(result => result.json())
            .then(data => token = data.access_token)
    }

    async function busqueda() {

        await getToken()

        let parametrosBusqueda = {
            method: 'GET', headers: {
                'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token
            }
        }

        // para las canciones: https://api.spotify.com/v1/albums/{album.id}/tracks
        await fetch('https://api.spotify.com/v1/albums/' + albumActual, parametrosBusqueda)
            .then(response => response.json())
            .then(data => {
                setCanciones(data.tracks.items);
                setPortada(data.images[0].url);
                setArtista(data.artists[0].name);
                setDisco(data);
            })
    }

    return (<div>
        <Container className='mb-5'>
            <Row>
                <Col md={{span: 8, offset: 2}}>
                    <h1>{artista}</h1>
                </Col>
            </Row>
            <Row>
                <Col md={{span: 3, offset: 2}}>
                    <Card.Img variant="top" src={portada}/>
                </Col>
                <Col md={{span: 6, offset: 0}}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h5>{disco.name}</h5>
                            </Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            {canciones.map((cancion, i) => {
                                // mostrar los albunes
                                return (<ListGroup.Item key={i}>
                                    <h6>&lt;&lt;{cancion.name}&gt;&gt; {millisToMinutesAndSeconds(cancion.duration_ms)}</h6>
                                </ListGroup.Item>)
                            })}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    </div>)
}

export default Disco