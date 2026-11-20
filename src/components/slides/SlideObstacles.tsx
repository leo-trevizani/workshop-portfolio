import { Compass, Hourglass, Laptop, Search } from 'lucide-react';
import { useState } from 'react';
import { SLIDE_2 } from '../../data/slidesContent';

const OBSTACLE_ICONS = {
  perfeccionismo: Search,
  'falta-de-tempo': Hourglass,
  'barreira-tecnica': Laptop,
  'falta-de-direcao': Compass,
} as const;

export function SlideObstacles() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section
      id="slide-2"
      aria-label="Slide 2: Os 4 Obstáculos do Portfólio"
      className="relative min-h-screen lg:h-screen lg:snap-start bg-[#F5FFF8] text-[#282D29] flex flex-col justify-center px-6 sm:px-12 lg:pl-20 lg:pr-24 pt-10 pb-16 lg:py-10 overflow-x-hidden"
    >
      {/* Main Content */}
      <div className="w-full max-w-[1200px] mx-auto my-auto py-8 space-y-10 lg:space-y-14">
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-[clamp(1.85rem,3.4vw,3rem)] font-semibold leading-[1.2] tracking-[-0.015em] text-[#0D0D0D]">
            {SLIDE_2.title}
          </h2>
          <p className="text-base sm:text-lg leading-[1.6] text-[#282D29]">{SLIDE_2.subtitle}</p>
        </header>

        {/* 4 Columns Grid on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14 lg:gap-6 items-stretch pt-8">
          {SLIDE_2.obstacles.map((item) => {
            const Icon = OBSTACLE_ICONS[item.id as keyof typeof OBSTACLE_ICONS];
            const isSelected = selectedId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(isSelected ? null : item.id)}
                aria-pressed={isSelected}
                className={`group relative text-center rounded-[16px] px-6 pt-12 pb-8 flex flex-col items-center justify-start transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853] ${
                  isSelected
                    ? 'bg-white border-2 border-[#34A853] shadow-[0_8px_24px_rgba(52,168,83,0.16)] -translate-y-0.5'
                    : 'bg-white border border-[#D6EEDD] shadow-[0_8px_24px_rgba(214,238,221,0.4)] hover:border-[#34A853]'
                }`}
              >
                <div
                  className={`-mt-18 mb-5 w-16 h-16 rounded-[16px] flex items-center justify-center border transition-colors duration-150 ${
                    isSelected
                      ? 'bg-[#34A853] text-white border-[#34A853]'
                      : 'bg-[#F5FFF8] text-[#202923] border-[#D6EEDD] group-hover:bg-[#34A853] group-hover:text-white group-hover:border-[#34A853]'
                  }`}
                >
                  <Icon className="w-7 h-7 stroke-[1.75]" aria-hidden="true" />
                </div>

                <h3 className="text-lg font-semibold text-[#34A853] mb-3">{item.title}</h3>
                <p className="text-[15px] sm:text-base leading-[1.6] text-[#282D29]">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
