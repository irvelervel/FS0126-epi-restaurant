// questo componente renderizzerà un FORM per permettere agli utenti di prenotare un tavolo
// l'utente riempirà i campi con le proprie informazioni e invierà questi dati ad un API
// il metodo HTTP utilizzato per salvare una nuova prenotazione sarà POST

import { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

// - OGNI VOLTA CHE UN COMPONENTE POSSIEDE UN CAMPO INPUT C'È BISOGNO DI UNO STATE -
// -> dev'essere un COMPONENTE A CLASSE

// Ho chiesto a GianGiorgio quale sia il "model" dell'oggetto "prenotazione" che verrà salvato a DB
// l'endpoint è https://striveschool-api.herokuapp.com/api/reservation

// un oggetto "prenotazione" è fatto così:
// - name // string
// - phone // string
// - numberOfPeople // string | number
// - smoking // boolean
// - dateTime // string
// - specialRequests // string | undefined

class BookATable extends Component {
  state = {
    // all'interno di questo state come sempre memorizzo informazioni che collegano la logica
    // del componente all'interfaccia
    // nel caso di oggi lo utilizzeremo per tenere traccia dei valori dei campi del form
    // direttamente durante la loro compilazione

    reservation: {
      // questo oggetto terrà traccia del valore dei singoli input
      name: '',
      phone: '',
      numberOfPeople: '',
      smoking: false,
      dateTime: '',
      specialRequests: '',
    },
  }

  // ogni componente a classe necessità di un metodo OBBLIGATORIO chiamato "render"
  render() {
    // qui potete ritornare il vostro JSX
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={6} className="text-center">
            <h3>Prenota un tavolo!</h3>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3 mb-5">
          <Col xs={12} lg={6}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="name">Nome</Form.Label>
                <Form.Control
                  id="name"
                  type="text"
                  placeholder="Giangiorgio"
                  required
                  // ora colleghiamo input per input allo stato con un "two-way data binding"
                  // 1) colleghiamo le proprietà dell'oggetto reservation nello state al valore dell'input
                  value={this.state.reservation.name} // inizialmente ''
                  // 2) facciamo in modo che ogni carattere digitato vada a riempire quella proprietà "name" nello state
                  onChange={(e) => {
                    // questa funzione viene invocata automaticamente ad ogni carattere inserito nell'input
                    // e.target.value è il valore corrente che stiamo inserendo nell'input
                    // dobbiamo sovrascrivere il valore di this.state.reservation.name con e.target.value
                    this.setState({
                      // andiamo a sovrapporre un nuovo oggetto sullo state attuale
                      reservation: {
                        ...this.state.reservation, // questa riga serve a NON perdere phone, numberOfPeople, smoking etc.
                        // lo spread operator trasporta in questo nuovo reservation tutti i valori del reservation attuale nello state
                        name: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="phone">Telefono</Form.Label>
                <Form.Control
                  id="phone"
                  type="tel"
                  placeholder="+39123123"
                  required
                  // 1)
                  value={this.state.reservation.phone}
                  // 2)
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        phone: e.target.value, // riempio la proprietà phone con quello che ho scritto
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="numberOfPeople">
                  In quanti siete?
                </Form.Label>
                <Form.Control
                  id="numberOfPeople"
                  type="number"
                  placeholder="2"
                  required
                  min="1"
                  max="8"
                  //   1)
                  value={this.state.reservation.numberOfPeople}
                  // 2)
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        numberOfPeople: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              {/* <Form.Group className="mb-3">
                <Form.Label htmlFor="numberOfPeople">
                  In quanti siete?
                </Form.Label>
                <Form.Select id="numberOfPeople">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8+</option>
                </Form.Select>
              </Form.Group> */}

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Tavolo fumatori?"
                  checked={this.state.reservation.smoking}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        smoking: e.target.checked,
                        // la proprietà "value" di una checkbox ritorna una stringa ("on" o "off")
                        // la proprietà "checked" di una checkbox ritorna un booleano (true o false)
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="dateTime">Data e ora</Form.Label>
                <Form.Control
                  id="dateTime"
                  type="datetime-local"
                  required
                  value={this.state.reservation.dateTime}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        dateTime: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="specialRequests">
                  Allergie/Malattie/Bambini
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  id="specialRequests"
                  value={this.state.reservation.specialRequests}
                  onChange={(e) => {
                    this.setState({
                      reservation: {
                        ...this.state.reservation,
                        specialRequests: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Invia!
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default BookATable

// SPREAD OPERATOR
// const objA = {
//   firstName: 'Antonio',
//   lastName: 'Formisano',
// }

// const objB = {
//   ...objA,
// }

// objB è una VERA copia di objA
