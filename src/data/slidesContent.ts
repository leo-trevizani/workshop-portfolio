export const FOOTER_SIGNATURE = '© Leo Trevizani';
export const INSTITUTION_NAME = 'Workshop de Portfólio | Cola no Grid';

export interface ObstacleItem {
  id: string;
  title: string;
  description: string;
}

export interface MethodStepItem {
  step: number;
  title: string;
  description: string;
}

export interface PrdMarkdownTemplate {
  id: string;
  label: string;
  markdown: string;
}

export interface RequiredSectionItem {
  number: string;
  title: string;
  highlighted?: boolean;
}

export interface CaseStructureItem {
  id: 'desafio' | 'solucao' | 'resultado';
  title: string;
  description: string;
}

export interface PrdComparisonItem {
  id: 'generico' | 'real';
  title: string;
  description: string;
  featured: boolean;
}

export interface VibeCodingNoteItem {
  id: 'inicial' | 'ajustes';
  title: string;
  description: string;
}

export interface DesignResourceItem {
  id: string;
  title: string;
  domain: string;
  url: string;
  description: string;
}

export const SLIDE_TITLES = [
  'Workshop de Portfólio',
  'Os 4 Obstáculos do Portfólio',
  'O método para construir seu portfólio em 4 passos',
  'Estrutura Essencial do Portfólio',
  'Como enriquecer o seu PRD',
  'Último passo: vibe-coding',
  'Encerramento',
] as const;

export const SLIDE_1 = {
  kicker: 'DESIGN LAB',
  titleLine1: 'Workshop de Portfólio',
  titleLine2: '',
  subtitleLine1: 'Falando a linguagem',
  subtitleLine2: 'do mercado',
  institution: INSTITUTION_NAME,
  author: '© Leo Trevizani',
} as const;

export const SLIDE_2 = {
  title: 'Os 4 Obstáculos do Portfólio',
  subtitle:
    'Entender e superar os principais bloqueios é o primeiro passo para tirar o projeto do papel e sair sabendo montar o próprio portfólio.',
  obstacles: [
    {
      id: 'perfeccionismo',
      title: 'Perfeccionismo',
      description: 'Sensação de que o material nunca está pronto para ser mostrado.',
    },
    {
      id: 'falta-de-tempo',
      title: 'Falta de Tempo',
      description: 'O projeto pessoal sempre perde prioridade para o trabalho atual.',
    },
    {
      id: 'barreira-tecnica',
      title: 'Barreira Técnica',
      description: 'Medo de não saber programar, desenhar ou dominar ferramentas complexas.',
    },
    {
      id: 'falta-de-direcao',
      title: 'Falta de Direção',
      description: 'Falta de clareza sobre por onde começar e como organizar suas informações.',
    },
  ] satisfies ObstacleItem[],
} as const;

