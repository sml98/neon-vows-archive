/**
 * Fonte única dos detalhes pessoais da experiência.
 *
 * Quando novas memórias forem confirmadas, altere este arquivo em vez de
 * espalhar nomes, datas e histórias pelos componentes das 16 fases.
 */
export const EXPERIENCE = {
  title: "Neon Vows",
  playerOne: {
    name: "Samuel",
    nickname: "Samuka",
  },
  playerTwo: {
    name: "Camila",
    nickname: "Bombom",
  },
  relationship: {
    startDate: "2025-10-09T00:00:00-03:00",
    startDateShort: "09/10/25",
    startDateFull: "09/10/2025",
    firstMeeting: {
      place: "praça de alimentação do shopping",
      monthAndYear: "outubro de 2025",
      samuelDrink: "chopp de vinho",
      camilaDrink: "café",
      camilaArrivalDetail: "um copinho de café nas mãos",
      camilaRideHome: "Uber",
      samuelRideHome: "a pé até o apartamento",
      funnyAftermath: "calos nos pés",
    },
    originStory: [
      "Nos conhecemos por um aplicativo de relacionamentos ligado ao Facebook.",
      "Discutimos antes mesmo de nos vermos e paramos de conversar.",
      "Eu encontrei o Instagram dela e respondi a um story.",
      "Voltamos a conversar, discutimos outra vez e ainda assim marcamos o encontro.",
      "Nos vimos pela primeira vez na praça de alimentação do shopping.",
    ],
  },
  finale: {
    emotionalDirection: "rir-e-se-emocionar",
    promise: "CO-OP VITALÍCIA",
  },
} as const;

export const PLAYER_LABEL =
  `${EXPERIENCE.playerOne.name.toUpperCase()} × ${EXPERIENCE.playerTwo.name.toUpperCase()}` as const;
