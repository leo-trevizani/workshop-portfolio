import { ArrowDown, Mail } from 'lucide-react';
import { SLIDE_1 } from '../../data/slidesContent';
import { ShaderReveal } from '../ShaderReveal';
import { SlideFooter, UbiquaFlowerMark } from '../SlideChrome';

interface SlideCoverProps {
  onNext: () => void;
}

export function SlideCover({ onNext }: SlideCoverProps) {
  return (
    <section
      id="slide-1"
      aria-label="Slide 1: Workshop de Portfólio"
      className="relative min-h-screen lg:h-screen lg:snap-start bg-[#202923] text-[#F5FFF8] flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-8 overflow-x-hidden"
    >
      {/* Top row matching PDF Slide 1 */}
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between">
        <span className="text-sm font-medium text-[#D6EEDD]/85">{SLIDE_1.author}</span>
        <UbiquaFlowerMark className="w-7 h-7 text-[#F5FFF8]" />
      </div>

      {/* Main split hero */}
      <div className="w-full max-w-[1200px] mx-auto my-auto py-8 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] gap-10 lg:gap-12 xl:gap-14 items-center lg:pr-4">
        <div className="space-y-6">
          <div className="inline-block border-b-2 border-[#34A853] pb-1.5">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#D6EEDD]">
              {SLIDE_1.kicker}
            </span>
          </div>

          <h1 className="text-[clamp(2.75rem,5.2vw,4.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
            {SLIDE_1.titleLine1}
            <br />
            {SLIDE_1.titleLine2}
          </h1>

          <p className="text-2xl sm:text-[32px] font-medium leading-[1.25] tracking-[-0.01em] text-[#D6EEDD]">
            {SLIDE_1.subtitleLine1}
            <br />
            {SLIDE_1.subtitleLine2}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#34A853] text-white text-sm sm:text-base font-medium hover:bg-[#2d9448] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap shrink-0"
            >
              <span>Avançar</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <a
              href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7486196353698578432"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#D6EEDD]/65 bg-transparent text-[#F5FFF8] text-sm sm:text-base font-medium hover:bg-[#D6EEDD]/15 hover:border-[#34A853] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853] whitespace-nowrap shrink-0"
            >
              <Mail className="w-4 h-4 text-[#34A853]" aria-hidden="true" />
              <span>Assine a newsletter</span>
            </a>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <div className="w-full overflow-hidden rounded-[16px] border border-[#D6EEDD]/25 bg-[#28342C]">
            <ShaderReveal
              frontImage={`${import.meta.env.BASE_URL}src/assets/images/hero_wireframe_dark_1795468572470.jpg`}
              backImage={`${import.meta.env.BASE_URL}assets/aistudio/image_0a08c72c.png`}
              alt="Wireframe dark mode com revelação líquida do portfólio ao passar o cursor"
              mouseForce={45}
              cursorSize={240}
              resolution={0.5}
              isViscous
              revealSoftness={0.32}
              revealStrength={1.0}
              className="w-full aspect-[1376/768]"
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto">
        <SlideFooter dark includeInstitution includeSignature={false} />
      </div>
    </section>
  );
}
