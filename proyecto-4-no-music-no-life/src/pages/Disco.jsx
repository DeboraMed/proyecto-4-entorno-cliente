import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, InputGroup, FormControl, Button, Row, Card, ListGroup} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {UserContext} from '../context/UserContext';

const CLIENT_ID = "b3c7011458054337b04a46502fedb7ac"
const CLIENT_SECRET = "3f52a0360e524b1fab33d250428464bd"

const Disco = () => {

    const {albumActual} = useParams()
    let token = ""

    const [canciones, setCanciones] = useState([])

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
        await fetch('https://api.spotify.com/v1/albums/' + albumActual + '/tracks', parametrosBusqueda)
            .then(response => response.json())
            .then(data => {
                console.log(data.items)
                setCanciones(data.items);
            })
    }


    return (<div>

        <Button className='btn btn-outline-dark active btn-lg' onClick={busqueda}>Buscar</Button>

        <Row className="row row-cols-4 mb-5">
            {canciones.map((cancion, i) => {
                //console.log(album.id)
                // mostrar los albunes
                return (<Card key={i} className='mt-2'>
                        <Card.Body>
                            <Card.Title>
                                <h5>{cancion.name}</h5>
                            </Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                                Duracion:<h6>{millisToMinutesAndSeconds(cancion.duration_ms)}</h6>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>)
            })}
        </Row>
    </div>)
}

export default Disco