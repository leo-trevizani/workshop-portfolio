import { CheckCircle2, FileCheck2, FileWarning, MinusCircle } from 'lucide-react';
import { useState } from 'react';
import { SLIDE_5 } from '../../data/slidesContent';

export function SlidePrdComparison() {
  const [focusedSide, setFocusedSide] = useState<'generico' | 'real'>('real');

  return (
    <section
      id="slide-5"
      aria-label="Slide 5: Como enriquecer o seu PRD"
      className="relative min-h-screen lg:h-screen lg:snap-start bg-[#F5FFF8] text-[#282D29] flex flex-col justify-center px-6 sm:px-12 lg:pl-20 lg:pr-24 pt-10 pb-16 lg:py-10 overflow-x-hidden"
    >

      <div className="w-full max-w-[1200px] mx-auto my-auto py-8 space-y-10 lg:space-y-12">
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-[clamp(1.85rem,3.4vw,3rem)] font-semibold leading-[1.2] tracking-[-0.015em] text-[#0D0D0D]">
            {SLIDE_5.title}
          </h2>
          <p className="text-base sm:text-lg leading-[1.6] text-[#282D29]">{SLIDE_5.subtitle}</p>
        </header>

        {/* Clear Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-5xl mx-auto">
          {SLIDE_5.comparisons.map((card) => {
            const isReal = card.id === 'real';
            const isFocused = focusedSide === card.id;

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setFocusedSide(card.id)}
                aria-pressed={isFocused}
                className={`text-left rounded-[16px] p-8 sm:p-10 flex flex-col justify-between gap-6 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853] ${
                  isReal
                    ? isFocused
                      ? 'bg-white border-2 border-[#34A853] shadow-[0_8px_24px_rgba(52,168,83,0.18)]'
                      : 'bg-white border-2 border-[#34A853]/65 shadow-[0_8px_24px_rgba(214,238,221,0.45)]'
                    : isFocused
                      ? 'bg-white border-2 border-[#808080] shadow-[0_8px_24px_rgba(32,41,35,0.08)]'
                      : 'bg-white/80 border border-[#D6EEDD] opacity-90 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div
                    className={`w-11 h-11 rounded-[12px] flex items-center justify-center ${
                      isReal ? 'bg-[#34A853] text-white' : 'bg-[#F5FFF8] text-[#808080] border border-[#D6EEDD]'
                    }`}
                  >
                    {isReal ? (
                      <FileCheck2 className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <FileWarning className="w-5 h-5" aria-hidden="true" />
                    )}
                  </div>

                  {isReal ? (
                    <CheckCircle2 className="w-5 h-5 text-[#34A853]" aria-hidden="true" />
                  ) : (
                    <MinusCircle className="w-5 h-5 text-[#808080]" aria-hidden="true" />
                  )}
                </div>

                <div className="space-y-4 text-center sm:text-left">
                  <h3
                    className={`text-2xl font-semibold ${
                      isReal ? 'text-[#34A853]' : 'text-[#808080]'
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p className="text-base sm:text-lg leading-[1.6] text-[#282D29]">
                    {card.description}
                  </p>
                </div>

                {/* Wireframe visual indicator comparing generic vs real structured output */}
                <div className="pt-2 space-y-2" aria-hidden="true">
                  <div
                    className={`h-2 rounded-full ${
                      isReal ? 'w-5/6 bg-[#34A853]/35' : 'w-2/3 bg-[#808080]/20'
                    }`}
                  />
                  <div
                    className={`h-2 rounded-full ${
                      isReal ? 'w-full bg-[#34A853]/20' : 'w-1/2 bg-[#808080]/15'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