export const SLIDE_3 = {
  title: 'O método para construir seu portfólio em 4 passos',
  steps: [
    {
      step: 1,
      title: 'Estrutura',
      description: 'Definir as cinco seções fundamentais do portfólio.',
    },
    {
      step: 2,
      title: 'PRD como Prompt',
      description: 'Brifar a Inteligência Artificial tratando o portfólio como um produto.',
    },
    {
      step: 3,
      title: 'Revisão com currículo ou LinkedIn',
      description: 'Substituir informações fictícias pelos seus cases reais.',
    },
    {
      step: 4,
      title: 'Vibe-coding',
      description: 'Colar o PRD finalizado na ferramenta para gerar o site.',
    },
  ] satisfies MethodStepItem[],
  prdMarkdownTemplates: [
    {
      id: 'markdown-1',
      label: 'Estrutura Markdown 01',
      markdown: `# Prompt para criação de PRD de portfólio

**Papel da IA:** Aja como um Product Manager Sênior e Especialista em Design Systems.

**Objetivo:** Construir um PRD técnico e detalhado para colar na ferramenta de vibe-coding de sua preferência, como base de um workshop rápido para profissionais de [INSIRA SUA PROFISSÃO] sobre como criar um portfólio de alto impacto.

**Contexto de uso:**
- Construção de um PRD para criar o portfólio de um(a) [INSIRA SUA PROFISSÃO] na ferramenta de vibe-coding de sua preferência.
- O PRD deve incluir as principais features, arquitetura de componentes e diretrizes visuais que um portfólio completo precisa ter.
- Preencher todos os campos de conteúdo com dados fictícios realistas, estritamente adaptados à rotina, métricas e entregáveis reais de um(a) [INSIRA SUA PROFISSÃO].

**Travas técnicas e visuais (para evitar layouts genéricos):**
- **Direção de arte e UI:** Especifique uma paleta de cores coesa (com códigos HEX para fundo, superfície, texto e cor de destaque), tipografia com hierarquia clara (ex: fontes contrastantes para títulos e leitura) e estilo visual alinhado à maturidade da área de [INSIRA SUA PROFISSÃO].
- **Componentização e interação:** Defina o comportamento de cada bloco (ex: cards com micro-interações no hover, modais ou páginas internas para leitura detalhada dos cases, barra de navegação fixa com scroll suave).
- **Responsividade:** Exija adaptação explícita para desktop e mobile (mobile-first), definindo como grids e menus colapsam em telas menores.
- **Anti-clichês:** Proíba o uso de textos genéricos tipo "apaixonado por resolver problemas", placeholders em *Lorem Ipsum* ou métricas inventadas sem contexto de negócio.

**Estrutura obrigatória do portfólio:**
1. **Hero & Sobre mim**
   - Headline de posicionamento (proposta de valor clara em até 2 linhas)
   - Foto profissional (com instrução de proporção e enquadramento)
   - Resumo objetivo da experiência profissional e abordagem de trabalho
2. **Stack, habilidades & ferramentas**
   - Agrupamento lógico (ex: hard skills, metodologias e ferramentas técnicas específicas de [INSIRA SUA PROFISSÃO])
3. **3 cases de sucesso**, cada um estruturado em:
   - **Desafio:** O problema real de negócio, gargalo operacional ou necessidade do cliente (contextualizado para [INSIRA SUA PROFISSÃO])
   - **Solução:** O processo aplicado, decisões tomadas e entregáveis construídos
   - **Resultado:** Impacto mensurável com números e indicadores reais da área (ex: aumento de eficiência, redução de custos, ganho de conversão, economia de tempo)
4. **Participações em eventos, palestras, comunidades e projetos** (seção modular que possa ser ocultada caso não haja itens)
5. **Contato & conversão**
   - Chamada para ação (CTA) direta, botão de cópia rápida de e-mail e link destacado para o LinkedIn do(a) profissional

**Entregável:** Gere o PRD completo em formato Markdown, estruturado por seções técnicas claras, pronto para ser copiado e colado diretamente na ferramenta de vibe-coding de sua preferência sem necessidade de edições prévias.

**Bônus:** Ao final do PRD, sugira 3 micro-features interativas que elevariam o nível desse portfólio específico para [INSIRA SUA PROFISSÃO] (ex: filtro de cases por categoria, download de currículo em PDF dinâmico, etc.).`,
    },
    {
      id: 'markdown-2',
      label: 'Estrutura Markdown 02',
      markdown: `# Prompt para incluir dados profissionais no PRD de portfólio

**Objetivo:** Atualizar o PRD gerado anteriormente substituindo todos os dados fictícios pelas minhas informações profissionais reais, extraídas do currículo em anexo.

**Contexto de uso e regras de execução:**
- Substitua integralmente o conteúdo fictício (sobre mim, stack/ferramentas, cases de sucesso, eventos/comunidades e contato) pelos dados reais do currículo em anexo.
- Mantenha intactas todas as especificações técnicas, arquitetura de componentes, diretrizes de UI/UX e regras de responsividade definidas no PRD original.
- **Não invente métricas, links ou experiências:** caso o currículo não contenha informações suficientes para preencher algum campo obrigatório (como a URL do LinkedIn ou os 3 cases completos com desafio, solução e resultado mensurável), **pare antes de gerar o PRD final** e me faça perguntas diretas listando exatamente o que falta.`,
    },
  ] satisfies PrdMarkdownTemplate[],
} as const;

