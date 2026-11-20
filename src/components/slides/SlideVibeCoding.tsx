import { useState } from 'react';
import { SLIDE_6 } from '../../data/slidesContent';
import { DesignResourcesList, VibeCodingToolsGrid } from '../SlideIllustrations';

export function SlideVibeCoding() {
  const [activeNote, setActiveNote] = useState<'inicial' | 'ajustes'>('inicial');

  return (
    <section
      id="slide-6"
      aria-label="Slide 6: Último passo: vibe-coding"
      className="relative min-h-screen lg:h-screen lg:snap-start bg-[#F5FFF8] text-[#282D29] grid grid-cols-1 lg:grid-cols-12 overflow-x-clip"
    >
      {/* Left Content Area */}
      <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 lg:pl-20 lg:pr-12 pt-10 pb-8 lg:py-10">

        <div className="my-auto py-8 space-y-8 max-w-2xl">
          <header className="space-y-4">
            <h2 className="text-[clamp(1.85rem,3.4vw,3rem)] font-semibold leading-[1.15] tracking-[-0.015em] text-[#0D0D0D]">
              {SLIDE_6.title}
            </h2>
            <p className="text-base sm:text-lg leading-[1.6] text-[#282D29]">
              {SLIDE_6.leadBeforeBold}
              <strong className="font-semibold text-[#0D0D0D]">{SLIDE_6.leadBold}</strong>
              {SLIDE_6.leadAfterBold}
            </p>
          </header>

          <div className="space-y-4">
            {SLIDE_6.notes.map((note) => {
              const isActive = activeNote === note.id;
              return (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => setActiveNote(note.id)}
                  aria-pressed={isActive}
                  className={`w-full text-left rounded-[16px] p-6 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853] ${
                    isActive
                      ? 'bg-white border-2 border-[#34A853] shadow-[0_8px_24px_rgba(52,168,83,0.14)]'
                      : 'bg-white border border-[#D6EEDD] hover:border-[#34A853]'
                  }`}
                >
                  <h3 className="text-lg font-semibold text-[#34A853] mb-2">{note.title}</h3>
                  <p className="text-base leading-[1.6] text-[#282D29]">{note.description}</p>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Right Tool Showcase Panel */}
      <div className="lg:col-span-5 bg-[#202923] text-[#F5FFF8] flex flex-col justify-center px-6 sm:px-10 lg:pr-24 pt-8 pb-16 lg:py-10">
        <div className="my-auto py-8">
          {activeNote === 'ajustes' ? <DesignResourcesList /> : <VibeCodingToolsGrid />}
        </div>
      </div>
    </section>
  );
}
