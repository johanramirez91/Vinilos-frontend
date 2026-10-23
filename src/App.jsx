import { Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import DetalleVinilo from './pages/DetalleVinilo.jsx'
import EditarVinilo from './pages/EditarVinilo.jsx'
import ListaVinilos from './pages/ListaVinilos.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'
import NuevoVinilo from './pages/NuevoVinilo.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ListaVinilos />} />
        <Route path="vinilos/nuevo" element={<NuevoVinilo />} />
        <Route path="vinilos/:id" element={<DetalleVinilo />} />
        <Route path="vinilos/:id/editar" element={<EditarVinilo />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}

export default App
