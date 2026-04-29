import { Container, Row, Col, Carousel, ListGroup } from 'react-bootstrap'
import pastasciutte from '../data/menu.json'
import { Component } from 'react'
// pastasciutte ora è un ARRAY di OGGETTI

// STATE -> stato del componente
// ogni componente React, volendo, può possedere una propria "memoria"
// in questo componente intendo memorizzare quale sia la pasta attualmente visualizzata

// per utilizzare un oggetto STATE abbiamo necessariamente bisogno di un componente A CLASSE

class Home extends Component {
  // nei componenti a classe è possibile avere un OGGETTO DI STATO

  state = {
    // in questo oggetto memorizzeremmo tutte le informazioni che vogliamo preservare
    // e di cui vogliamo mantenere traccia durante la vita del componente
    // nel nostro caso, ci salveremo la pasta attualmente visualizzata
    activePasta: pastasciutte[0], // "carbonara", la prima slide che si carica del carosello
  }

  render() {
    return (
      <Container>
        <Row className="my-3">
          <Col className="text-center">
            <h1>Epi-Restaurant</h1>
            <h3>Le migliori pastasciutte del web!</h3>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} lg={6} className="text-center">
            {/* sarebbe come dire <div className="col-12 col-md-6"></div> */}
            <Carousel
              onSlide={(i) => {
                console.log('SLIDE CAMBIATA!', i)
                console.log(pastasciutte[i])
                console.log(this.state)
                // PLOT TWIST! l'oggetto STATE è READ-ONLY!!!
                // this.state.activePasta = pastasciutte[i] // <-- NON SI PUÒ FARE
                // l'unico modo per aggiornare lo stato di un componente è utilizzare un METODO
                // this.setState() prende un NUOVO oggetto e lo FONDE su this.state esistente
                this.setState({
                  activePasta: pastasciutte[i],
                })
              }}
            >
              {pastasciutte.map((pasta) => {
                return (
                  <Carousel.Item key={pasta.id}>
                    <img src={pasta.image} alt="kitten" />
                    <Carousel.Caption>
                      <h3>{pasta.name}</h3>
                      <p>{pasta.description}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })}
            </Carousel>
          </Col>
        </Row>

        <Row className="justify-content-center mt-3">
          <Col xs={12} lg={6} className="text-center">
            <ListGroup>
              {this.state.activePasta.comments.map((c) => {
                return (
                  <ListGroup.Item key={c.id}>
                    {c.author}: {c.comment} - {c.rating}/5
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home
