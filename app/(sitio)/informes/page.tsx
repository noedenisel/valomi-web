import type { Metadata } from 'next';
import { informesVisibles } from '@/lib/contenido';
import { FilaInforme } from '@/components/Informes';

export const metadata: Metadata = {
  title: 'Informe VaLoMi',
  description: 'Archivo completo del Informe VaLoMi, con el PDF descargable y la versión web de cada número.',
};

export default async function ArchivoInformes() {
  const informes = await informesVisibles();
  const porAnio = new Map<string, typeof informes>();
  for (const i of informes) {
    const anio = (i.fechaPublicacion ?? '').slice(0, 4);
    porAnio.set(anio, [...(porAnio.get(anio) ?? []), i]);
  }

  return (
    <section className="seccion pagina">
      <div className="contenedor contenedor--angosto">
        <header className="seccion__cabecera">
          <p className="seccion__antetitulo">Informe VaLoMi</p>
          <h1>Archivo de informes</h1>
          <p className="seccion__bajada">
            Todos los números publicados, del más reciente al más antiguo. Cada número tiene su PDF descargable; el documento recibido se conserva en su página.
          </p>
        </header>
        {informes.length === 0 && <p className="vacio">Todavía no hay informes publicados.</p>}
        {[...porAnio].map(([anio, lista]) => (
          <div key={anio} className="archivo__anio">
            <h2>{anio}</h2>
            <ul className="lista-informes">
              {lista.map((i) => (
                <FilaInforme key={i.slug} informe={i} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
