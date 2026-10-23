import { Link, Outlet } from 'react-router'
import Disco from './Disco.jsx'

export default function Layout() {
  return (
    <>
      <header className="cabecera">
        <div className="contenedor cabecera__contenido">
          <Link to="/" className="marca">
            <Disco genero="rock" tamano="pequeno" />
            <span>Tienda de vinilos</span>
          </Link>
          <Link to="/vinilos/nuevo" className="boton boton--primario">
            + Nuevo vinilo
          </Link>
        </div>
      </header>

      <main className="contenedor principal">
        <Outlet />
      </main>
    </>
  )
}
