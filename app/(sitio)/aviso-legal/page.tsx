import type { Metadata } from 'next';
import { PaginaLegal } from '@/components/Legal';
import { Texto } from '@/components/Texto';

export const metadata: Metadata = { title: 'Aviso legal' };

export default function AvisoLegal() {
  return (
    <PaginaLegal titulo="Aviso legal" actualizado="3 de noviembre de 2026">
      <p>
        <strong>Titular del sitio.</strong>{' '}
        <Texto>{'Gabriel Lombardo. Domicilio: Lomas del Mirador, La Matanza, provincia de Buenos Aires. Contacto: '}</Texto>
        <a href="mailto:info@valomi.com.ar">info@valomi.com.ar</a>. Correo de privacidad:{' '}
        <a href="mailto:privacidad@valomi.com.ar">privacidad@valomi.com.ar</a>.
      </p>
      <p>
        <strong>Naturaleza del sitio.</strong>{' '}
        <Texto>
          {'Este es el sitio de Gabriel Lombardo, titular de Vecinos en Alerta de Lomas del Mirador (VaLoMi), asociación civil (legajo 152.904, matrícula 32.527 ante la DPPJ). No es un sitio oficial del Estado ni un canal de emergencias o de denuncias.'}
        </Texto>
      </p>
      <p>
        <strong>Independencia.</strong> La seguridad no tiene color político. Vecinos en Alerta de Lomas del Mirador no
        publica mensajes partidarios.
      </p>
      <p>
        <strong>Marcas y logos.</strong>{' '}
        <Texto>
          {'El nombre y el logo de Vecinos en Alerta de Lomas del Mirador pertenecen a la asociación. Los nombres de medios de comunicación se mencionan a título informativo. Sus logos solo se muestran con autorización.'}
        </Texto>
      </p>
    </PaginaLegal>
  );
}
