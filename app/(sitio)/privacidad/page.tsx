import type { Metadata } from 'next';
import { PaginaLegal } from '@/components/Legal';
import { Texto } from '@/components/Texto';

export const metadata: Metadata = { title: 'Privacidad' };

export default function Privacidad() {
  return (
    <PaginaLegal titulo="Política de privacidad" actualizado="3 de noviembre de 2026">
      <h2>En pocas palabras</h2>
      <ul>
        <li>Esta web no te pide registrarte. Los únicos formularios son los de suscripción, y solo piden tu correo.</li>
        <li>No uso cookies de publicidad ni herramientas de seguimiento.</li>
        <li>Si me escribís, uso tus datos solo para responderte.</li>
        <li>Podés pedirme en cualquier momento que borre tus datos.</li>
        <li>La app de reportes tiene su propia política de privacidad.</li>
      </ul>

      <h2>Quién es responsable de tus datos</h2>
      <p>
        <Texto>
          {'Soy Gabriel Lombardo, titular de Vecinos en Alerta de Lomas del Mirador (VaLoMi). Trato tus datos como persona humana. Domicilio: Lomas del Mirador, La Matanza, provincia de Buenos Aires. Correo de privacidad: '}
        </Texto>
        <a href="mailto:privacidad@valomi.com.ar">privacidad@valomi.com.ar</a>.
      </p>

      <h2>Qué datos trato</h2>
      <ul>
        <li>
          <strong>Navegación:</strong> DonWeb, el servicio que aloja esta web, registra datos técnicos básicos (por ejemplo,
          la dirección IP y el tipo de navegador) para que la web funcione y se proteja de ataques. No los uso para
          identificarte.
        </li>
        <li>
          <strong>Contacto:</strong>{' '}
          <Texto>
            {'si me escribís por correo o formulario, recibo los datos que elijas compartir (por ejemplo, tu nombre, tu correo o tu teléfono) y el contenido de tu mensaje.'}
          </Texto>
        </li>
        <li id="aviso-lanzamiento">
          <strong>Suscripciones:</strong> si te suscribís al Informe VaLoMi semanal o al aviso de lanzamiento del mapa de
          reportes vecinales, guardo tu correo, la lista a la que te sumaste y la fecha. Primero te mando un mail para que
          confirmes que la dirección es tuya.
        </li>
      </ul>

      <h2>Quién más procesa tus datos</h2>
      <ul>
        <li>DonWeb aloja la web, con servidores en Argentina.</li>
        <li>DonWeb administra las listas de correo y envía los mails mediante su servicio EnvíoSimple.</li>
      </ul>

      <h2>Para qué los uso</h2>
      <p>
        Solo para responder tu consulta y, si te suscribiste, para enviarte lo que pediste. No los vendo, no los cedo y no
        los uso para enviarte publicidad ni para fines políticos.
      </p>

      <h2>Cuánto tiempo los guardo</h2>
      <ul>
        <li>
          <Texto>{'Los mensajes, mientras haga falta para responderte y, como máximo, 1 año. Después los borro.'}</Texto>
        </li>
        <li>
          <Texto>
            {'Tu correo de suscripción, hasta que te des de baja o, como máximo, 1 año. Podés darte de baja con el enlace que viene en cada mail o escribiéndome.'}
          </Texto>
        </li>
      </ul>

      <h2>Tus derechos</h2>
      <p>
        De acuerdo con la Ley 25.326 de Protección de los Datos Personales, podés pedirme el acceso a tus datos, su
        rectificación, su actualización o su supresión. Escribime al correo de privacidad que figura arriba. Te respondo
        dentro de los plazos de la ley: 10 días corridos para el acceso y 5 días hábiles para la rectificación o la supresión.
      </p>
      <p>
        La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la
        atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por
        incumplimiento de las normas vigentes en materia de protección de datos personales.
      </p>
      <p>
        Inscripción en el Registro Nacional de Bases de Datos: en trámite.
      </p>

      <h2>Cambios</h2>
      <p>
        Si cambio esta política, actualizo la fecha de arriba. Si el cambio es importante, también les aviso por correo a
        quienes están suscriptos.
      </p>
    </PaginaLegal>
  );
}
