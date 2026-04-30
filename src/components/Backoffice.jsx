// Il componente di oggi si occuperà di RECUPERARE le prenotazione salvate nel DB tramite l'API di ieri
// e di mostrarle in una lista dedicata all'amministrazione

import { Component } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'

// Se un componente intende recuperare informazioni da un'API, questo componente avrà bisogno di uno STATO
// -> dobbiamo creare questo componente come CLASSE

class Backoffice extends Component {
  state = {
    // in questo stato predisporrò innanzitutto un luogo dove salvare le prenotazioni ricevute
    prenotazioni: [], // lo inizializzo come ARRAY VUOTO
  }

  getPrenotazioni = () => {
    // vi consiglio di creare i vostri metodi nei componenti a classe con funzioni freccia perchè
    // queste ultime NON hanno un proprio contesto di esecuzione ed "ereditano" quello circostante
    // (cioè quello della classe); in questo modo preserviamo il corretto binding di parole come "this"
    fetch('https://striveschool-api.herokuapp.com/api/reservation')
      .then((response) => {
        if (response.ok) {
          // solo se ottengo 200/201 proseguo con l'estrazione del JSON
          return response.json()
        } else {
          // response.status è un codice d'errore
          throw new Error('Response errata', response.status)
        }
      })
      .then((arrayPrenotazioni) => {
        console.log('PRENOTAZIONI A DB', arrayPrenotazioni)
        // ora procedo a salvare questo arrayPrenotazioni dentro this.state.prenotazioni
        this.setState({
          prenotazioni: arrayPrenotazioni,
        })
      })
      .catch((err) => {
        console.log('ERRORE NEL RECUPERO PRENOTAZIONI', err)
      })
  }

  // render() è un metodo che dobbiamo includere obbligatoriamente in tutti i nostri componenti a classe
  // però non lo invochiamo mai direttamente! lo invoca solamente React in autonomia per gestire il
  // "disegno" dell'interfaccia

  // REGOLETTA D'ORO DI STEFANO
  // il metodo render() viene invocato automaticamente da React al montaggio del componente,
  // e viene automaticamente re-invocato ogni volta che il componente CAMBIA STATO o gli CAMBIANO LE PROPS
  // questo è un comportamento fondamentale per il LIFECYCLE dei componenti React

  render() {
    // this.getPrenotazioni()
    // render è il metodo che "disegna" l'interfaccia del componente
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={6} className="text-center">
            <h3>Amministrazione - Prenotazioni</h3>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3 mb-5">
          <Col xs={12} lg={6}>
            <ListGroup>
              {/* questa lista dovrà sempre rispecchiare l'elenco delle prenotazioni esistenti */}

              {this.state.prenotazioni.map((reservation) => {
                return (
                  <ListGroup.Item key={reservation._id}>
                    {reservation.name} per {reservation.numberOfPeople} alle{' '}
                    {reservation.dateTime}
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

export default Backoffice
