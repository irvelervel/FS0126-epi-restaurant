// creo un componente per ospitare la navbar presa da React-Bootstrap che andrò a personalizzarmi
// un componente React può venire scritto come CLASSE o come FUNZIONE

// funzione -> componenti semplici <-- useremo questo
// classe -> componenti complessi

// importo le cose che mi servono da react-bootstrap
import { Navbar, Container, Nav } from 'react-bootstrap'

const RestaurantNavbar = function () {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#home">Epi-Restaurant</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Menu</Nav.Link>
            <Nav.Link href="#">Prenota un tavolo</Nav.Link>
            <Nav.Link href="#">Contatti</Nav.Link>
            <Nav.Link href="#">Amministrazione</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default RestaurantNavbar
