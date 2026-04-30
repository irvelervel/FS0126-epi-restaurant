// Il componente di oggi si occuperà di RECUPERARE le prenotazione salvate nel DB tramite l'API di ieri
// e di mostrarle in una lista dedicata all'amministrazione

import { Component } from 'react'
import { Container, Row, Col, ListGroup, Spinner } from 'react-bootstrap'

// Se un componente intende recuperare informazioni da un'API, questo componente avrà bisogno di uno STATO
// -> dobbiamo creare questo componente come CLASSE

class Backoffice extends Component {
  state = {
    // in questo stato predisporrò innanzitutto un luogo dove salvare le prenotazioni ricevute
    prenotazioni: [], // lo inizializzo come ARRAY VUOTO
    // ora mi salvo anche una proprietà per mostrare/nascondere l'indicatore di caricamento
    isLoading: true,
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
          // spengo lo spinner, settando isLoading nello state a false
          isLoading: false,
        })
      })
      .catch((err) => {
        console.log('ERRORE NEL RECUPERO PRENOTAZIONI', err)
        // spengo lo spinner, settando isLoading nello state a false
        this.setState({
          isLoading: false,
        })
      })
  }

  // render() è un metodo che dobbiamo includere obbligatoriamente in tutti i nostri componenti a classe
  // però non lo invochiamo mai direttamente! lo invoca solamente React in autonomia per gestire il
  // "disegno" dell'interfaccia

  // REGOLETTA D'ORO DI STEFANO
  // il metodo render() viene invocato automaticamente da React al montaggio del componente,
  // e viene automaticamente re-invocato ogni volta che il componente CAMBIA STATO o gli CAMBIANO LE PROPS
  // questo è un comportamento fondamentale per il LIFECYCLE dei componenti React

  // però non disperate, esiste il "posto" corretto dove inserire l'invocazione della nostra getPrenotazioni!
  componentDidMount() {
    // "il componente si è montato"
    // componentDidMount è un metodo riservato nei componenti a classe (come render!)
    // qual è il comportamento di componentDidMount? quando viene invocato, quante volte etc.?
    // componentDidMount viene lanciato UNA SOLA VOLTA, DOPO LA PRIMA INVOCAZIONE DI RENDER.
    console.log('SONO COMPONENTDIDMOUNT')
    // ABBIAMO LA CERTEZZA CHE NON VERRÀ MAI PIÙ ESEGUITO IN AUTOMATICO DA REACT
    this.getPrenotazioni() // <-- qui non entreremo mai nel loop infinito!
    // il metodo componentDidMount è stato ideato dal team di React proprio per invocare quelle operazioni
    // lunghe, costose, dispendiose che volete fare il minor numero di volte possibile.
  }

  render() {
    // this.getPrenotazioni() // <-- SBAGLIATO
    // poichè getPrenotazioni() è un metodo che dopo aver recuperato i dati effettua un setState(),
    // non possiamo inserirne l'invocazione nel metodo render() in quanto secondo la regoletta d'oro
    // appena scritta provocherebbe un ciclo infinito
    // render è il metodo che "disegna" l'interfaccia del componente
    console.log('SONO RENDER')
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={6} className="text-center">
            <h3>Amministrazione - Prenotazioni</h3>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3 mb-5">
          <Col xs={12} lg={6}>
            {
              // SHORT CIRCUIT
              // utile per il "conditional rendering"
              this.state.isLoading && (
                <div className="text-center">
                  <Spinner animation="grow" variant="info" />
                </div>
              )
            }
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

// TIMELINE DEL COMPONENTE BACKOFFICE
// 1) Il componente viene disegnato con la prima invocazione automatica del metodo render()
// 2) Se c'è, a questo punto, viene invocato anche il metodo componentDidMount()
// 3) In componentDidMount noi abbiamo inserito l'invocazione di getPrenotazioni(), che fa una fetch API
// e riempie lo stato (setState) del componente Backoffice con l'array delle prenotazioni a DB
// 4) Poichè è appena avvenuto un setState in getPrenotazioni e secondo le logiche interne di React questo
// provoca una seconda invocazione del metodo render().
