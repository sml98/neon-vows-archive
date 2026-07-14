# Plano: Fases mais desafiadoras e românticas

Vou reformular o conteúdo e a mecânica das fases (sem quebrar a arquitetura React/Tailwind já existente), transformando o fluxo linear de "clicar/responder uma palavra" em uma jornada com enigmas, reviravoltas narrativas e mini-puzzles. O romance continua sendo o coração — cada acerto revela uma frase carinhosa; cada erro devolve uma provocação fofa.

## Novo arco narrativo (10 fases)

Introduzo uma micro-história: o "sistema" está preso em loop desde que o Samuka conheceu a Camila, e cada fase é um fragmento de memória sendo restaurado. Isso conecta as fases em vez de serem quizzes soltos.

### Fase 01 — Boot Sequence (login temporal) — *retrabalhada*
- Continua a data, mas agora com **3 tentativas visíveis** ("HP do sistema").
- A cada erro, aparece um fragmento diferente da dica (revelação progressiva), não uma dica única escondida.
- Reviravolta: ao acertar, o "sistema" responde "senha aceita… mas eu já sabia que era você desde o primeiro pixel."

### Fase 02 — Sinal fraco (decodificador) — *novo puzzle substituindo a tela passiva*
- Um "sinal criptografado" aparece em Cifra de César simples (deslocamento fixo, ex.: 3).
- A Camila vê algo como `KDPR PXLWR YRFH` e um seletor de deslocamento (−5 a +5).
- Ao acertar deslocamento, revela: `AMO MUITO VOCE`.
- Feedback visual: letras se "recompõem" com efeito glitch.

### Fase 03 — Pacto do chocolate — *com twist lógico*
- Mantém a pergunta do chocolate, mas agora com **3 opções**:
  1. "Sim, divido"
  2. "Não divido"
  3. "Depende do sabor"
- Qualquer resposta avança (não tem resposta errada), mas cada uma dispara uma fala diferente do Samuka. A "certa emocional" é a 3 (easter egg com beep especial).

### Fase 04 — Sequência do coração (Simon Says romântico) — *substitui o clicker*
- 4 botões coloridos neon (rosa/ciano/roxo/verde) piscam uma sequência curta (3 → 4 → 5 passos).
- Camila repete a sequência. Errou = "meu coração bate diferente, tenta de novo".
- Substitui o clicker repetitivo por um puzzle real de memória, mantendo o tema "sincronizar batimentos".

### Fase 05 — Verificação de memória (quiz com pegadinha)
- Pergunta: "Quem apaga primeiro no filme?" — mas com **4 opções** incluindo distratores fofos ("O gato", "Ninguém, terminamos o filme").
- Só "Camila" avança; as outras devolvem respostas específicas e provocativas.

### Fase 06 — Enigma do primeiro encontro (dedução em 3 pistas)
- Em vez de digitar "shopping" direto, o sistema libera **3 pistas** uma por uma (botão "próxima pista"):
  1. "Tinha vitrines acesas."
  2. "O cheiro era de praça de alimentação."
  3. "Tinha um cara ensaiando o que dizer há uma hora."
- Depois das pistas, campo aberto pra responder. Aceita variações ("shopping", "shopping center", nome do shopping se você quiser fixar um).

### Fase 07 — Reconstrução (drag/tap para ordenar) — *novo mini-puzzle*
- 5 fragmentos de uma frase embaralhados em cartões clicáveis.
- Camila toca na ordem correta pra reconstruir: `"VOCÊ / É / MINHA / FASE / FAVORITA"`.
- Sem drag-and-drop (evita complicação mobile) — apenas tap sequencial com feedback visual (cartão fica ciano quando entra na ordem).
- Substitui o "escolha a parte do corpo" por algo mais interativo. A ideia das partes vira **recompensa opcional** no final (ver Fase 08).

### Fase 08 — Análise de atração (mantida, mas enriquecida)
- Mantém as 5 partes do corpo com as falas atuais.
- Twist: agora após "ver a verdade", aparece um mini-quiz bônus opcional: "quer ver o que EU acho que você mais gosta em mim?" com 3 opções auto-depreciativas engraçadas do Samuka.

### Fase 09 — Medidor de amor (com armadilha matemática romântica)
- Não é mais escolher %, é resolver: "Se eu te amo `X`, e você me ama `Y`, e `X = Y × ∞`, qual é `X`?"
- 4 opções: `100%`, `∞`, `indefinido`, `Camila`.
- Só "Camila" ou "∞" avançam. As outras devolvem provocações.

### Fase 10 — Poema + Finale (mantidos, com polimento)
- Poema Vinícius continua com typewriter.
- Finale: além da foto e partículas, adiciono um **"achievement unlocked"** listando as fases superadas ("Boot Sequence ✔", "Decodificador ✔", …) — reforça a sensação de jornada.

## Arquivos afetados

**Novos componentes/puzzles:**
- `src/components/aventura/puzzles/CaesarDecoder.tsx` — fase 02
- `src/components/aventura/puzzles/SimonSequence.tsx` — fase 04
- `src/components/aventura/puzzles/SentenceBuilder.tsx` — fase 07
- `src/components/aventura/AchievementList.tsx` — fase 10

**Fases reescritas:**
- `Phase01Password.tsx` — tentativas + dica progressiva
- `Phase02Chocolate.tsx` → renomear conceito p/ decodificador (mantém arquivo, troca conteúdo). A imagem `couple-smile.png` migra pra recompensa da Fase 07.
- `Phase03Pact.tsx` — 3 opções
- `Phase04Hack.tsx` → vira SimonSequence
- `Phase05Quiz1.tsx` — 4 opções
- `Phase06Quiz2.tsx` — pistas progressivas
- `Phase07BodyParts.tsx` → vira SentenceBuilder (partes do corpo movem pra Fase 08)
- `Phase08LoveMeter.tsx` → funde com "partes do corpo" ou vira o enigma matemático (decidir na build)
- `Phase10Finale.tsx` — adiciona lista de achievements

**Estado global:**
- `useAventuraState.ts` — rastrear "achievements" concluídos e tentativas por fase.

**Conteúdo:**
- `src/lib/aventura/content.ts` — adicionar novas strings (mensagem decodificada, sequência da frase, distratores, achievements).

## Detalhes técnicos

- Sem novas dependências. Tudo com React state + Tailwind + animações CSS já existentes.
- Puzzles novos usam apenas `useState`/`useEffect` — nenhum drag/gesture lib.
- Acessibilidade: Simon dispara beeps distintos por cor; sequência é anunciada via `aria-live`.
- Mobile: cartões do SentenceBuilder em grid 2 colunas (fit em 320px); Simon com 4 botões grandes 2×2.
- Efeitos neon existentes (`glitch-fade`, `neon-shake`, scanlines) são reaproveitados nos novos componentes.

## Fora de escopo (não vou mexer)

- Layout global, shell, sistema de beeps, poema, fontes/tema.
- Backend/persistência (fases continuam client-side).
- Substituição de assets (as duas fotos continuam onde estão, só migro a `couple-smile` de fase).

Confirma que posso partir pra build?
