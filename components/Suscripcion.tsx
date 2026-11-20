import { SUSCRIPCIONES, type ListaSuscripcion } from '@/lib/suscripciones';

export function Suscripcion({ lista }: { lista: ListaSuscripcion }) {
  const suscripcion = SUSCRIPCIONES[lista];

  return (
    <div className="suscripcion__acciones">
      <a className="boton boton--primario" href={suscripcion.url} target="_blank" rel="noopener noreferrer">
        {suscripcion.boton}
      </a>
      <p>
        El formulario de EnvíaloSimple se abre en otra pestaña. Completá tus datos allí para solicitar la suscripción.
      </p>
      <p>
        <a href="/privacidad#aviso-lanzamiento">Política de privacidad</a>. Podés darte de baja desde cada envío.
      </p>
    </div>
  );
}
