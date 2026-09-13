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
      "Um chocolate escolhido por trazer cereja, a fruta preferida da Camila, e por guardar a entrada desta aventura.",
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
      firstKiss: {
        happenedThatDay: true,
        detail:
          "Eu estava receoso de tentar; quando tomei coragem, ela permitiu, correspondeu e me beijou de volta.",
      },
      farewellFeeling: "felicidade e aquela sensação boa de que algo especial tinha começado",
    },
    originStory: [
      "Nos conhecemos por um aplicativo de relacionamentos ligado ao Facebook.",
      "Discutimos antes mesmo de nos vermos e paramos de conversar.",
      "Eu respondi a um story no Instagram; voltamos a conversar e ainda discutimos outra vez.",
      "Nos encontramos no shopping: ela com café, eu querendo chopp numa tarde de semana.",
      "Eu arrisquei o primeiro beijo, ela correspondeu e nos despedimos felizes.",
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
    message: `Camila, eu sei que nem sempre é fácil transformar carinho em palavra, abraço ou gesto. Sei também que algumas partes da sua história tornaram isso ainda mais difícil. Por isso, esta aventura nunca foi sobre esperar de você uma reação perfeita.

Ela existe para mostrar que eu presto atenção: no café entre as suas mãos, no beijo que você correspondeu quando eu ainda estava com medo, no seu jeito de me chamar de vida e até nas nossas discussões antes de a história começar de verdade.

Durante todo este tempo, tenho aprendido a reconhecer o seu jeito de amar. Talvez eu erre. Talvez a gente se desencontre e precise apertar CONTINUE algumas vezes. Mesmo assim, ainda quero reencontrar com você aquela felicidade tranquila da nossa primeira despedida.

Não quero voltar no tempo. Quero trazer aquela chama para tudo o que ainda podemos construir. Você não precisa dizer tudo agora. Só quero que saiba: eu continuo aqui, vida — escolhendo você hoje com ainda mais certeza do que no primeiro dia.`,
  },
} as const;

export const PLAYER_LABEL =
  `${EXPERIENCE.playerOne.name.toUpperCase()} × ${EXPERIENCE.playerTwo.name.toUpperCase()}` as const;
