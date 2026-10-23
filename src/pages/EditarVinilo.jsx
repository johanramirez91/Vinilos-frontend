import { Link, useNavigate, useParams } from 'react-router'
import { actualizarVinilo } from '../api/vinilos.js'
import { Cargando, MensajeError } from '../components/Estado.jsx'
import FormularioVinilo from '../components/FormularioVinilo.jsx'
import { useVinilo } from '../hooks/useVinilos.js'

export default function EditarVinilo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { datos: vinilo, error, cargando, recargar } = useVinilo(id)

  async function guardar(cambios) {
    const { error } = await actualizarVinilo(id, cambios)
    if (error) return error // el formulario se encarga de mostrarlo

    navigate(`/vinilos/${id}`)
    return null
  }

  if (cargando) return <Cargando texto="Cargando vinilo…" />
  if (error) {
    return (
      <MensajeError error={error} onReintentar={error.status === 0 || error.status >= 500 ? recargar : undefined}>
        <Link to="/" className="boton">
          Volver al catálogo
        </Link>
      </MensajeError>
    )
  }

  return (
    <section className="pagina-formulario">
      <h1>Editar “{vinilo.nombre}”</h1>
      <FormularioVinilo
        key={vinilo._id}
        vinilo={vinilo}
        textoBoton="Guardar cambios"
        onGuardar={guardar}
        onCancelar={() => navigate(`/vinilos/${id}`)}
      />
    </section>
  )
}