export const SLIDE_4 = {
  title: 'Estrutura Essencial do Portfólio',
  leftColumnHeading: '5 SEÇÕES OBRIGATÓRIAS',
  requiredSections: [
    { number: '01', title: 'Sobre mim' },
    { number: '02', title: 'Stack e Ferramentas' },
    { number: '03', title: 'Cases de Sucesso', highlighted: true },
    { number: '04', title: 'Participações e formação acadêmica' },
    { number: '05', title: 'Contato' },
  ] satisfies RequiredSectionItem[],
  rightColumnHeading: 'ESTRUTURA PARA OS CASES',
  sectionHeadings: {
    '01': 'ESTRUTURA: SOBRE MIM',
    '02': 'ESTRUTURA: STACK E FERRAMENTAS',
    '03': 'ESTRUTURA PARA OS CASES',
    '04': 'ESTRUTURA: FORMAÇÃO E PARTICIPAÇÕES',
    '05': 'ESTRUTURA: CONTATO',
  },
  aboutPreview: {
    title: 'Sobre mim',
    subtitle: 'Apresentação',
    body: 'Um parágrafo curto de apresentação que mostra quem você é, o que faz, de onde vem e por que criou este portfólio. É a parte da página com maior chance de ser lida por completo.',
  },
  caseStructure: [
    {
      id: 'desafio',
      title: 'Desafio',
      description: 'Qual era o problema real que precisava ser resolvido.',
    },
    {
      id: 'solucao',
      title: 'Solução',
      description: 'O que você efetivamente fez para resolver o problema.',
    },
    {
      id: 'resultado',
      title: 'Resultado',
      description: 'O impacto gerado, sempre demonstrado com números.',
    },
  ] satisfies CaseStructureItem[],
} as const;

export const SLIDE_5 = {
  title: 'Como enriquecer o seu PRD',
  subtitle:
    'O PRD descreve o que será construído antes da execução, funcionando como a receita que a IA seguirá. No entanto, um PRD sozinho gera apenas conteúdo fictício e genérico.',
  comparisons: [
    {
      id: 'generico',
      title: 'PRD Genérico',
      description: 'Gera conteúdo fictício, exemplos padronizados e sem a sua identidade real.',
      featured: false,
    },
    {
      id: 'real',
      title: 'PRD com Currículo Real',
      description:
        'Suba seu currículo na IA: saem os cases genéricos e entram sua trajetória, cases e números reais.',
      featured: true,
    },
  ] satisfies PrdComparisonItem[],
} as const;

export const SLIDE_6 = {
  title: 'Último passo: vibe-coding',
  leadBeforeBold: 'Você entrega apenas um texto: o ',
  leadBold: 'PRD revisado',
  leadAfterBold:
    ' contendo todos os seus dados reais. Em troca, você recebe um site funcional e pronto para navegação e publicação.',
  notes: [
    {
      id: 'inicial',
      title: 'Resultado Inicial',
      description:
        'O resultado inicial é um site que já está de pé, embora cru. Isso significa que a estrutura principal estará pronta.',
    },
    {
      id: 'ajustes',
      title: 'Ajustes Finais',
      description:
        'Resta apenas ajustar detalhes de espaçamento, trocar textos genéricos remanescentes e revisar as imagens aplicadas.',
    },
  ] satisfies VibeCodingNoteItem[],
  designResources: [
    {
      id: 'refero-styles',
      title: 'Refero Styles',
      domain: 'styles.refero.design',
      url: 'https://styles.refero.design/',
      description:
        'Site com vários arquivos DESIGN.md de sites já conhecidos e famosos pra você replicar no seu site',
    },
    {
      id: 'designmd-me',
      title: 'DesignMD',
      domain: 'designmd.me',
      url: 'https://designmd.me/',
      description:
        'Site que extrai o arquivo DESIGN.md de qualquer outro site de sua preferência, bastando enviar o link para ele',
    },
    {
      id: 'designmd-ai',
      title: 'DESIGN.md',
      domain: 'designmd.ai',
      url: 'https://designmd.ai/',
      description:
        'Site com vários arquivos DESIGN.md genéricos, mas com personalidade, para você se apropriar',
    },
    {
      id: 'reactbits',
      title: 'React Bits',
      domain: 'reactbits.dev',
      url: 'https://reactbits.dev/',
      description:
        'Biblioteca de componentes prontos para implementação em seu site com vibe coding',
    },
  ] satisfies DesignResourceItem[],
} as const;

export const SLIDE_7 = {
  backToStartLabel: 'Voltar ao início',
  communityCtaLabel: 'Entrar na comunidade Cola no Grid',
  communityCtaUrl:
    'https://chat.whatsapp.com/Jm8tG0qTiNHKxZcLR0FUSN?utm_source=DesignLabs&utm_medium=apresentacaoHTML&utm_campaign=ColaNoGrid_DesignLabs',
} as const;
