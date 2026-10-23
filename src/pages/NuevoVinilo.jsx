import { useNavigate } from 'react-router'
import { crearVinilo } from '../api/vinilos.js'
import FormularioVinilo from '../components/FormularioVinilo.jsx'

export default function NuevoVinilo() {
  const navigate = useNavigate()

  async function guardar(datos) {
    const { datos: creado, error } = await crearVinilo(datos)
    if (error) return error // el formulario se encarga de mostrarlo

    navigate(`/vinilos/${creado._id}`)
    return null
  }

  return (
    <section className="pagina-formulario">
      <h1>Nuevo vinilo</h1>
      <FormularioVinilo textoBoton="Crear vinilo" onGuardar={guardar} onCancelar={() => navigate('/')} />
    </section>
  )
}
