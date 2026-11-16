import { reader } from '@/lib/contenido';
import { Texto } from './Texto';

export function PaginaLegal({ titulo, actualizado, children }: { titulo: string; actualizado: string; children: React.ReactNode }) {
  return (
    <section className="seccion pagina">
      <div className="contenedor contenedor--angosto legal">
        <p className="seccion__antetitulo">Legales</p>
        <h1>{titulo}</h1>
        <p className="legal__fecha">
          Última actualización: <Texto>{actualizado}</Texto>
        </p>
        {children}
      </div>
    </section>
  );
}

export async function Titular() {
  const i = await reader.singletons.institucion.readOrThrow();
  return (
    <dl className="legal__datos">
      <dt>Titular</dt><dd><Texto>{i.nombre}</Texto></dd>
      <dt>Forma jurídica</dt><dd><Texto>{i.formaJuridica}</Texto></dd>
      {i.cuit && <><dt>CUIT</dt><dd><Texto>{i.cuit}</Texto></dd></>}
      <dt>Domicilio legal</dt><dd><Texto>{i.domicilio}</Texto></dd>
      <dt>Contacto sobre privacidad</dt><dd><Texto>{i.emailPrivacidad}</Texto></dd>
    </dl>
  );
}
