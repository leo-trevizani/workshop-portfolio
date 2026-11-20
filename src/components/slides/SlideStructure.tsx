import {
  Award,
  BarChart3,
  CheckSquare,
  Code2,
  Cpu,
  GraduationCap,
  HelpCircle,
  Layers,
  Linkedin,
  Mail,
  MessageSquare,
  PenTool,
  Sparkles,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { SLIDE_4 } from '../../data/slidesContent';

const CASE_ICONS = {
  desafio: HelpCircle,
  solucao: CheckSquare,
  resultado: BarChart3,
} as const;

type SectionNumber = '01' | '02' | '03' | '04' | '05';

function NeutralPortraitIllustration() {
  return (
    <div
      className="relative w-full aspect-[4/3] rounded-[14px] bg-[#D6EEDD] border border-[#34A853]/25 overflow-hidden flex items-end justify-center"
      aria-label="Ilustração neutra de retrato editorial"
    >
      {/* Subtle stipple dot texture matching presentation palette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: 'radial-gradient(#34A853 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        }}
      />

      <svg
        viewBox="0 0 260 200"
        className="relative z-10 w-[86%] h-auto max-h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="sweater-dots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.4" fill="#202923" fillOpacity="0.45" />
          </pattern>
        </defs>

        {/* Neutral rounded shoulders & crewneck sweater */}
        <path
          d="M52 200 C54 150 82 132 130 132 C178 132 206 150 208 200 Z"
          fill="#F5FFF8"
          stroke="#202923"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        <path
          d="M52 200 C54 150 82 132 130 132 C178 132 206 150 208 200 Z"
          fill="url(#sweater-dots)"
        />

        {/* Crewneck collar */}
        <path
          d="M104 134 C112 148 148 148 156 134"
          stroke="#202923"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Minimal shirt pocket */}
        <path
          d="M150 166 H174 V190 H150 Z"
          fill="#D6EEDD"
          stroke="#202923"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <line x1="150" y1="174" x2="174" y2="174" stroke="#202923" strokeWidth="3.2" />

        {/* Neck */}
        <path
          d="M118 114 V134 C118 138 142 138 142 134 V114"
          fill="#F5FFF8"
          stroke="#202923"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Ears */}
        <path
          d="M92 78 C84 78 83 94 93 96"
          fill="#F5FFF8"
          stroke="#202923"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M168 78 C176 78 177 94 167 96"
          fill="#F5FFF8"
          stroke="#202923"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Neutral head silhouette */}
        <path
          d="M94 74 C94 46 110 34 130 34 C150 34 166 46 166 74 C166 102 150 118 130 118 C110 118 94 102 94 74 Z"
          fill="#F5FFF8"
          stroke="#202923"
          strokeWidth="4.5"
        />

        {/* Minimal short/neutral sculpted hair crown */}
        <path
          d="M93 70 C92 44 108 26 130 26 C152 26 168 44 167 70 C158 56 144 49 130 49 C116 49 102 56 93 70 Z"
          fill="#202923"
        />
        <path
          d="M106 38 C118 32 142 32 154 38"
          stroke="#34A853"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Calm minimal facial features */}
        <circle cx="115" cy="78" r="3.6" fill="#202923" />
        <circle cx="145" cy="78" r="3.6" fill="#202923" />
        <path
          d="M107 68 Q115 64 122 68"
          stroke="#202923"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M138 68 Q145 64 153 68"
          stroke="#202923"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M130 78 L128 90 L133 91"
          stroke="#202923"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M119 98 Q130 106 141 98"
          stroke="#202923"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function AboutMePreview() {
  return (
    <div className="px-6 py-7 sm:px-8 sm:py-8 bg-white">
      <h4 className="text-2xl sm:text-[28px] font-bold tracking-[-0.02em] text-[#0D0D0D] mb-5 sm:mb-6">
        {SLIDE_4.aboutPreview.title}
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-7 items-center">
        <div className="sm:col-span-6">
          <NeutralPortraitIllustration />
        </div>

        <div className="sm:col-span-6 space-y-2.5">
          <h5 className="text-lg sm:text-xl font-semibold text-[#0D0D0D] tracking-[-0.01em]">
            {SLIDE_4.aboutPreview.subtitle}
          </h5>
          <p className="text-sm sm:text-[15px] leading-[1.6] text-[#282D29]">
            {SLIDE_4.aboutPreview.body}
          </p>
        </div>
      </div>
    </div>
  );
}

