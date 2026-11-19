import type { Metadata } from 'next';
import { fechaLarga } from '@/lib/formato';
import {
  ACTUACIONES, CONTENIDO_PENDIENTE, ESTADOS_SOLICITUD, FECHA_TRANSPARENCIA,
  FUENTE_TRANSPARENCIA, REGLA_PLAZOS, SOLICITUDES, TEMAS_TRANSPARENCIA, TOTAL_PUNTOS,
} from '@/lib/transparencia';

export const metadata: Metadata = {
  title: { absolute: 'Transparencia y Seguridad Pública en La Matanza – VaLoMi' },
  description: 'Seguimiento de las solicitudes de acceso a la información pública presentadas por VaLoMi a organismos nacionales, provinciales y municipales sobre seguridad en La Matanza.',
  robots: { index: false, follow: false },
};

const INDICE = [
  ['presentacion', 'El proyecto'], ['como-leer', 'Cómo leer esta sección'],
  ['solicitudes', 'Las seis solicitudes'], ['cronologia', 'Línea de tiempo'],
  ['documentos', 'Documentos'], ...TEMAS_TRANSPARENCIA.map((t) => [t.id, t.titulo]),
  ['indicadores', 'Indicadores'], ['fuentes', 'Fuentes y cuidado de datos'],
];
const indicadores = [
  ['Solicitudes presentadas', String(SOLICITUDES.length)], ['Puntos documentales pedidos', String(TOTAL_PUNTOS)],
  ['Puntos con respuesta completa', '0'], ['Puntos con respuesta parcial', '0'], ['Puntos pendientes', String(TOTAL_PUNTOS)],
  ['Pedidos con constancia formal de recepción o expediente', 'Pendiente de completar cuando se incorporen las constancias.'],
  ['Pedidos en subsanación presentada', '2 · Seguridad PBA y Economía PBA.'],
  ['Pedidos con trámite registrado', '1 · Nación; carga en TAD informada el 19/11/2026, constancia pendiente.'],
  ['Pedidos con recepción confirmada', '1 · Concejo Deliberante; acuse automático.'],
  ['Pedidos en estado de solicitud enviada, sin acuse documentado', '2 · Municipalidad y Procuración.'],
  ['Fecha de esta medición', '19 de noviembre de 2026'],
];

