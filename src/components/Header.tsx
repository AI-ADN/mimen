import { brand } from '../content';
import { Mark } from './Mark';

interface HeaderProps {
  solid: boolean;
}

export function Header({ solid }: HeaderProps) {
  return (
    <header
      data-solid={solid || undefined}
      className="header fixed inset-x-0 top-0 z-40 flex h-(--header-h) items-center justify-between px-5 md:px-10"
    >
      <a
        href="#top"
        className="focus-ring -mx-2 flex items-center gap-2.5 rounded-md px-2 py-1 text-ink"
        aria-label={`${brand.name}, inicio`}
      >
        <Mark className="h-5 w-auto text-brand md:h-6" />
        <span className="wordmark text-[1.05rem] md:text-[1.15rem]">{brand.name}</span>
      </a>
      <a href="#contacto" className="btn-brand focus-ring h-10 px-5 text-[0.95rem] md:h-11 md:px-6">
        {brand.cta}
      </a>
    </header>
  );
}
