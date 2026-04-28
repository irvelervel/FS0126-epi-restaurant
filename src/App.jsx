import './App.css'
// ho svuotato i file App.css e index.css, ora inserisco l'import per bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// questa riga ha importato il foglio css di bootstrap IN TUTTO IL PROGETTO!
import { Container, Row, Col } from 'react-bootstrap'
import RestaurantNavbar from './components/RestaurantNavbar'
import RestaurantFooter from './components/RestaurantFooter'
// le graffe nell'import qui sono fondamentali perchè nessuno dei componenti react-bootstrap
// che stiamo andando ad importare sono esportati come DEFAULT dalla libreria!
// Solitamente invece, i componenti che creerete voi, saranno 1 per file! questo facilita le cose
// perchè li esporterete come default e li potrete dunque importare SENZA le graffe

function App() {
  return (
    <>
      <header>
        <RestaurantNavbar />
      </header>
      <main>
        <Container>
          <Row>
            <Col xs={12} md={6}>
              {/* sarebbe come dire <div className="col-12 col-md-6"></div> */}
            </Col>
          </Row>
        </Container>
      </main>
      <footer>
        <RestaurantFooter />
      </footer>
    </>
  )
}

export default App
