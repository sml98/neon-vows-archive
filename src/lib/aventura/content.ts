export const PASSWORD_ANSWERS = ["09/10/25", "09/10/2025"];

export const PASSWORD_HINT_FRAGMENTS = [
  "> pista 1/3: foi o dia em que apertei START na melhor coop da minha vida.",
  "> pista 2/3: outubro estava começando, e eu, terminando de me apaixonar.",
  "> pista 3/3: DD/MM/AA — o dia, o mês e o ano em que tudo mudou (2025). 😉",
];

export const MEETING_ANSWERS = ["shopping", "shopping center", "shoping"];

export const MEETING_CLUES = [
  "> pista 1/3: as vitrines estavam acesas, refletindo em você.",
  "> pista 2/3: o cheiro da praça de alimentação estava por toda parte.",
  "> pista 3/3: tinha um cara ensaiando frases há uma hora, sem coragem de chegar. (era eu.)",
];

export type BodyPart = "cabelo" | "olhos" | "estilo" | "curvas" | "boca";

export const BODY_PART_MESSAGES: Record<BodyPart, string> = {
  boca: "> A sua boca... é nela que o tempo trava um bug delicioso e eu esqueço qual fase da vida estou jogando. Cada beijo é um save point do nosso futuro.",
  olhos:
    "> Os seus olhos... castanhos como um mapa secreto que só eu sei decifrar. Quando você me olha, meu sistema inteiro dá reboot no melhor sentido possível.",
  cabelo:
    "> O seu cabelo... é a armadilha mais linda desse jogo. Cada fio me puxa pra mais perto, e o seu cheiro é o cheat code do meu bom humor.",
  estilo:
    "> O seu estilo... é personagem principal em qualquer cenário. Você entra numa sala e o mundo inteiro vira NPC olhando pra você.",
  curvas:
    "> As suas curvas... são level design divino. Cada detalhe seu foi renderizado sob medida pras minhas mãos, e isso me deixa completamente sem HP.",
};

export const BODY_PART_TRUTH =
  "> Mas a verdade real? Eu amo VOCÊ INTEIRA, Camila. Não existe parte favorita quando o pacote todo é obra-prima. Você é minha edição limitada, sem bugs, sem patch, sem substituto.";

export const SAMUKA_SELF_OPTIONS: { id: string; label: string; msg: string }[] = [
  {
    id: "risada",
    label: "MINHA RISADA",
    msg: "> respondeu certo! você ama quando eu rio bobo do nada. (eu também, quando você é o motivo.)",
  },
  {
    id: "abraco",
    label: "MEU ABRAÇO",
    msg: "> quase! meu abraço é o teu save point favorito, eu sei. mas eu apostaria em outra coisa...",
  },
  {
    id: "chatice",
    label: "MINHA CHATICE",
    msg: "> kkkk mentira! você AMA quando eu sou insuportável de ciumento. confessa.",
  },
];

// Phase 03 — Pacto do chocolate (3 opções, todas avançam)
export const PACT_RESPONSES: Record<"sim" | "nao" | "depende", string> = {
  sim: "> pacto selado com açúcar e amor. o sistema registra: dupla oficial confirmada. ❤",
  nao: "> negado?! ai, mulher... tudo bem. o sistema me lembra: te amar não depende de chocolate compartilhado (mas ajudaria kkk).",
  depende:
    "> RESPOSTA PERFEITA. a Camila que eu conheço sempre negocia. essa é a mulher que roubou meu HP. ❤ (easter egg desbloqueado)",
};

// Phase 05 — 4 opções
export const QUIZ1_OPTIONS: { id: string; label: string; correct?: boolean; msg?: string }[] = [
  {
    id: "samuka",
    label: "SAMUKA",
    msg: "> aaaah, não minta pra mim, moça! quem apaga primeiro é você — e você sabe. ❤",
  },
  { id: "camila", label: "CAMILA", correct: true },
  {
    id: "gato",
    label: "O GATO",
    msg: "> o gato só apagou depois de te ver apagar. até ele te copia, olha só.",
  },
  {
    id: "ninguem",
    label: "NINGUÉM (VIMOS TUDO)",
    msg: "> nossa, revisionismo histórico agora? kkk a Camila apaga antes dos créditos, sempre.",
  },
];

