import { EXPERIENCE } from "./experience";

export const PASSWORD_ANSWERS = [
  EXPERIENCE.relationship.startDateShort,
  EXPERIENCE.relationship.startDateFull,
];

export const PASSWORD_HINT_FRAGMENTS = [
  "> pista 1/2: foi o dia em que meus olhos finalmente encontraram você fora da tela.",
  "> pista 2/2: outubro estava só começando; a nossa história também.",
];

export const MEETING_ANSWERS = [
  "shopping",
  "shopping center",
  "praça de alimentação",
  "praca de alimentacao",
  "alimentacao",
];

export const MEETING_CLUES = [
  `> pista 1/3: havia comida por todos os lados na ${EXPERIENCE.relationship.firstMeeting.place}.`,
  `> pista 2/3: você chegou com ${EXPERIENCE.relationship.firstMeeting.camilaArrivalDetail}. Essa imagem ficou guardada em mim.`,
  `> pista 3/3: eu quis provar um ${EXPERIENCE.relationship.firstMeeting.samuelDrink}; você desconfiou da minha sanidade... e acabou dividindo a loucura comigo.`,
];

export type BodyPart = "cabelo" | "olhos" | "estilo" | "curvas" | "boca";

export const BODY_PART_MESSAGES: Record<BodyPart, string> = {
  boca: "> A sua boca... basta um beijo para o tempo travar e o resto do mundo perder o sinal. É o meu save point favorito.",
  olhos:
    "> Os seus olhos... castanhos, intensos e cheios de caminhos que eu ainda quero descobrir. Quando você me olha, meu sistema esquece qualquer outro comando.",
  cabelo:
    "> O seu cabelo... a armadilha mais bonita desta aventura. Cada fio me chama para mais perto, e o seu cheiro desbloqueia o meu melhor sorriso.",
  estilo:
    "> O seu estilo... tem energia de protagonista. Você chega e, sem precisar dizer nada, muda todo o cenário ao redor.",
  curvas:
    "> As suas curvas... parecem desenhadas para desconfigurar o meu juízo. Cada detalhe seu me deixa sem defesa — e sem vontade nenhuma de resistir.",
};

export const BODY_PART_TRUTH =
  "> Mas a resposta verdadeira é você inteira, Camila. Não existe detalhe favorito quando é o conjunto que faz o meu coração perder o compasso. Você é única — sem cópia, sem substituta e impossível de esquecer.";

export const SAMUEL_SELF_OPTIONS: { id: string; label: string; msg: string }[] = [
  {
    id: "risada",
    label: "MINHA RISADA",
    msg: "> Acertou! Você gosta quando eu solto aquela risada boba — e eu gosto ainda mais quando você é o motivo.",
  },
  {
    id: "abraco",
    label: "MEU ABRAÇO",
    msg: "> Quase! Meu abraço pode até ser o seu save point, mas eu estava pensando em outra coisa...",
  },
  {
    id: "chatice",
    label: "MINHA CHATICE",
    msg: "> Essa resposta foi pura provocação, eu sei. Mas confessa: até a minha chatice já virou parte do pacote.",
  },
];

// Phase 03 — Pacto do chocolate (3 opções, todas avançam)
export const PACT_RESPONSES: Record<"sim" | "nao" | "depende", string> = {
  sim: "> pacto selado com açúcar e amor. o sistema registra: dupla oficial confirmada. ❤",
  nao: "> negado?! ai, meu amor... tudo bem. o sistema me lembra: te amar não depende de chocolate compartilhado (mas ajudaria kkk).",
  depende:
    "> RESPOSTA PERFEITA. a Camila que eu conheço sempre negocia. esse é o meu amor que roubou meu HP. ❤ (easter egg desbloqueado)",
};

