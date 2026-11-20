import { FileCheck2, FileText, LayoutGrid, Terminal } from 'lucide-react';
import { useState } from 'react';
import { SLIDE_3 } from '../../data/slidesContent';
import { AiChipAssistantWireframe } from '../SlideIllustrations';

const STEP_ICONS = [LayoutGrid, FileText, FileCheck2, Terminal] as const;

export function SlideMethod() {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section
      id="slide-3"
      aria-label="Slide 3: O método para construir seu portfólio em 4 passos"
      className="relative min-h-screen lg:h-screen lg:snap-start bg-[#F5FFF8] text-[#282D29] flex flex-col justify-center px-6 sm:px-12 lg:pl-20 lg:pr-24 pt-10 pb-16 lg:py-10 overflow-x-hidden"
    >

      <div className="w-full max-w-[1200px] mx-auto my-auto py-8 space-y-8 lg:space-y-10">
        <header className="text-center max-w-4xl mx-auto">
          <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.2] tracking-[-0.015em] text-[#0D0D0D]">
            {SLIDE_3.title}
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 4-Step List with Prominent Numbering */}
          <div className="lg:col-span-7 space-y-4">
            {SLIDE_3.steps.map((item, idx) => {
              const Icon = STEP_ICONS[idx];
              const isActive = activeStep === item.step;

              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActiveStep(item.step)}
                  aria-pressed={isActive}
                  className={`w-full text-left flex items-stretch gap-4 rounded-[16px] p-4 sm:p-5 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853] ${
                    isActive
                      ? 'bg-white border-2 border-[#34A853] shadow-[0_8px_24px_rgba(52,168,83,0.14)]'
                      : 'bg-white border border-[#D6EEDD] hover:border-[#34A853]'
                  }`}
                >
                  <div
                    className={`w-12 sm:w-14 rounded-[12px] flex items-center justify-center text-xl font-bold tabular-nums shrink-0 transition-colors duration-150 ${
                      isActive
                        ? 'bg-[#34A853] text-white'
                        : 'bg-[#202923] text-[#F5FFF8]'
                    }`}
                  >
                    {item.step}
                  </div>

                  <div className="flex-1 min-w-0 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#0D0D0D]">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base leading-[1.5] text-[#282D29]">
                        {item.description}
                      </p>
                    </div>
                    <Icon
                      className={`hidden sm:block w-5 h-5 shrink-0 ${
                        isActive ? 'text-[#34A853]' : 'text-[#808080]'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right visual schematic */}
          <div className="lg:col-span-5">
            <AiChipAssistantWireframe activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}
