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
    callsPartner: ["vida", "Bombom", "meu amor", "chocolate"],
  },
  playerTwo: {
    name: "Camila",
    nickname: "Bombom",
    callsPartner: ["vida"],
  },
  gift: {
    accessParam: "chocolate",
    itemName: "Chocolate + Cereja",
    favoriteFruit: "cereja",
    meaning:
      "Um chocolate escolhido por carregar a cereja, a fruta preferida da Camila, e esconder a entrada para esta aventura.",
  },
  relationship: {
    startDate: "2025-10-09T00:00:00-03:00",
    startDateShort: "09/10/25",
    startDateFull: "09/10/2025",
    firstMeeting: {
      place: "praça de alimentação do shopping",
      timing: "alguns dias antes do pedido oficial de namoro, em outubro de 2025",
      samuelDrink: "chopp de vinho",
      camilaDrink: "café",
      camilaArrivalDetail: "um copinho de café nas mãos",
      camilaRideHome: "Uber",
      samuelRideHome: "a pé até o apartamento",
      funnyAftermath: "calos nos pés",
      firstKiss: {
        happenedThatDay: true,
        detail:
          "Eu estava receoso de tentar; quando tomei coragem, ela permitiu, correspondeu e me beijou de volta.",
      },
      farewellFeeling: "felicidade e aquela sensação boa de que algo especial tinha começado",
    },
    officialProposal: {
      date: "09/10/2025",
      place: "um motel",
      gifts: ["buquê de flores", "aliança"],
      feeling:
        "Foi romântico, divertido e muito bom, embora o ambiente fosse estranho e diferente para mim.",
      comicRelief:
        "Porque aparentemente restaurante, praça e pôr do sol estavam em manutenção naquele dia.",
    },
    originStory: [
      "Nos conhecemos por um aplicativo de relacionamentos ligado ao Facebook.",
      "Discutimos antes mesmo de nos vermos e paramos de conversar.",
      "Eu respondi a um story no Instagram; voltamos a conversar e ainda discutimos outra vez.",
      "Nos encontramos no shopping: ela com café, eu querendo chopp numa tarde de semana.",
      "Eu arrisquei o primeiro beijo, ela correspondeu e nos despedimos felizes.",
      "Em 09/10/2025 veio o pedido oficial: buquê, aliança e, por alguma decisão memorável do roteiro, um motel.",
    ],
    emotionalContext: {
      camila:
        "Nem sempre consegue demonstrar carinho com facilidade por causa de experiências difíceis que viveu.",
      samuel:
        "Está tentando compreender o jeito dela e quer reacender a conexão do início sem transformar isso em cobrança.",
    },
  },
  finale: {
    emotionalDirection: "diversao-romantica-descontraida",
    promise: "NOSSA CAMPANHA CONTINUA",
    message: `Camila, esta aventura é um passeio divertido pelas pequenas coisas que fizeram a nossa história ter a nossa cara.

O café nas suas mãos. O chopp suspeito numa tarde de semana. O beijo que eu quase não tive coragem de tentar. O Uber que te levou embora enquanto meus pés desbloqueavam o troféu “calos por paixão”. E, claro, o pedido oficial com buquê, aliança e um motel — porque aparentemente os lugares convencionais estavam todos em manutenção.

Eu gosto de lembrar que a gente começou discutindo antes mesmo de se conhecer e, ainda assim, encontrou um jeito de chegar até aqui. Nós não somos um romance escrito por um roteirista comportado. Somos vida, Bombom, meu amor, chocolate, teimosia, risadas e um monte de fases jogadas do nosso jeito.

Se esta aventura arrancou um sorriso seu e fez você lembrar de algum desses momentos com carinho, missão cumprida. Eu só queria brincar com a nossa história e dizer, do meu jeito meio nerd: gosto demais de dividir essa campanha contigo, vida.`,
  },
} as const;

export const PLAYER_LABEL =
  `${EXPERIENCE.playerOne.name.toUpperCase()} × ${EXPERIENCE.playerTwo.name.toUpperCase()}` as const;
