import type { Metadata } from 'next';
import { PaginaLegal } from '@/components/Legal';

export const metadata: Metadata = { title: 'Términos de uso' };

export default function Terminos() {
  return (
    <PaginaLegal titulo="Términos de uso" actualizado="3 de noviembre de 2026">
      <p>
        <strong>No es un canal de emergencias.</strong> Esta web no es un canal oficial de emergencias ni de denuncias.
        Ante una emergencia, llamá al <a href="tel:911">911</a>. Para hacer una denuncia formal, andá a la comisaría o a la
        fiscalía.
      </p>
      <p>
        <strong>Qué publico.</strong> Publico información institucional de Vecinos en Alerta de Lomas del Mirador,
        propuestas, el Informe VaLoMi y documentación de pedidos y respuestas oficiales. No publico nombres de personas
        vinculadas a hechos delictivos ni acusaciones contra terceros.
      </p>
      <p>
        <strong>Informes.</strong> Los informes se publican en su PDF original, sin alteraciones. Si un informe se corrige,
        lo indico en una fe de erratas. Si se retira, dejo constancia de la fecha y del motivo. Los resúmenes que acompañan
        a los informes están rotulados como tales y no reemplazan el documento.
      </p>
      <p>
        <strong>Estadísticas.</strong> Toda cifra que publico indica su fuente. No publico estadísticas sin una fuente
        verificable. Las cifras del Observatorio Vecinal son reportes ciudadanos recibidos por VaLoMi: no son delitos
        confirmados ni estadística oficial.
      </p>
      <p>
        <strong>Uso del contenido.</strong> Podés compartir los informes y los contenidos de esta web citando la fuente:
        «Gabriel Lombardo – VaLoMi», sin fines comerciales y sin modificar los textos ni los datos. Las notas y los videos
        de medios de terceros pertenecen a esos medios.
      </p>
      <p>
        <strong>Enlaces a otros sitios.</strong> Los enlaces a notas periodísticas y a sitios de terceros se ofrecen como
        referencia. No controlo su contenido ni respondo por él.
      </p>
      <p>
        <strong>App de reportes.</strong> La app de reportes tiene sus propios términos de uso y su propia política de
        privacidad.
      </p>
    </PaginaLegal>
  );
}
