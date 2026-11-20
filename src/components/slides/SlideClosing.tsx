import { ArrowUp, MessageCircle } from 'lucide-react';
import { SLIDE_7 } from '../../data/slidesContent';
import { SlideFooter, UbiquaFlowerMark } from '../SlideChrome';

interface SlideClosingProps {
  onBackToStart: () => void;
}

export function SlideClosing({ onBackToStart }: SlideClosingProps) {
  return (
    <section
      id="slide-7"
      aria-label="Slide 7: Encerramento"
      className="relative min-h-screen lg:h-screen lg:snap-start bg-[#202923] text-[#F5FFF8] flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-8 overflow-x-hidden"
    >
      <div className="w-full max-w-[1200px] mx-auto" />

      <div className="my-auto flex flex-col items-center justify-center gap-10 py-12">
        <UbiquaFlowerMark className="w-36 h-36 sm:w-44 sm:h-44 text-[#F5FFF8]" />

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onBackToStart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#34A853] text-white text-sm font-medium hover:bg-[#2d9448] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap shrink-0"
          >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
            <span>{SLIDE_7.backToStartLabel}</span>
          </button>

          <a
            href={SLIDE_7.communityCtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#D6EEDD]/65 bg-transparent text-[#F5FFF8] text-sm font-medium hover:bg-[#D6EEDD]/15 hover:border-[#34A853] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853] whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#34A853]" aria-hidden="true" />
            <span>{SLIDE_7.communityCtaLabel}</span>
          </a>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto">
        <SlideFooter dark includeInstitution />
      </div>
    </section>
  );
}
