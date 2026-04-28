const RestaurantFooter = function () {
  return (
    <p
      className="text-center m-0 py-3 fs-5"
      style={{ backgroundColor: '#368baf', color: 'white' }}
    >
      {/* esempio di stile inline in JSX -> DOPPIA GRAFFA (una perchè non è una stringa, una perchè è un oggetto) */}
      EPICODE - {new Date().getFullYear()}
    </p>
  )
}

export default RestaurantFooter
