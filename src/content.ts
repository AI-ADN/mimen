export type SportId = 'running' | 'cycling' | 'swimming' | 'gym';

export interface ClipSource {
  video: string;
  poster: string;
}

export interface JourneyState {
  id: SportId;
  sport: string;
  title: string;
  support: string;
  desktop: ClipSource;
  mobile: ClipSource;
  alt: string;
}

const clip = (name: SportId): Pick<JourneyState, 'desktop' | 'mobile'> => ({
  desktop: { video: `/media/${name}.mp4`, poster: `/media/${name}.jpg` },
  mobile: { video: `/media/${name}-m.mp4`, poster: `/media/${name}-m.jpg` },
});

export const brand = {
  name: 'MIMEN',
  tagline: 'Coaching para atletas, de principiante a pro',
  cta: 'Empieza hoy',
};

export const journey: JourneyState[] = [
  {
    id: 'running',
    sport: 'Running',
    title: 'Alcanza tu peak performance.',
    support: 'Coaching profesional adaptado a tu nivel, desde tu primer kilómetro hasta tu próxima meta.',
    alt: 'Corredor en un sprint por una carretera con neblina rodeada de árboles.',
    ...clip('running'),
  },
  {
    id: 'cycling',
    sport: 'Cycling',
    title: 'Cada pedalada, con propósito.',
    support: 'Rutinas diseñadas en torno a tus objetivos, para quien empieza y para quien compite.',
    alt: 'Ciclista de ruta acelerando de perfil junto a un bosque con neblina.',
    ...clip('cycling'),
  },
  {
    id: 'swimming',
    sport: 'Swimming',
    title: 'Rompe tus propios límites.',
    support: 'Tu rutina siempre a la mano: consulta tu entrenamiento desde la app.',
    alt: 'Nadadora en estilo libre vista desde arriba, rodeada de salpicaduras.',
    ...clip('swimming'),
  },
  {
    id: 'gym',
    sport: 'Gym',
    title: 'Más fuerte en cada sesión.',
    support: 'El equipo MIMEN acompaña tu proceso a través de la app, en cada etapa.',
    alt: 'Atleta realizando una sentadilla con barra en un gimnasio oscuro.',
    ...clip('gym'),
  },
];

export const media = {
  /** Generated with AI as stand-in footage; set to false once MIMEN supplies its own clips. */
  illustrative: false,
  illustrativeLabel: 'Imágenes ilustrativas',
};

export const contact = {
  navLabel: 'Contacto',
  title: 'Tu próximo nivel empieza hoy.',
  support: 'Cuéntanos tu deporte y lo que quieres lograr. Entrenamos desde principiantes hasta atletas que compiten.',
  otherSport: '¿Tu deporte es otro? Consúltanos.',
  submit: 'Contactar al equipo',
  sports: [
    { value: 'running', label: 'Running' },
    { value: 'cycling', label: 'Cycling' },
    { value: 'swimming', label: 'Swimming' },
    { value: 'gym', label: 'Gym' },
    { value: 'otro', label: 'Otro' },
  ],
  privacyPending:
    'Aviso de privacidad pendiente: MIMEN lo publicará antes de activar el envío del formulario.',
};