export default function Transparencia() {
  return (
    <div className="transparencia seccion pagina">
      <div className="contenedor">
        <header className="tp-cabecera">
          <p className="seccion__antetitulo">Acceso a la información pública</p>
          <h1>Transparencia y Seguridad Pública – La Matanza</h1>
          <p className="seccion__bajada">Seguimiento de las solicitudes de acceso a la información pública presentadas por VaLoMi sobre seguridad, fondos y recursos en el partido.</p>
          <p className="tp-fecha">Última actualización: <time dateTime={FECHA_TRANSPARENCIA}>{fechaLarga(FECHA_TRANSPARENCIA)}</time>.</p>
          <p className="tp-revision" role="note">Propuesta para revisión · pendiente de aprobación institucional.</p>
        </header>

        <div className="tp-indice-escritorio">
          <nav aria-label="Índice de Transparencia" className="tp-indice">
            <h2>En esta sección</h2>
            <ul>{INDICE.map(([id, nombre]) => <li key={id}><a href={`#${id}`}>{nombre}</a></li>)}</ul>
          </nav>
        </div>
        <details className="tp-indice-movil">
          <summary>Índice de esta sección</summary>
          <nav aria-label="Índice de Transparencia (móvil)" className="tp-indice">
            <ul>{INDICE.map(([id, nombre]) => <li key={id}><a href={`#${id}`}>{nombre}</a></li>)}</ul>
          </nav>
        </details>

        <section id="presentacion" className="tp-seccion tp-texto" aria-labelledby="presentacion-titulo">
          <h2 id="presentacion-titulo">Lo que pedimos y lo que se responde</h2>
          <p>El 4 de noviembre de 2026, VaLoMi – Vecinos en Alerta de Lomas del Mirador presentó seis solicitudes de acceso a la información pública a organismos nacionales, provinciales y municipales. En total, se pidieron 46 puntos documentales.</p>
          <p>El objetivo es informar a los vecinos sobre estas gestiones, sobre las respuestas oficiales y sobre lo que los documentos digan —cuando lleguen— acerca del destino de los fondos públicos, de los recursos de seguridad y de los indicadores delictivos en La Matanza.</p>
          <p>Esta sección no reemplaza a un organismo público. Acá se publica lo que se pidió, lo que cada organismo contestó y los documentos oficiales que se puedan mostrar.</p>
          <div className="tp-regla"><strong>Una solicitud no es una respuesta.</strong> Un pedido de requisitos formales, o la indicación de otro canal, no es una entrega de la información pedida.</div>
          <p className="tp-fuente">{FUENTE_TRANSPARENCIA} Los datos de esta carga están informados por la organización; las constancias pendientes se identifican en cada ficha.</p>
        </section>

        <section id="como-leer" className="tp-seccion tp-texto" aria-labelledby="como-leer-titulo">
          <h2 id="como-leer-titulo">Cómo leer esta sección</h2>
          <p>Cada solicitud tiene un estado, tomado de una lista cerrada. El estado describe el trámite, no adelanta un juicio sobre el organismo.</p>
          <div className="tp-regla">{REGLA_PLAZOS}</div>
          <details className="tp-ayuda">
            <summary>Ver los once estados posibles</summary>
            <ul>{ESTADOS_SOLICITUD.map((estado) => <li key={estado}>{estado}</li>)}</ul>
          </details>
          <p>Cada actualización indica, en este orden: <strong>organismo, actuación, fecha, resultado y documento respaldatorio.</strong></p>
        </section>

        <section id="solicitudes" className="tp-seccion" aria-labelledby="solicitudes-titulo">
          <header className="tp-seccion-cabecera">
            <p className="seccion__antetitulo">El estado de los pedidos</p>
            <h2 id="solicitudes-titulo">Seis solicitudes, 46 puntos documentales</h2>
            <p>Al 19 de noviembre de 2026, ninguno de los 46 puntos tiene una respuesta sobre el contenido. Hay, en algunos organismos, actos de trámite: pedidos de requisitos formales, un acuse automático o la indicación de otro canal.</p>
          </header>
          <div className="tp-tabla" role="region" aria-label="Tabla de las seis solicitudes" tabIndex={0}>
            <table>
              <caption>Estado informado por VaLoMi al 19 de noviembre de 2026. Seleccioná un organismo para leer su ficha. En móvil, deslizá la tabla para ver las cinco columnas.</caption>
              <thead><tr>{['Organismo', 'Fecha de presentación', 'Objeto', 'Estado', 'Última actualización'].map((columna) => <th key={columna} scope="col">{columna}</th>)}</tr></thead>
              <tbody>{SOLICITUDES.map((s) => (
                <tr key={s.id}>
                  <th scope="row"><a href={`#pedido-${s.id}`}>{s.organismo}</a></th>
                  <td><time dateTime={`2026-11-04T${s.hora}`}>4 de noviembre de 2026, {s.hora}</time>{s.id === 'seguridad-nacion' && <p className="tp-fuente">Por correo. Carga en TAD informada el 19/11; fecha exacta pendiente.</p>}</td>
                  <td><strong>{s.puntos} puntos:</strong> {s.objeto}{s.marco && <p className="tp-fuente">{s.marco}</p>}</td>
                  <td><span className="tp-estado">{s.estado}</span></td>
                  <td><time dateTime={s.actualizacion}>{fechaLarga(s.actualizacion)}</time>{s.notaFecha && <p className="tp-fuente">{s.notaFecha}</p>}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="tp-fichas">
            {SOLICITUDES.map((s) => (
              <article key={s.id} id={`pedido-${s.id}`} className="tp-ficha" aria-labelledby={`pedido-${s.id}-titulo`}>
                <p className="tp-ficha__rotulo">Qué significa hoy este estado</p>
                <h3 id={`pedido-${s.id}-titulo`}>{s.organismo}</h3>
                <span className="tp-estado">{s.estado}</span>
                <p>{s.explicacion}</p>
                <p><strong>Qué falta.</strong> {s.pendientes}</p>
                <p><strong>Plazo:</strong> pendiente de verificación.</p>
                <p className="tp-fuente">Fuente: seguimiento informado por VaLoMi. Última actuación: {fechaLarga(s.actualizacion)}.{s.notaFecha && <> {s.notaFecha}</>}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="cronologia" className="tp-seccion" aria-labelledby="cronologia-titulo">
          <header className="tp-seccion-cabecera"><p className="seccion__antetitulo">Actuaciones, una por una</p><h2 id="cronologia-titulo">Línea de tiempo</h2><p>De la primera presentación a la última novedad informada. Un acto de trámite no se cuenta como entrega de información.</p></header>
          <ol className="tp-cronologia">{ACTUACIONES.map((a) => {
            const solicitud = SOLICITUDES.find((s) => s.id === a.solicitud)!;
            return (
              <li key={a.id}>
                <article aria-labelledby={`actuacion-${a.id}`}>
                  <p className="tp-ficha__rotulo">{solicitud.organismo}</p>
                  <h3 id={`actuacion-${a.id}`}>{a.actuacion}</h3>
                  <p className="tp-fecha"><time dateTime={`${a.fecha}${a.hora ? `T${a.hora}` : ''}`}>{fechaLarga(a.fecha)}{a.hora && `, ${a.hora}`}</time>{a.reserva && <> · {a.reserva}</>}</p>
                  <p><strong>Resultado.</strong> {a.resultado}{a.id === 'envio-concejo' && <> Ese mismo día se informa un acuse automático.</>}</p>
                  <p className="tp-fuente"><strong>Documento respaldatorio.</strong> {a.documento}</p>
                </article>
              </li>
            );
          })}</ol>
          <p className="tp-fuente">Fuente de la cronología: {FUENTE_TRANSPARENCIA} No se publican enlaces a documentos que todavía no fueron incorporados en una versión pública.</p>
        </section>

        <section id="documentos" className="tp-seccion" aria-labelledby="documentos-titulo">
          <header className="tp-seccion-cabecera"><p className="seccion__antetitulo">Solicitudes y respaldo documental</p><h2 id="documentos-titulo">Documentos</h2><p>Acá se publican las solicitudes y los documentos oficiales que se puedan mostrar, con su fuente, su fecha y una breve explicación de qué son. No se publican datos personales ni copias de documentos de identidad.</p></header>
          <div className="tp-regla"><strong>Por ahora, fichas de seguimiento.</strong> Todavía no se incorporaron versiones públicas de las solicitudes, las respuestas de trámite ni las constancias. Los objetos resumidos no sustituyen el texto literal de los 46 puntos. No hay archivos de esos trámites para descargar.</div>
          <div className="tp-fichas">{SOLICITUDES.map((s) => (
            <article key={s.id} className="tp-ficha" aria-labelledby={`documento-${s.id}`}>
              <p className="tp-ficha__rotulo">Ficha de solicitud · {s.puntos} puntos</p>
              <h3 id={`documento-${s.id}`}>{s.organismo}</h3>
              <p>Presentación informada: <time dateTime="2026-11-04">4 de noviembre de 2026</time>, {s.hora}.</p>
              <p><strong>Estado.</strong> {s.estado}.</p>
              <p><strong>Documento.</strong> {s.documento}</p>
              <p className="tp-fuente">El texto literal completo de los {s.puntos} puntos está pendiente de incorporación en una versión pública. Fuente: seguimiento informado por VaLoMi, al 19/11/2026.</p>
              <a href={`#pedido-${s.id}`}>Ver la situación de este pedido</a>
            </article>
          ))}</div>
          <details className="tp-ayuda">
            <summary>Qué documentación se puede publicar</summary>
            <ul><li>Cuerpo de las solicitudes, con organismo, fecha, objeto y puntos pedidos, sin datos personales.</li><li>Respuestas oficiales, acuses, constancias, expedientes, prórrogas, derivaciones, denegatorias y entregas, cuando existan y sean publicables.</li><li>Normas, resoluciones, transferencias, rendiciones, inventarios y estadísticas oficiales, con fuente, fecha y contexto.</li></ul>
            <p>Cada archivo tendrá título, organismo, fecha, tipo de documento y, cuando corresponda, los puntos a los que responde.</p>
          </details>
        </section>

        <section id="temas" className="tp-seccion" aria-labelledby="temas-titulo">
          <header className="tp-seccion-cabecera"><p className="seccion__antetitulo">Qué queremos conocer</p><h2 id="temas-titulo">Seis temas de seguimiento</h2><p>Se distingue lo pedido, lo documentado y lo que falta. No se completan estos apartados con anuncios o recortes periodísticos en lugar de documentación oficial.</p></header>
          <p className="tp-fuente">Fuente de los objetos pedidos: {FUENTE_TRANSPARENCIA} Presentaciones informadas del 4/11/2026.</p>
          <div className="tp-temas">{TEMAS_TRANSPARENCIA.map((tema) => (
            <article key={tema.id} id={tema.id} className="tp-tema" aria-labelledby={`tema-${tema.id}`}>
              <h3 id={`tema-${tema.id}`}>{tema.titulo}</h3>
              <h4>Qué se pidió</h4><p>{tema.pedido}</p>
              <h4>Qué hay documentado hoy y qué falta</h4><p>{CONTENIDO_PENDIENTE}</p>
              <h4>Qué se va a mostrar cuando haya documentos</h4><p>{tema.mostrar}</p>
            </article>
          ))}</div>
        </section>

        <section id="indicadores" className="tp-seccion" aria-labelledby="indicadores-titulo">
          <header className="tp-seccion-cabecera"><p className="seccion__antetitulo">Estado del trámite</p><h2 id="indicadores-titulo">Indicadores de cumplimiento institucional</h2><p>Este recuadro no es un ranking ni una nota de “cumplió / no cumplió”. Resume el seguimiento al 19 de noviembre de 2026.</p></header>
          <dl className="tp-indicadores">{indicadores.map(([nombre, valor]) => <div key={nombre}><dt>{nombre}</dt><dd>{valor}</dd></div>)}</dl>
          <p className="tp-fuente">Fuente: {FUENTE_TRANSPARENCIA} Los 46 puntos siguen pendientes de una respuesta de contenido; un acto de trámite no modifica ese recuento.</p>
          <div className="tp-regla">{REGLA_PLAZOS}</div>
        </section>

        <footer id="fuentes" className="tp-seccion tp-fuentes" aria-labelledby="fuentes-titulo">
          <h2 id="fuentes-titulo">Responsable, fuentes y cuidado de los datos</h2>
          <p><strong>Responsable institucional:</strong> Gabriel Armando Lombardo, titular de VaLoMi – Vecinos en Alerta de Lomas del Mirador.</p>
          <p><strong>Fuente de esta carga:</strong> {FUENTE_TRANSPARENCIA} Las leyes y los objetos se identifican en cada solicitud. Las comunicaciones, notas y constancias mencionadas todavía no se adjuntaron en versiones públicas a esta propuesta.</p>
          <p><strong>Qué no se publica:</strong> DNI, domicilios particulares, teléfonos privados, firmas manuscritas, copias de documentos personales, datos personales de terceros o de efectivos, ni información táctica u operativa sensible. Si un documento contiene esos datos, se prepara una versión pública depurada antes de subirlo.</p>
          <p>Las diferencias entre documentos oficiales se describen con su fuente y quedan abiertas a aclaración. No se formulan acusaciones sin respaldo documental. La seguridad no tiene color político.</p>
          <p className="tp-fecha">Última actualización: <time dateTime={FECHA_TRANSPARENCIA}>{fechaLarga(FECHA_TRANSPARENCIA)}</time>.</p>
          <a href="#">Volver al inicio de la página ↑</a>
        </footer>
      </div>
    </div>
  );
}
