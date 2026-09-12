import assert from "node:assert/strict";
import test from "node:test";
import { EXPERIENCE } from "../src/lib/aventura/experience.ts";
import { normalize } from "../src/lib/aventura/normalize.ts";
import { parseSavedProgress, TOTAL_PHASES } from "../src/lib/aventura/useAventuraState.ts";

test("a configuração principal contém uma história consistente", () => {
  assert.equal(EXPERIENCE.playerOne.name, "Samuel");
  assert.equal(EXPERIENCE.playerTwo.name, "Camila");
  assert.equal(EXPERIENCE.finale.emotionalDirection, "rir-e-se-emocionar");
  assert.equal(EXPERIENCE.gift.favoriteFruit, "cereja");
  assert.equal(EXPERIENCE.playerTwo.callsPartner.includes("vida"), true);
  assert.equal(EXPERIENCE.relationship.originStory.length, 5);
  assert.equal(Number.isNaN(new Date(EXPERIENCE.relationship.startDate).getTime()), false);
});

test("normaliza respostas com acentos, espaços e caixa diferentes", () => {
  assert.equal(normalize("  Praça de Alimentação  "), "praca de alimentacao");
  assert.equal(normalize("CAMILA"), "camila");
});

test("restaura somente saves válidos e remove conquistas duplicadas", () => {
  const progress = parseSavedProgress(
    JSON.stringify({
      phase: 7,
      achievements: [1, 2, 2, 99, "3"],
      gift: "both",
    }),
  );

  assert.deepEqual(progress, {
    phase: 7,
    achievements: [1, 2],
    gift: "both",
  });
});

test("recusa saves corrompidos ou fases fora da jornada", () => {
  assert.equal(parseSavedProgress("{"), null);
  assert.equal(parseSavedProgress(JSON.stringify({ phase: 0 })), null);
  assert.equal(parseSavedProgress(JSON.stringify({ phase: TOTAL_PHASES + 1 })), null);
});
