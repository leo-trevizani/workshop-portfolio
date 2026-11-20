import { ArrowDown, ArrowUp } from 'lucide-react';
import { FOOTER_SIGNATURE, INSTITUTION_NAME, SLIDE_TITLES } from '../data/slidesContent';
import { formatSlideCounter } from '../utils/presentation';

interface FlowerMarkProps {
  className?: string;
  color?: string;
}

export function UbiquaFlowerMark({
  className = 'w-7 h-7',
  color = 'currentColor',
}: FlowerMarkProps) {
  const petals = Array.from({ length: 16 }, (_, idx) => idx * 22.5);
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {petals.map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="22"
          rx="5.6"
          ry="17"
          fill={color}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="16" fill={color} />
    </svg>
  );
}

interface SlideFooterProps {
  dark?: boolean;
  includeInstitution?: boolean;
  includeSignature?: boolean;
}

export function SlideFooter({
  dark = false,
  includeInstitution = true,
  includeSignature = true,
}: SlideFooterProps) {
  return (
    <footer
      className={`w-full pt-4 pb-14 lg:pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm ${
        dark ? 'text-[#D6EEDD]/80' : 'text-[#808080]'
      }`}
    >
      {includeInstitution ? (
        <span className="font-normal tracking-normal">{INSTITUTION_NAME}</span>
      ) : (
        <span />
      )}
      {includeSignature && (
        <span className={`font-medium ${dark ? 'text-[#F5FFF8]' : 'text-[#282D29]'}`}>
          {FOOTER_SIGNATURE}
        </span>
      )}
    </footer>
  );
}

interface SlideNavControlsProps {
  activeSlide: number;
  totalSlides: number;
  onSelectSlide: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  isDarkSlide: boolean;
}

export function SlideNavControls({
  activeSlide,
  totalSlides,
  onSelectSlide,
  onPrev,
  onNext,
  isDarkSlide,
}: SlideNavControlsProps) {
  return (
    <>
      {/* Desktop right-edge navigation rail */}
      <nav
        aria-label="Navegação dos slides"
        className={`hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2 p-2 rounded-[16px] border backdrop-blur-md transition-colors duration-200 ${
          isDarkSlide
            ? 'bg-[#202923]/85 border-[#D6EEDD]/25 text-[#F5FFF8]'
            : 'bg-white/90 border-[#D6EEDD] text-[#202923] shadow-[0_8px_24px_rgba(214,238,221,0.45)]'
        }`}
      >
        <button
          type="button"
          onClick={onPrev}
          disabled={activeSlide === 0}
          aria-label="Slide anterior"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 disabled:opacity-30 hover:bg-[#34A853] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853]"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center gap-1.5 py-1">
          {Array.from({ length: totalSlides }, (_, idx) => {
            const isActive = idx === activeSlide;
            const label = SLIDE_TITLES[idx] ?? `Slide ${idx + 1}`;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSlide(idx)}
                aria-label={`Ir para slide ${idx + 1}: ${label}`}
                aria-current={isActive ? 'step' : undefined}
                title={`${idx + 1}. ${label}`}
                className={`group flex items-center justify-center w-8 h-6 rounded-full text-[11px] font-semibold tabular-nums transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853] ${
                  isActive
                    ? 'bg-[#34A853] text-white'
                    : isDarkSlide
                      ? 'text-[#D6EEDD]/70 hover:text-white hover:bg-white/10'
                      : 'text-[#808080] hover:text-[#0D0D0D] hover:bg-[#D6EEDD]/50'
                }`}
              >
                {String(idx + 1).padStart(2, '0')}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={activeSlide === totalSlides - 1}
          aria-label="Próximo slide"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 disabled:opacity-30 hover:bg-[#34A853] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853]"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </nav>

      {/* Mobile compact bottom bar (well under 15% viewport height) */}
      <nav
        aria-label="Controles de slide mobile"
        className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#202923] text-[#F5FFF8] border border-[#D6EEDD]/25 shadow-[0_8px_24px_rgba(32,41,35,0.35)]"
      >
        <button
          type="button"
          onClick={onPrev}
          disabled={activeSlide === 0}
          aria-label="Slide anterior"
          className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-35 hover:bg-[#34A853] transition-colors"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
        <span className="text-xs font-semibold tabular-nums px-2 whitespace-nowrap">
          {formatSlideCounter(activeSlide, totalSlides)}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={activeSlide === totalSlides - 1}
          aria-label="Próximo slide"
          className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-35 hover:bg-[#34A853] transition-colors"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </nav>
    </>
  );
}
