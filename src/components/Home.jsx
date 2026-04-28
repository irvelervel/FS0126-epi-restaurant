import { Container, Row, Col, Carousel } from 'react-bootstrap'
import pastasciutte from '../data/menu.json'
// pastasciutte ora è un ARRAY di OGGETTI

const Home = function () {
  return (
    <Container>
      <Row className="mt-3">
        <Col className="text-center">
          <h1>Epi-Restaurant</h1>
          <h3>Le migliori pastasciutte del web!</h3>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} lg={8}>
          {/* sarebbe come dire <div className="col-12 col-md-6"></div> */}
          <Carousel>
            {pastasciutte.map((pasta) => {
              return (
                <Carousel.Item>
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
    </Container>
  )
}

export default Home
