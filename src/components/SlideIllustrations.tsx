import { useState } from 'react';
import {
  Award,
  Brush,
  Check,
  Copy,
  FileCheck2,
  Globe,
  Image as ImageIcon,
  LayoutGrid,
  Palette,
} from 'lucide-react';
import { SLIDE_3, SLIDE_6, type DesignResourceItem } from '../data/slidesContent';

export function PortfolioSatchelWireframe() {
  return (
    <div
      className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-[16px] border border-[#D6EEDD]/25 bg-[#28342C] p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_24px_rgba(32,41,35,0.4)]"
      aria-label="Ilustração wireframe de pasta de portfólio com pintura, paleta de cores e certificado"
    >
      {/* Top wireframe contents emerging from satchel */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 items-end px-2 sm:px-4">
        {/* Landscape canvas wireframe */}
        <div className="aspect-[4/3] rounded-[12px] border border-[#D6EEDD]/35 bg-[#202923] p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#34A853]">
            <ImageIcon className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-[#D6EEDD]/40" />
          </div>
          <svg viewBox="0 0 120 60" className="w-full h-10" aria-hidden="true">
            <path
              d="M6 52 L34 24 L56 42 L80 18 L114 52 Z"
              fill="#34A853"
              fillOpacity="0.24"
              stroke="#D6EEDD"
              strokeOpacity="0.55"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Palette & brush wireframe */}
        <div className="aspect-square rounded-[12px] border border-[#D6EEDD]/35 bg-[#202923] p-3 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2 text-[#D6EEDD]">
            <Palette className="w-6 h-6 text-[#34A853]" />
            <Brush className="w-5 h-5 text-[#F5FFF8]" />
          </div>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#D6EEDD]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#808080]" />
          </div>
        </div>

        {/* Certificate wireframe */}
        <div className="aspect-[3/4] rounded-[12px] border border-[#D6EEDD]/35 bg-[#202923] p-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="h-1.5 w-3/4 rounded bg-[#D6EEDD]/40" />
            <div className="h-1.5 w-full rounded bg-[#D6EEDD]/25" />
            <div className="h-1.5 w-2/3 rounded bg-[#D6EEDD]/25" />
          </div>
          <div className="flex justify-end">
            <Award className="w-5 h-5 text-[#34A853]" />
          </div>
        </div>
      </div>

      {/* Satchel base wireframe */}
      <div className="relative mt-4 rounded-[16px] border border-[#D6EEDD]/35 bg-[#202923] p-5 flex items-center justify-between">
        <div className="space-y-2 w-2/3">
          <div className="h-2 w-1/2 rounded bg-[#D6EEDD]/30" />
          <div className="h-2 w-3/4 rounded bg-[#D6EEDD]/15" />
        </div>
        <div className="w-11 h-11 rounded-[12px] border-2 border-[#34A853] bg-[#34A853]/15 flex items-center justify-center">
          <div className="w-3.5 h-5 rounded-sm border border-[#F5FFF8]/80" />
        </div>
      </div>
    </div>
  );
}

interface AiSchematicProps {
  activeStep: number;
}

async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback below for restricted iframe contexts
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

function CopyableMarkdownBox({
  label,
  markdown,
}: {
  label: string;
  markdown: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyTextToClipboard(markdown);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="rounded-[16px] border border-[#D6EEDD] bg-white p-4 sm:p-5 shadow-[0_8px_24px_rgba(214,238,221,0.35)] space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-[#0D0D0D] truncate">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copiar ${label}`}
          className={`inline-flex items-center gap-1.5 rounded-[10px] px-3 py-1.5 text-xs font-semibold transition-all duration-150 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853] ${
            copied
              ? 'bg-[#34A853] text-white border border-[#34A853]'
              : 'bg-[#F5FFF8] text-[#202923] border border-[#D6EEDD] hover:border-[#34A853] hover:text-[#34A853]'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Long-text box with clean multi-line truncation */}
      <div
        className="rounded-[12px] border border-[#D6EEDD] bg-[#F5FFF8] px-3.5 py-3 text-xs sm:text-[13px] font-mono leading-[1.55] text-[#282D29] overflow-hidden"
        title={markdown}
      >
        <p className="line-clamp-4 whitespace-pre-line break-words">{markdown}</p>
      </div>
    </div>
  );
}

export function AiChipAssistantWireframe({ activeStep }: AiSchematicProps) {
  if (activeStep === 2) {
    return (
      <div
        className="w-full space-y-4"
        aria-label="Estruturas Markdown para o Passo 2: PRD como Prompt"
      >
        {SLIDE_3.prdMarkdownTemplates.map((tpl) => (
          <CopyableMarkdownBox key={tpl.id} label={tpl.label} markdown={tpl.markdown} />
        ))}
      </div>
    );
  }

  if (activeStep === 1) {
    const sections = ['Sobre mim', 'Stack e Ferramentas', 'Cases de Sucesso', 'Formação', 'Contato'];
    return (
      <div
        className="w-full rounded-[16px] border border-[#D6EEDD] bg-white p-6 shadow-[0_8px_24px_rgba(214,238,221,0.4)] space-y-5"
        aria-label="Esquema do Passo 1: Estrutura das cinco seções"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-[#202923] flex items-center justify-center">
              <LayoutGrid className="w-5 h-5 text-[#34A853]" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-[0.06em] text-[#34A853]">PASSO 01</div>
              <div className="text-base font-semibold text-[#0D0D0D]">Mapa de Seções</div>
            </div>
          </div>
          <span className="text-xs font-semibold tabular-nums text-[#808080]">5 blocos</span>
        </div>

        <div className="space-y-2">
          {sections.map((sec, idx) => (
            <div
              key={sec}
              className="flex items-center gap-3 rounded-[12px] border border-[#D6EEDD] bg-[#F5FFF8] px-3.5 py-2.5"
            >
              <span className="text-xs font-bold tabular-nums text-[#34A853]">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium text-[#0D0D0D]">{sec}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeStep === 3) {
    return (
      <div
        className="w-full rounded-[16px] border border-[#D6EEDD] bg-white p-6 shadow-[0_8px_24px_rgba(214,238,221,0.4)] space-y-5"
        aria-label="Esquema do Passo 3: Revisão com currículo ou LinkedIn"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[12px] bg-[#202923] flex items-center justify-center">
            <FileCheck2 className="w-5 h-5 text-[#34A853]" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xs font-bold tracking-[0.06em] text-[#34A853]">PASSO 03</div>
            <div className="text-base font-semibold text-[#0D0D0D]">
              Curadoria com Currículo ou LinkedIn
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-[12px] border border-[#D6EEDD] bg-[#F5FFF8]/70 p-3.5 space-y-1">
            <div className="text-xs font-semibold text-[#808080]">Antes</div>
            <div className="text-sm text-[#282D29] line-through opacity-75">
              Projeto genérico com texto fictício
            </div>
          </div>

          <div className="rounded-[12px] border border-[#34A853]/60 bg-[#F5FFF8] p-3.5 space-y-1">
            <div className="text-xs font-semibold text-[#34A853]">Depois do seu CV ou LinkedIn</div>
            <div className="text-sm font-medium text-[#0D0D0D]">
              Cases reais, contexto do desafio e resultados com números
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-[16px] border border-[#D6EEDD] bg-[#202923] p-6 shadow-[0_8px_24px_rgba(32,41,35,0.22)] flex items-center justify-center"
      aria-label="Miniatura das ferramentas de vibe-coding do Passo 4"
    >
      <VibeCodingToolsGrid interactive={false} compact />
    </div>
  );
}

interface VibeCodingToolTileProps {
  name: string;
  href: string;
  src: string;
  compactPadding?: boolean;
  interactive: boolean;
  compact: boolean;
}

function VibeCodingToolTile({
  name,
  href,
  src,
  compactPadding = false,
  interactive,
  compact,
}: VibeCodingToolTileProps) {
  const sizeClass = compact ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-28 h-28 sm:w-32 sm:h-32';
  const paddingClass = compact
    ? compactPadding
      ? 'p-3'
      : 'p-3.5'
    : compactPadding
      ? 'p-4'
      : 'p-5';
  const motionClass = interactive ? 'transition-transform duration-150 hover:-translate-y-0.5' : '';

  return (
    <div
      className={`${sizeClass} ${paddingClass} ${motionClass} rounded-[16px] bg-white border border-[#D6EEDD] shadow-[0_8px_24px_rgba(32,41,35,0.28)] flex items-center justify-center`}
    >
      {interactive ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="w-full h-full flex items-center justify-center rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853]"
        >
          <img
            src={src}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        </a>
      ) : (
        <div className="w-full h-full flex items-center justify-center rounded-[12px]">
          <img
            src={src}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}

interface VibeCodingToolsGridProps {
  interactive?: boolean;
  compact?: boolean;
}

export function VibeCodingToolsGrid({
  interactive = true,
  compact = false,
}: VibeCodingToolsGridProps) {
  const gapClass = compact ? 'gap-3.5' : 'gap-5';

  return (
    <div
      className={`w-full max-w-[340px] mx-auto flex flex-col items-center ${gapClass}`}
      aria-label="Ferramentas de vibe-coding"
    >
      <VibeCodingToolTile
        name="Google AI Studio"
        href="https://aistudio.google.com/apps"
        src="/assets/aistudio/image_7fe11fb0.png"
        interactive={interactive}
        compact={compact}
      />

      <div className={`grid grid-cols-2 ${gapClass}`}>
        <VibeCodingToolTile
          name="Lovable"
          href="https://lovable.dev/pt-br/"
          src="/assets/aistudio/image_c0ad7bf8.png"
          interactive={interactive}
          compact={compact}
        />
        <VibeCodingToolTile
          name="Cursor"
          href="https://cursor.com/pt-BR/home"
          src="/assets/aistudio/image_eb35fab7.png"
          interactive={interactive}
          compact={compact}
        />
      </div>

      <div className={`grid grid-cols-2 ${gapClass}`}>
        <VibeCodingToolTile
          name="v0"
          href="https://v0.app/"
          src="/assets/aistudio/image_afb7b2df.png"
          compactPadding
          interactive={interactive}
          compact={compact}
        />
        <VibeCodingToolTile
          name="Bolt"
          href="https://bolt.new/"
          src="/assets/aistudio/image_b91f6855.png"
          compactPadding
          interactive={interactive}
          compact={compact}
        />
      </div>
    </div>
  );
}

function ResourceFavicon({ domain }: { domain: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-10 h-10 rounded-[12px] bg-[#F5FFF8] border border-[#D6EEDD] flex items-center justify-center shrink-0">
      {hasError ? (
        <Globe className="w-5 h-5 text-[#34A853]" aria-hidden="true" />
      ) : (
        <img
          src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`}
          alt=""
          width={22}
          height={22}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-[22px] h-[22px] rounded-[4px] object-contain"
        />
      )}
    </div>
  );
}

function DesignResourceBanner({ resource }: { resource: DesignResourceItem }) {
  const tooltipId = `tooltip-${resource.id}`;

  return (
    <div className="relative group w-full">
      {/* Upward hover/focus tooltip with downward pointer arrow */}
      <div
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-30 w-[min(320px,calc(100vw-3rem))] rounded-[12px] border border-[#D6EEDD] bg-[#F5FFF8] px-3.5 py-2.5 text-center text-xs sm:text-[13px] font-medium leading-[1.45] text-[#0D0D0D] shadow-[0_12px_28px_rgba(13,13,13,0.35)] opacity-0 translate-y-1 transition-all duration-150 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
      >
        <span>{resource.description}</span>
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#F5FFF8] border-r border-b border-[#D6EEDD]"
        />
      </div>

      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={tooltipId}
        className="flex items-center gap-4 w-full rounded-[16px] bg-white hover:bg-[#F5FFF8] border border-[#D6EEDD] hover:border-[#34A853] px-5 py-4 sm:px-6 sm:py-[18px] shadow-[0_8px_24px_rgba(32,41,35,0.28)] transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853]"
      >
        <ResourceFavicon domain={resource.domain} />
        <span className="flex flex-col min-w-0">
          <span className="text-base sm:text-[17px] font-semibold leading-tight tracking-[-0.01em] text-[#0D0D0D] truncate">
            {resource.title}
          </span>
          <span className="text-[13px] sm:text-sm font-medium leading-tight text-[#282D29]/75 truncate mt-0.5">
            {resource.domain}
          </span>
        </span>
      </a>
    </div>
  );
}

export function DesignResourcesList() {
  return (
    <div
      className="w-full max-w-[380px] mx-auto flex flex-col gap-4 pt-8 sm:pt-4"
      aria-label="Referências de DESIGN.md e componentes"
    >
      {SLIDE_6.designResources.map((resource) => (
        <DesignResourceBanner key={resource.id} resource={resource} />
      ))}
    </div>
  );
}
