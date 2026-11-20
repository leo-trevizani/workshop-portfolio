export const TOTAL_SLIDES = 7;

export function clampSlideIndex(index: number, total: number = TOTAL_SLIDES): number {
  if (!Number.isFinite(index) || total <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(total - 1, Math.trunc(index)));
}

export function getNextSlideIndex(currentIndex: number, total: number = TOTAL_SLIDES): number {
  return clampSlideIndex(currentIndex + 1, total);
}

export function getPrevSlideIndex(currentIndex: number, total: number = TOTAL_SLIDES): number {
  return clampSlideIndex(currentIndex - 1, total);
}

export function resolveSlideIndexFromKey(
  key: string,
  currentIndex: number,
  total: number = TOTAL_SLIDES
): number | null {
  switch (key) {
    case 'ArrowDown':
    case 'ArrowRight':
    case 'PageDown':
      return getNextSlideIndex(currentIndex, total);
    case 'ArrowUp':
    case 'ArrowLeft':
    case 'PageUp':
      return getPrevSlideIndex(currentIndex, total);
    case 'Home':
      return 0;
    case 'End':
      return clampSlideIndex(total - 1, total);
    default: {
      const numeric = Number(key);
      if (/^[1-9]$/.test(key) && numeric >= 1 && numeric <= total) {
        return numeric - 1;
      }
      return null;
    }
  }
}

export function computeActiveSlideFromScroll(
  scrollTop: number,
  sectionOffsets: readonly number[],
  viewportHeight: number
): number {
  if (sectionOffsets.length === 0) {
    return 0;
  }
  const probeY = scrollTop + viewportHeight * 0.4;
  let active = 0;
  for (let i = 0; i < sectionOffsets.length; i += 1) {
    if (sectionOffsets[i] <= probeY) {
      active = i;
    } else {
      break;
    }
  }
  return clampSlideIndex(active, sectionOffsets.length);
}

export function formatSlideCounter(index: number, total: number = TOTAL_SLIDES): string {
  const safeIndex = clampSlideIndex(index, total) + 1;
  return `${String(safeIndex).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}