// Phase 05 — 4 opções
export const QUIZ1_OPTIONS: { id: string; label: string; correct?: boolean; msg?: string }[] = [
  {
    id: "samuel",
    label: "SAMUEL",
    msg: "> Ah, mentirosa! Eu aguento bem mais — e você sabe exatamente do que estou falando. kkk",
  },
  { id: "camila", label: "CAMILA", correct: true },
  {
    id: "gato",
    label: "O GATO",
    msg: "> O gato não conta. A minha dorminhoca favorita continua sendo você. ❤",
  },
  {
    id: "ninguem",
    label: "NINGUÉM (VIMOS TUDO)",
    msg: "> Tentativa ousada de reescrever a história. Mas você apaga antes dos créditos, Camila. kkk",
  },
];

// Phase 07 — Sentence builder
export const SENTENCE_WORDS = ["VOCÊ", "É", "MINHA", "FASE", "FAVORITA"] as const;
export const SENTENCE_SUCCESS =
  "> mensagem restaurada. E é verdade: você é a fase que eu escolheria viver de novo, sempre.";
export const SENTENCE_ERROR =
  "> os fragmentos ainda não se encaixaram. Respira e tenta outra vez — o coração conhece a ordem.";

// Phase 08 — Love math
export const LOVE_MATH_OPTIONS: { id: string; label: string; correct?: boolean; msg: string }[] = [
  {
    id: "100",
    label: "100%",
    msg: "> 100% ainda é pouco para medir o que eu sinto. Essa equação ultrapassa qualquer limite.",
  },
  {
    id: "infinito",
    label: "∞",
    correct: true,
    msg: "> Exato: infinito. A única medida grande o bastante para chegar perto do que eu sinto. ❤",
  },
  {
    id: "indefinido",
    label: "INDEFINIDO",
    msg: "> Indefinido, não. O que eu sinto é certeza; incontável é só a quantidade de beijos que ainda quero te dar.",
  },
  {
    id: "camila",
    label: "CAMILA",
    correct: true,
    msg: "> Resposta perfeita. No fim, a incógnita nunca foi o amor — sempre foi como colocar você inteira dentro de uma equação. ❤",
  },
];

// Phase 04 — Simon
export const SIMON_SEQUENCE = [0, 2, 1, 3, 2, 0, 3, 1, 0, 3] as const; // 4 colors, 10 steps

// Phase 02 — Caesar
export const CAESAR_PLAIN = "AMO MUITO VOCE";
export const CAESAR_SHIFT = 3; // encrypted with +3
export const CAESAR_SUCCESS =
  "> sinal decodificado. Três palavras simples para uma verdade que só cresce: amo muito você.";

// Phase 10 — Poem + finale
export const POEM =
  "> De tudo, ao meu amor serei atento\n> antes, e com tal zelo, e sempre, e tanto\n> que mesmo em face do maior encanto\n> dele se encante mais meu pensamento.\n\n> Quero vivê-lo em cada mau momento\n> e em seu louvor hei de espalhar meu canto\n> e rir meu riso e derramar meu pranto\n> ao seu pesar ou seu contentamento.\n\n> E assim, quando mais tarde me procure\n> quem sabe a morte, angústia de quem vive\n> quem sabe a solidão, fim de quem ama\n\n> Eu possa me dizer do amor (que tive):\n> que não seja imortal, posto que é chama\n> mas que seja infinito enquanto dure.\n\n> — pra você, minha Camila. Sempre.";

export const ACHIEVEMENTS: Record<number, string> = {
  1: "BOOT SEQUENCE",
  2: "SINAL DECODIFICADO",
  3: "PACTO SELADO",
  4: "CARTA RECEBIDA",
  5: "MEMÓRIA AFETIVA RESTAURADA",
  6: "BATIMENTOS SINCRONIZADOS",
  7: "MEMÓRIA VERIFICADA",
  8: "PRIMEIRO ENCONTRO REVIVIDO",
  9: "MENSAGEM RECONSTRUÍDA",
  10: "CONSTELAÇÃO DESENHADA",
  11: "SINTONIA PESSOAL CONFIRMADA",
  12: "ANÁLISE COMPLETA",
  13: "COFRE ABERTO",
  14: "LINHA DO TEMPO RECONSTRUÍDA",
  15: "EQUAÇÃO RESOLVIDA",
};