function StackPreview() {
  const stackCategories = [
    { icon: PenTool, label: 'Interface & UI', detail: 'Figma, Design Systems' },
    { icon: Layers, label: 'Prototipação', detail: 'Fluxos e interações' },
    { icon: Code2, label: 'Front-end', detail: 'HTML, CSS, React' },
    { icon: Cpu, label: 'Vibe-coding & IA', detail: 'PRD, Cursor, AI Studio' },
    { icon: Users, label: 'Pesquisa & UX', detail: 'Entrevistas e testes' },
    { icon: Sparkles, label: 'Entrega', detail: 'Publicação e métricas' },
  ];

  return (
    <div className="px-6 py-7 sm:px-8 sm:py-8 bg-white space-y-5">
      <div className="space-y-1.5">
        <h4 className="text-2xl font-bold tracking-[-0.02em] text-[#0D0D0D]">
          Stack e Ferramentas
        </h4>
        <p className="text-sm sm:text-[15px] leading-[1.55] text-[#282D29]">
          Mostre em blocos visuais quais ferramentas e habilidades sustentam o seu processo do rascunho ao produto no ar.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stackCategories.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-[12px] border border-[#D6EEDD] bg-[#F5FFF8] p-3.5 space-y-2"
            >
              <div className="w-8 h-8 rounded-[8px] bg-[#202923] flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#34A853]" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0D0D0D] leading-snug">
                  {item.label}
                </div>
                <div className="text-xs text-[#282D29]/80 mt-0.5">{item.detail}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AcademicPreview() {
  const milestones = [
    {
      icon: GraduationCap,
      title: 'Formação Acadêmica',
      detail: 'Curso, instituição, período e principais disciplinas ou projetos de conclusão.',
    },
    {
      icon: Award,
      title: 'Certificações e Workshops',
      detail: 'Especializações recentes, bootcamps e formações complementares relevantes.',
    },
    {
      icon: Users,
      title: 'Comunidades e Participações',
      detail: 'Palestras, mentorias, hackathons ou publicações que reforçam sua atuação.',
    },
  ];

  return (
    <div className="px-6 py-7 sm:px-8 sm:py-8 bg-white space-y-5">
      <h4 className="text-2xl font-bold tracking-[-0.02em] text-[#0D0D0D]">
        Participações e formação
      </h4>

      <div className="space-y-3">
        {milestones.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-[12px] border border-[#D6EEDD] bg-[#F5FFF8]/70 p-4"
            >
              <div className="w-10 h-10 rounded-[10px] bg-[#202923] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#34A853]" aria-hidden="true" />
              </div>
              <div className="space-y-0.5">
                <h5 className="text-base font-semibold text-[#0D0D0D]">{item.title}</h5>
                <p className="text-sm leading-[1.5] text-[#282D29]">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ContactPreview() {
  const channels = [
    { icon: Mail, label: 'E-mail profissional', value: 'nome@seudominio.com' },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/seuperfil' },
    { icon: MessageSquare, label: 'Chamada direta', value: 'Convite claro para conversa ou vaga' },
  ];

  return (
    <div className="px-6 py-7 sm:px-8 sm:py-8 bg-white space-y-5">
      <div className="space-y-1.5">
        <h4 className="text-2xl font-bold tracking-[-0.02em] text-[#0D0D0D]">
          Contato
        </h4>
        <p className="text-sm sm:text-[15px] leading-[1.55] text-[#282D29]">
          Facilite o próximo passo de recrutadores e clientes com canais diretos, atualizados e fáceis de copiar.
        </p>
      </div>

      <div className="space-y-2.5">
        {channels.map((ch) => {
          const Icon = ch.icon;
          return (
            <div
              key={ch.label}
              className="flex items-center justify-between gap-4 rounded-[12px] border border-[#D6EEDD] bg-[#F5FFF8] px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-[10px] bg-[#202923] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#34A853]" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#0D0D0D]">{ch.label}</div>
                  <div className="text-xs text-[#282D29]/80 truncate">{ch.value}</div>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#34A853] shrink-0">Acessar</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CasesPreview() {
  return (
    <div className="divide-y divide-[#D6EEDD]">
      {SLIDE_4.caseStructure.map((card, index) => {
        const Icon = CASE_ICONS[card.id];

        return (
          <div
            key={card.id}
            className="px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-5"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-11 h-11 rounded-[12px] bg-[#202923] text-[#F5FFF8] flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-5 h-5 text-[#34A853]" aria-hidden="true" />
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold tabular-nums text-[#808080]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-lg font-semibold text-[#34A853] leading-snug">
                    {card.title}
                  </h4>
                </div>
                <p className="text-sm sm:text-[15px] leading-[1.5] text-[#282D29]">
                  {card.description}
                </p>
              </div>
            </div>

            {/* Subtle web-section wireframe analogy on desktop/tablet */}
            <div
              className="hidden sm:flex w-24 h-14 rounded-[10px] border border-[#D6EEDD] bg-[#F5FFF8] p-2 shrink-0 flex-col justify-center gap-1.5"
              aria-hidden="true"
            >
              {card.id === 'desafio' && (
                <>
                  <div className="h-2 w-3/4 rounded bg-[#202923]/20" />
                  <div className="h-1.5 w-full rounded bg-[#D6EEDD]" />
                  <div className="h-1.5 w-2/3 rounded bg-[#D6EEDD]" />
                </>
              )}
              {card.id === 'solucao' && (
                <div className="grid grid-cols-2 gap-1.5 h-full items-center">
                  <div className="h-8 rounded bg-[#D6EEDD]/80" />
                  <div className="space-y-1">
                    <div className="h-1.5 w-full rounded bg-[#34A853]/45" />
                    <div className="h-1.5 w-4/5 rounded bg-[#D6EEDD]" />
                  </div>
                </div>
              )}
              {card.id === 'resultado' && (
                <div className="flex items-end justify-between gap-1 h-full pt-1 px-1">
                  <div className="w-1/3 h-3 rounded-t bg-[#D6EEDD]" />
                  <div className="w-1/3 h-5 rounded-t bg-[#34A853]/55" />
                  <div className="w-1/3 h-8 rounded-t bg-[#34A853]" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SlideStructure() {
  const [activeSectionNumber, setActiveSectionNumber] = useState<SectionNumber>('01');

  return (
    <section
      id="slide-4"
      aria-label="Slide 4: Estrutura Essencial do Portfólio"
      className="relative min-h-screen lg:h-screen lg:snap-start bg-[#F5FFF8] text-[#282D29] flex flex-col justify-center px-6 sm:px-12 lg:pl-20 lg:pr-24 pt-10 pb-16 lg:py-10 overflow-x-hidden"
    >
      <div className="w-full max-w-[1200px] mx-auto my-auto py-8 space-y-8 lg:space-y-12">
        <header className="text-center">
          <h2 className="text-[clamp(1.85rem,3.4vw,3rem)] font-semibold leading-[1.2] tracking-[-0.015em] text-[#0D0D0D]">
            {SLIDE_4.title}
          </h2>
        </header>

        {/* Visual Division: 5 Seções Obrigatórias vs Conteúdo dinâmico à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: 5 Seções Obrigatórias */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs sm:text-sm font-bold tracking-[0.08em] text-[#34A853]">
              {SLIDE_4.leftColumnHeading}
            </h3>

            <div className="space-y-3">
              {SLIDE_4.requiredSections.map((sec) => {
                const sectionId = sec.number as SectionNumber;
                const isActive = activeSectionNumber === sectionId;
                const isHighlighted = Boolean('highlighted' in sec && sec.highlighted);

                const buttonClasses = isActive
                  ? isHighlighted
                    ? 'bg-[#202923] text-[#F5FFF8] border border-[#202923] shadow-[0_10px_28px_rgba(32,41,35,0.28)]'
                    : 'bg-[#34A853] text-white border border-[#34A853] shadow-[0_8px_24px_rgba(52,168,83,0.22)]'
                  : isHighlighted
                    ? 'bg-white text-[#34A853] border border-[#34A853]/65 hover:border-[#34A853] hover:bg-[#D6EEDD]/20'
                    : 'bg-white text-[#0D0D0D] border border-[#D6EEDD] hover:border-[#34A853]';

                const badgeClasses = isActive
                  ? isHighlighted
                    ? 'bg-[#34A853] text-white'
                    : 'bg-white text-[#34A853]'
                  : isHighlighted
                    ? 'bg-[#D6EEDD]/75 text-[#34A853]'
                    : 'bg-[#D6EEDD]/65 text-[#202923]';

                return (
                  <button
                    key={sec.number}
                    type="button"
                    onClick={() => setActiveSectionNumber(sectionId)}
                    aria-pressed={isActive}
                    className={`w-full text-left flex items-center gap-4 rounded-[16px] p-3.5 sm:p-4 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34A853] ${buttonClasses}`}
                  >
                    <span
                      className={`w-9 h-9 rounded-[10px] flex items-center justify-center text-sm font-bold tabular-nums shrink-0 ${badgeClasses}`}
                    >
                      {sec.number}
                    </span>
                    <span
                      className={`text-base sm:text-lg leading-snug ${
                        isHighlighted ? 'font-semibold' : 'font-medium'
                      }`}
                    >
                      {sec.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Estrutura da seção selecionada */}
          <div className="lg:col-span-7 space-y-4 lg:pl-6 lg:border-l lg:border-[#D6EEDD]">
            <h3 className="text-xs sm:text-sm font-bold tracking-[0.08em] text-[#34A853]">
              {SLIDE_4.sectionHeadings[activeSectionNumber]}
            </h3>

            <div
              className={`rounded-[16px] bg-white overflow-hidden transition-all duration-150 ${
                activeSectionNumber === '03'
                  ? 'border border-[#202923]/60 shadow-[0_10px_28px_rgba(32,41,35,0.12)]'
                  : 'border border-[#34A853]/55 shadow-[0_8px_24px_rgba(214,238,221,0.55)]'
              }`}
            >
              {/* Web-page browser frame bar */}
              <div
                className="px-4 py-2.5 bg-[#F5FFF8] border-b border-[#D6EEDD] flex items-center justify-between gap-4"
                aria-hidden="true"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D6EEDD]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D6EEDD]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D6EEDD]" />
                </div>
                <div className="h-4 w-40 sm:w-52 rounded-[6px] bg-white border border-[#D6EEDD]" />
                <div className="w-8" />
              </div>

              {activeSectionNumber === '01' && <AboutMePreview />}
              {activeSectionNumber === '02' && <StackPreview />}
              {activeSectionNumber === '03' && <CasesPreview />}
              {activeSectionNumber === '04' && <AcademicPreview />}
              {activeSectionNumber === '05' && <ContactPreview />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
