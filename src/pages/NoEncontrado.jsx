import { Link } from 'react-router'

export default function NoEncontrado() {
  return (
    <div className="estado">
      <p className="estado__titulo">Esta página no existe</p>
      <Link to="/" className="boton">
        Volver al catálogo
      </Link>
    </div>
  )
}
