// Mensajes de "cargando" y de error que se repiten en varias páginas
export function Cargando({ texto = 'Cargando…' }) {
  return (
    <div className="estado" role="status">
      <div className="disco disco--mediano disco--girando" aria-hidden="true">
        <div className="disco__etiqueta" />
      </div>
      <p>{texto}</p>
    </div>
  )
}

export function MensajeError({ error, onReintentar, children }) {
  return (
    <div className="estado estado--error" role="alert">
      <p className="estado__titulo">{error.mensaje}</p>
      {error.detalles.length > 0 && (
        <ul>
          {error.detalles.map((detalle) => (
            <li key={detalle}>{detalle}</li>
          ))}
        </ul>
      )}
      <div className="acciones">
        {onReintentar && (
          <button type="button" className="boton" onClick={onReintentar}>
            Reintentar
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
