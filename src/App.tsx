import { useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { Header } from './components/Header';
import { Journey } from './components/Journey';
import { useIsMobile, useReducedMotion } from './hooks/useMediaQuery';

const prefersSaveData = () =>
  typeof navigator !== 'undefined' &&
  Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);

export function App() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(prefersSaveData);
  const [pastJourney, setPastJourney] = useState(false);

  return (
    <>
      <a href="#contacto" className="skip-link focus-ring">
        Ir al formulario de contacto
      </a>
      <Header solid={pastJourney} />
      <main id="top">
        <Journey
          isMobile={isMobile}
          reducedMotion={reducedMotion}
          paused={paused}
          onTogglePause={() => setPaused((p) => !p)}
          onPastChange={setPastJourney}
        />
        <ContactSection />
      </main>
    </>
  );
}
