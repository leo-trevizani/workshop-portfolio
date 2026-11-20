import { useCallback, useEffect, useRef, useState } from 'react';
import { SlideNavControls } from './components/SlideChrome';
import { SlideClosing } from './components/slides/SlideClosing';
import { SlideCover } from './components/slides/SlideCover';
import { SlideMethod } from './components/slides/SlideMethod';
import { SlideObstacles } from './components/slides/SlideObstacles';
import { SlidePrdComparison } from './components/slides/SlidePrdComparison';
import { SlideStructure } from './components/slides/SlideStructure';
import { SlideVibeCoding } from './components/slides/SlideVibeCoding';
import {
  TOTAL_SLIDES,
  clampSlideIndex,
  computeActiveSlideFromScroll,
  getNextSlideIndex,
  getPrevSlideIndex,
  resolveSlideIndexFromKey,
} from './utils/presentation';

export default function App() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const scrollToSlide = useCallback((index: number) => {
    const safeIndex = clampSlideIndex(index, TOTAL_SLIDES);
    const scroller = scrollerRef.current;
    const target = document.getElementById(`slide-${safeIndex + 1}`);
    if (scroller && target) {
      scroller.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      });
      setActiveSlide(safeIndex);
    }
  }, []);

  const handleScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const offsets: number[] = [];
    for (let i = 1; i <= TOTAL_SLIDES; i += 1) {
      const el = document.getElementById(`slide-${i}`);
      offsets.push(el ? el.offsetTop : 0);
    }
    const nextActive = computeActiveSlideFromScroll(
      scroller.scrollTop,
      offsets,
      scroller.clientHeight
    );
    setActiveSlide(nextActive);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      const resolved = resolveSlideIndexFromKey(event.key, activeSlide, TOTAL_SLIDES);
      if (resolved !== null) {
        event.preventDefault();
        scrollToSlide(resolved);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeSlide, scrollToSlide]);

  const isDarkSlide = activeSlide === 0 || activeSlide === TOTAL_SLIDES - 1;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#F5FFF8]">
      <SlideNavControls
        activeSlide={activeSlide}
        totalSlides={TOTAL_SLIDES}
        onSelectSlide={scrollToSlide}
        onPrev={() => scrollToSlide(getPrevSlideIndex(activeSlide, TOTAL_SLIDES))}
        onNext={() => scrollToSlide(getNextSlideIndex(activeSlide, TOTAL_SLIDES))}
        isDarkSlide={isDarkSlide}
      />

      <main
        ref={scrollerRef}
        onScroll={handleScroll}
        className="presentation-scroller h-screen w-full overflow-y-auto overflow-x-hidden lg:snap-y lg:snap-mandatory"
      >
        <SlideCover onNext={() => scrollToSlide(1)} />
        <SlideObstacles />
        <SlideMethod />
        <SlideStructure />
        <SlidePrdComparison />
        <SlideVibeCoding />
        <SlideClosing onBackToStart={() => scrollToSlide(0)} />
      </main>
    </div>
  );
}
