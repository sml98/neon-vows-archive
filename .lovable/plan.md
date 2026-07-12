
# Refatoração "Aventura com Camila" — Neon Edition v2

Vamos migrar o HTML único para uma rota React dentro deste projeto Lovable (TanStack Start + Tailwind v4), com foco em **qualidade de código**, **efeitos neon caprichados** e **mobile/legibilidade**. Assets ficam como placeholders bonitos por enquanto.

## O que muda pro usuário final

- Mesma jornada de 10 fases, mesmo tom romântico/8-bit, mesmas mensagens.
- Visual mais polido: scanlines CRT sutis, glitch nos títulos, transições suaves entre fases, som opcional de "beep" nos botões, animação de vitória na fase final.
- Legível em telas 390px: escalas de fonte responsivas, contraste revisado, área de toque mínima 44px, sem scroll horizontal.
- Enter envia formulários (senha, resposta do encontro).
- Botão de mute/unmute visível para a música.

## Estrutura de arquivos

```
src/routes/
  aventura.tsx              → rota /aventura (a experiência)
src/components/aventura/
  AventuraShell.tsx         → caixa neon + fundo + scanlines + audio
  CatSprites.tsx            → os 2 gatinhos 8-bit (SVG isolado)
  PhaseTransition.tsx       → wrapper com animação glitch-fade
  ProgressBar.tsx           → barra HP estilizada
  NeonButton.tsx            → variantes cyan/magenta, tamanhos, active
  CyberInput.tsx            → input + suporte a Enter
  CyberTextBox.tsx          → caixa de "terminal"
  phases/
    Phase01Password.tsx
    Phase02Chocolate.tsx
    Phase03Pact.tsx
    Phase04Hack.tsx
    Phase05Quiz1.tsx
    Phase06Quiz2.tsx
    Phase07BodyParts.tsx
    Phase08LoveMeter.tsx
    Phase09Poem.tsx
    Phase10Finale.tsx
src/lib/aventura/
  content.ts                → todos os textos, respostas e config (uma fonte só)
  useAventuraState.ts       → hook do fluxo (fase atual, next, reset)
  useTypewriter.ts          → hook do efeito de máquina de escrever
  useBeep.ts                → WebAudio beep curto pra feedback
```

- Zero `document.getElementById`, zero `innerHTML`, zero globals.
- Textos e "respostas certas" centralizados em `content.ts` (fáceis de editar).
- `src/routes/index.tsx` continua sendo a home; adiciono um link discreto pra `/aventura` (ou você abre direto pela URL — me diz depois).

## Design system (tokens no `src/styles.css`)

Adiciono tokens neon ao `@theme` para não hardcodar cores nos componentes:

- `--neon-pink: oklch(0.70 0.32 330)` e `--neon-cyan: oklch(0.85 0.19 200)`
- `--neon-bg: oklch(0.10 0.05 300)`
- `--shadow-neon-pink`, `--shadow-neon-cyan` (glow)
- `--gradient-scanline` para o overlay CRT
- Fontes `Press Start 2P` e `VT323` carregadas via `<link>` no `__root.tsx` (nunca `@import` remoto — regra do Tailwind v4).
- Utilitário `@utility neon-text-pink` / `neon-text-cyan` para o brilho de texto.

## Melhorias visuais concretas

- **Scanlines CRT** em `::before` fixo com `pointer-events:none`, opacidade suave, animação lenta de deslocamento vertical.
- **Glitch nos títulos** (`h1/h2`) com `text-shadow` duplo e um `@keyframes` curto disparado ao entrar na fase.
- **Vinheta escura** nos cantos para efeito CRT.
- **Cursor piscante** consistente (componente `<Caret />`).
- **Feedback tátil**: cada botão dispara um beep curto (WebAudio, sem asset) + micro-shake em erro.
- **Barra de "hack"** ganha marcações (segmentos HP) e uma tremida quando enche.
- **Fase final**: chuva de pixels ✦ / corações rosa/ciano em canvas leve (~50 partículas) + fade-in da foto placeholder.
- **Placeholder da foto**: gradiente neon com moldura pixel-art + legenda "// insira nossa foto aqui //" — trocável depois.

## Mobile & acessibilidade

- Container: `w-full max-w-md` no desktop, `max-w-[92vw]` no mobile, `min-h-dvh` (não `100vh`).
- Textos: `text-base` no mobile → `sm:text-lg` no desktop; títulos com `clamp()`.
- Todos os botões: `min-h-11`, foco visível (`focus-visible:ring-3`), `aria-label` onde faltar.
- SVGs decorativos com `aria-hidden`.
- Áudio: começa mutado, botão flutuante 🔊/🔇 no canto; `play()` só após primeira interação (contorna bloqueio de autoplay).
- Mensagens de erro com `role="alert"` e `aria-live="polite"`.
- `<form onSubmit>` real nas fases de input, então Enter funciona.
- Sem `overflow-x-hidden` global; o layout já não estoura.

## Qualidade de código

- Estado do fluxo num único `useAventuraState()` com união discriminada de fases → impossível estar em duas fases ao mesmo tempo.
- `content.ts` tipado:
  ```ts
  export const PASSWORD_ANSWERS = ["09/10/25", "09/10/2025"];
  export const MEETING_ANSWERS = ["shopping"];
  export const BODY_PART_MESSAGES: Record<BodyPart, string> = { ... };
  ```
- Comparações de resposta normalizadas (trim + lowercase + remove acento) num helper `normalize()`.
- Typewriter como hook reutilizável, com cleanup no unmount (sem `i` global bugando ao voltar).
- Todos os textos usam `{string}` em JSX (nada de `innerHTML`) → sem risco de XSS.
- TypeScript estrito, sem `any`.

## SEO / metadata

- `head()` da rota `/aventura` com título tipo "Aventura • Neon Edition", description curta, `robots: noindex` (é conteúdo pessoal), sem og:image.
- Home (`/`) continua com o placeholder atual — não faz parte deste pedido.

## Fora de escopo (confirma comigo se quiser incluir)

- Backend para esconder a senha e respostas (você não marcou "segurança").
- Upload real da foto de vocês e do `musica.mp3` (você escolheu placeholders).
- Trocar a home por essa aventura, ou proteger a rota.

## Verificação antes de fechar

- Build passa (typecheck estrito).
- Playwright rodando em 390×844: percorro as 10 fases, tiro screenshot de cada uma, confirmo que nada estoura horizontalmente e que os botões têm tamanho de toque adequado.
- Console limpo, sem warnings de hydration.
