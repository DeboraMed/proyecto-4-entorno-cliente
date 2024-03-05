import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Button, Row, Card, Alert, Col} from 'react-bootstrap'
import {useState} from 'react'
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";

const CLIENT_ID = "b3c7011458054337b04a46502fedb7ac"
const CLIENT_SECRET = "3f52a0360e524b1fab33d250428464bd"


function Busqueda() {
    const [resultados, setResultados] = useState(null)
    const [tipo, setTipo] = useState("album")
    let token = ""
    let pagina = 1
    let datosBusqueda = {}
    const limitePagina = 8
    const [paginacion, setPaginacion] = useState([])

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

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        event.preventDefault();

        const formData = new FormData(form);

        datosBusqueda = {
            input_search: formData.get('input_search'),
            input_type: formData.get('input_type'),
            input_year: formData.get('input_year'),
            input_genre: formData.get('input_genre'),
        };

        busqueda(datosBusqueda)
    };

    async function busqueda(datosBusqueda) {

        await getToken()

        let parametrosBusqueda = {
            method: 'GET', headers: {
                'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token
            }
        }

        let consulta = `search?type=${datosBusqueda.input_type}&q=${datosBusqueda.input_search}`

        if (datosBusqueda.input_genre !== '' && datosBusqueda.input_genre != null)
            consulta += ` genre:${datosBusqueda.input_genre}`
        if (datosBusqueda.input_year !== '' && datosBusqueda.input_year != null)
            consulta += ` year:${datosBusqueda.input_year}`


        if (datosBusqueda.input_type === 'album')
            //request por Id de artista:
            await fetch(`https://api.spotify.com/v1/${consulta}&limit=${limitePagina}&offset=${(pagina * limitePagina)}`, parametrosBusqueda)
                .then(response => response.json())
                .then(data => {
                    setResultados(data.albums.items);
                    let items = [];
                    for (let number = 1; number <= data.albums.total / limitePagina && number<=10; number++) {
                        items.push(<Pagination.Item key={number} active={number === pagina} onClick={() => {
                            pagina = (number);
                            busqueda(datosBusqueda);
                        }}>
                            {number}
                        </Pagination.Item>,);
                        setPaginacion(items)
                    }

                })
        else if (datosBusqueda.input_type === 'artist') {
            await fetch(`https://api.spotify.com/v1/${consulta}&limit=${limitePagina}&offset=${(pagina * limitePagina)}`, parametrosBusqueda)
                .then(response => response.json())
                .then(data => {
                    setResultados(data.artists.items);
                    let items = [];
                    for (let number = 1; number <= data.artists.total / limitePagina && number<=10; number++) {
                        items.push(<Pagination.Item key={number} active={number === pagina} onClick={() => {
                            pagina = (number);
                            busqueda(datosBusqueda);
                        }}>
                            {number}
                        </Pagination.Item>,);
                        setPaginacion(items)
                    }
                })
        }
    }

    return (<>
            <div className='Home mx-3 mt-5'>
                <Container>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group className="mb-3 w-50">
                                <Form.Label>Busqueda</Form.Label>
                                <Form.Control type="text"
                                              name='input_search'
                                              placeholder="Busqueda"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 w-25">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Select name="input_type" aria-label="Default select example"
                                             onChange={e => setTipo(e.target.value)}>
                                    <option value="album">Álbum</option>
                                    <option value="artist">Artista</option>
                                </Form.Select>
                            </Form.Group>
                            
                            {tipo === "album" &&
                                <Form.Group className="mb-3 w-25">
                                    <Form.Label>Década</Form.Label>
                                    <Form.Select name="input_year" aria-label="Default select example">
                                        <option></option>
                                        <option value="1950-1959">50&apos;s</option>
                                        <option value="1960-1969">60&apos;s</option>
                                        <option value="1970-1979">70&apos;s</option>
                                        <option value="1980-1989">80&apos;s</option>
                                        <option value="1990-1999">90&apos;s</option>
                                        <option value="2000-2009">00&apos;s</option>
                                        <option value="2010-2019">10&apos;s</option>
                                        <option value="2020-2029">20&apos;s</option>
                                    </Form.Select>
                                </Form.Group>
                            }

                            {tipo === "artist" &&
                                <Form.Group className="mb-3 w-25">
                                    <Form.Label>Genero</Form.Label>
                                    <Form.Select name="input_genre" aria-label="Genero">
                                        <option value=""></option>
                                        <option value="christmas">Christmas</option>
                                        <option value="classical">Classical</option>
                                        <option value="country">Country</option>
                                        <option value="dance">Dance</option>
                                        <option value="edm">EDM</option>
                                        <option value="hip hop">Hip hop</option>
                                        <option value="house">House</option>
                                        <option value="indie">Indie</option>
                                        <option value="indietronica">Indietronica</option>
                                        <option value="jazz">Jazz</option>
                                        <option value="lounge">Lounge</option>
                                        <option value="pop">Pop</option>
                                        <option value="r&b">R&B</option>
                                        <option value="rap">Rap</option>
                                        <option value="rock">Rock</option>
                                        <option value="soul">Soul</option>
                                        <option value="synthpop">Synthpop</option>
                                        <option value="trap">Trap</option>
                                    </Form.Select>
                                </Form.Group>
                            }

                        </Row>

                        <Button type='submit' className='btn btn-outline-dark active btn-lg'>Buscar</Button>
                    </Form>

                </Container>
                {resultados != null && resultados.length === 0 && (
                    <Container className='mb-5'>
                        <Row className="justify-content-md-center">
                            <Col lg="auto">
                                <Alert>
                                    No se ha obtenido ningun resultado en la busqueda
                                </Alert>
                            </Col>
                        </Row>
                    </Container>
                )}
                {resultados != null && resultados.length >= 1 && (
                    <Container className='mb-5'>
                        <Row className="row row-cols-4 mb-5">
                            {resultados.map((resultado, i) => {
                                // mostrar los albunes
                                return (<Card key={i} className='mt-2'>
                                    {resultado.images[0] && (
                                        <Card.Img className='mt-3' src={resultado.images[0].url}/>
                                    )}
                                    <Card.Body>
                                        <Card.Title>
                                            <h5>{resultado.name}</h5>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>)
                            })}
                        </Row>
                    </Container>
                )}
                <Container>
                    <Row className="justify-content-md-center">
                        <Col lg="auto">
                            {resultados != null && resultados.length >= 1 && paginacion.length >= 2 && (<Pagination>{paginacion}</Pagination>)}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Busqueda

