// Ilustración de un disco hecha solo con CSS; el color de la etiqueta depende del género
export default function Disco({ genero, tamano = 'mediano' }) {
  return (
    <div className={`disco disco--${tamano}`} style={{ '--etiqueta': `var(--genero-${genero})` }} aria-hidden="true">
      <div className="disco__etiqueta" />
    </div>
  )
}
