import './App.css'
// ho svuotato i file App.css e index.css, ora inserisco l'import per bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// questa riga ha importato il foglio css di bootstrap IN TUTTO IL PROGETTO!
import RestaurantNavbar from './components/RestaurantNavbar'
import RestaurantFooter from './components/RestaurantFooter'
import Home from './components/Home'
import BookATable from './components/BookATable'
// le graffe nell'import qui sono fondamentali perchè nessuno dei componenti react-bootstrap
// che stiamo andando ad importare sono esportati come DEFAULT dalla libreria!
// Solitamente invece, i componenti che creerete voi, saranno 1 per file! questo facilita le cose
// perchè li esporterete come default e li potrete dunque importare SENZA le graffe

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <RestaurantNavbar />
      </header>
      <main className="flex-grow-1">
        <h1 className="text-center my-3">Epi-Restaurant</h1>
        {/* componente prenotazioni */}
        <BookATable />
        {/* componente homepage */}
        <Home />
      </main>
      <footer>
        <RestaurantFooter />
      </footer>
    </div>
  )
}

export default App
