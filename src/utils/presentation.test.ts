import test from 'node:test';
import assert from 'node:assert/strict';
import {
  TOTAL_SLIDES,
  clampSlideIndex,
  computeActiveSlideFromScroll,
  formatSlideCounter,
  getNextSlideIndex,
  getPrevSlideIndex,
  resolveSlideIndexFromKey,
} from './presentation';
import {
  FOOTER_SIGNATURE,
  INSTITUTION_NAME,
  SLIDE_1,
  SLIDE_2,
  SLIDE_3,
  SLIDE_4,
  SLIDE_5,
  SLIDE_6,
  SLIDE_7,
} from '../data/slidesContent';

test('clampSlideIndex bounds indices safely within total slides', () => {
  assert.equal(clampSlideIndex(-3), 0);
  assert.equal(clampSlideIndex(0), 0);
  assert.equal(clampSlideIndex(6), 6);
  assert.equal(clampSlideIndex(99), 6);
  assert.equal(clampSlideIndex(Number.NaN), 0);
});

test('next and prev slide helpers respect boundaries', () => {
  assert.equal(getPrevSlideIndex(0), 0);
  assert.equal(getPrevSlideIndex(3), 2);
  assert.equal(getNextSlideIndex(3), 4);
  assert.equal(getNextSlideIndex(TOTAL_SLIDES - 1), TOTAL_SLIDES - 1);
});

test('resolveSlideIndexFromKey handles arrows, Home, End, and 1-7 keys', () => {
  assert.equal(resolveSlideIndexFromKey('ArrowDown', 1), 2);
  assert.equal(resolveSlideIndexFromKey('ArrowRight', 1), 2);
  assert.equal(resolveSlideIndexFromKey('PageDown', 5), 6);
  assert.equal(resolveSlideIndexFromKey('ArrowUp', 2), 1);
  assert.equal(resolveSlideIndexFromKey('ArrowLeft', 0), 0);
  assert.equal(resolveSlideIndexFromKey('Home', 4), 0);
  assert.equal(resolveSlideIndexFromKey('End', 0), 6);
  assert.equal(resolveSlideIndexFromKey('4', 0), 3);
  assert.equal(resolveSlideIndexFromKey('9', 0), null);
  assert.equal(resolveSlideIndexFromKey('a', 0), null);
});

test('computeActiveSlideFromScroll resolves the visible section index', () => {
  const offsets = [0, 900, 1800, 2700, 3600, 4500, 5400];
  assert.equal(computeActiveSlideFromScroll(0, offsets, 900), 0);
  assert.equal(computeActiveSlideFromScroll(850, offsets, 900), 1);
  assert.equal(computeActiveSlideFromScroll(2600, offsets, 900), 3);
  assert.equal(computeActiveSlideFromScroll(5300, offsets, 900), 6);
});

test('formatSlideCounter formats two-digit slide progress', () => {
  assert.equal(formatSlideCounter(0), '01 / 07');
  assert.equal(formatSlideCounter(6), '07 / 07');
});

test('verbatim slide content preserves required structure and footer signature', () => {
  assert.equal(FOOTER_SIGNATURE, '© Leo Trevizani');
  assert.equal(INSTITUTION_NAME, 'Workshop de Portfólio | Cola no Grid');
  assert.equal(SLIDE_1.kicker, 'DESIGN LAB');
  assert.equal(SLIDE_2.obstacles.length, 4);
  assert.equal(SLIDE_3.steps.length, 4);
  assert.equal(SLIDE_3.prdMarkdownTemplates.length, 2);
  assert.ok(
    SLIDE_3.prdMarkdownTemplates[0].markdown.startsWith('# Prompt para criação de PRD de portfólio'),
  );
  assert.ok(
    SLIDE_3.prdMarkdownTemplates[1].markdown.startsWith(
      '# Prompt para incluir dados profissionais no PRD de portfólio',
    ),
  );
  assert.equal(SLIDE_4.requiredSections.length, 5);
  assert.equal(SLIDE_4.caseStructure.length, 3);
  assert.equal(Object.keys(SLIDE_4.sectionHeadings).length, 5);
  assert.equal(SLIDE_4.aboutPreview.title, 'Sobre mim');
  assert.equal(SLIDE_4.aboutPreview.subtitle, 'Apresentação');
  assert.equal(SLIDE_5.comparisons.length, 2);
  assert.equal(SLIDE_6.notes.length, 2);
  assert.equal(SLIDE_6.designResources.length, 4);
  assert.deepEqual(
    SLIDE_6.designResources.map((r) => [r.title, r.domain, r.url]),
    [
      ['Refero Styles', 'styles.refero.design', 'https://styles.refero.design/'],
      ['DesignMD', 'designmd.me', 'https://designmd.me/'],
      ['DESIGN.md', 'designmd.ai', 'https://designmd.ai/'],
      ['React Bits', 'reactbits.dev', 'https://reactbits.dev/'],
    ],
  );
  assert.equal(
    SLIDE_7.communityCtaUrl,
    'https://chat.whatsapp.com/Jm8tG0qTiNHKxZcLR0FUSN?utm_source=DesignLabs&utm_medium=apresentacaoHTML&utm_campaign=ColaNoGrid_DesignLabs',
  );
});
