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
    emotionalDirection: "rir-e-se-emocionar",
    promise: "CO-OP VITALÍCIA",
    message: `Camila, eu sei que carinho nem sempre consegue sair em forma de palavra, abraço ou gesto. Sei que existem partes da sua história que tornaram isso mais difícil — e esta aventura não foi feita para cobrar de você uma reação perfeita.

Ela foi feita para dizer que eu presto atenção. No café entre as suas mãos. No beijo que você correspondeu quando eu ainda estava com medo. No buquê, na aliança e no cenário nada convencional do nosso pedido oficial. No seu jeito de me chamar de vida. Até nas nossas discussões antes de a história começar direito.

Durante todo este tempo eu tenho tentado aprender o seu jeito de amar. Talvez eu erre, talvez a gente se desencontre e precise apertar CONTINUE algumas vezes. Mas eu ainda quero encontrar, junto com você, aquela felicidade boa da nossa primeira despedida.

Não quero voltar no tempo. Quero levar aquela chama para o que ainda podemos construir. Você não precisa dizer tudo agora. Só quero que saiba: eu continuo aqui, vida — escolhendo você com mais consciência do que no primeiro dia.`,
  },
} as const;

export const PLAYER_LABEL =
  `${EXPERIENCE.playerOne.name.toUpperCase()} × ${EXPERIENCE.playerTwo.name.toUpperCase()}` as const;