// Phase 07 — Sentence builder
export const SENTENCE_WORDS = ["VOCÊ", "É", "MINHA", "FASE", "FAVORITA"] as const;
export const SENTENCE_SUCCESS =
  "> mensagem recomposta. e é verdade: você é a única fase que eu quero rejogar pra sempre.";
export const SENTENCE_ERROR =
  "> hmm, os fragmentos não encaixam. tenta de novo — a ordem certa faz sentido no coração.";

// Phase 08 — Love math
export const LOVE_MATH_OPTIONS: { id: string; label: string; correct?: boolean; msg: string }[] = [
  {
    id: "100",
    label: "100%",
    msg: "> 100% é pouco pra caber o que eu sinto. tenta de novo, essa equação quebra qualquer calculadora.",
  },
  {
    id: "infinito",
    label: "∞",
    correct: true,
    msg: "> ISSO. infinito. você multiplicou meu processador por um número que nem existe. ❤",
  },
  {
    id: "indefinido",
    label: "INDEFINIDO",
    msg: "> nada indefinido aqui, moça. o único indefinido é quantos beijos ainda te devo.",
  },
  {
    id: "camila",
    label: "CAMILA",
    correct: true,
    msg: "> resposta perfeita. a variável X sempre foi você. sempre foi. ❤",
  },
];

// Phase 04 — Simon
export const SIMON_SEQUENCE = [0, 2, 1, 3, 2] as const; // 4 colors, 5 steps
export const SIMON_COLORS = [
  { key: "pink", label: "❤", varName: "--neon-pink", freq: 523.25 },
  { key: "cyan", label: "◆", varName: "--neon-cyan", freq: 659.25 },
  { key: "purple", label: "★", varName: "--neon-pink", freq: 783.99, hue: "oklch(0.6 0.28 305)" },
  { key: "green", label: "✦", varName: "--neon-cyan", freq: 987.77, hue: "oklch(0.85 0.22 145)" },
] as const;

// Phase 02 — Caesar
export const CAESAR_PLAIN = "AMO MUITO VOCE";
export const CAESAR_SHIFT = 3; // encrypted with +3
export const CAESAR_SUCCESS =
  "> sinal decodificado. essa era a mensagem escondida desde a fase 1. e continua verdadeira.";

// Phase 10 — Poem + finale
export const POEM =
  "> De tudo, ao meu amor serei atento\n> antes, e com tal zelo, e sempre, e tanto\n> que mesmo em face do maior encanto\n> dele se encante mais meu pensamento.\n\n> Quero vivê-lo em cada mau momento\n> e em seu louvor hei de espalhar meu canto\n> e rir meu riso e derramar meu pranto\n> ao seu pesar ou seu contentamento.\n\n> E assim, quando mais tarde me procure\n> quem sabe a morte, angústia de quem vive\n> quem sabe a solidão, fim de quem ama\n\n> Eu possa me dizer do amor (que tive):\n> que não seja imortal, posto que é chama\n> mas que seja infinito enquanto dure.\n\n> — pra você, minha Camila. Sempre.";

export const ACHIEVEMENTS: Record<number, string> = {
  1: "BOOT SEQUENCE",
  2: "SINAL DECODIFICADO",
  3: "PACTO SELADO",
  4: "BATIMENTOS SINCRONIZADOS",
  5: "MEMÓRIA VERIFICADA",
  6: "PRIMEIRO ENCONTRO REVIVIDO",
  7: "MENSAGEM RECONSTRUÍDA",
  8: "ANÁLISE COMPLETA",
  9: "EQUAÇÃO RESOLVIDA",
};
