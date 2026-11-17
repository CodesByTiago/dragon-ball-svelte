import type { Character, CharacterSummary } from "#lib/shared/models/character.js";

export function makeSummary(overrides: Partial<CharacterSummary> = {}): CharacterSummary {
  return {
    id: 1,
    name: "Goku",
    ki: "60.000.000",
    maxKi: "90 Septillion",
    race: "Saiyan",
    gender: "Male",
    description: "A Saiyan hero.",
    image: "https://dragonball-api.com/characters/goku_normal.webp",
    affiliation: "Z Fighter",
    ...overrides,
  };
}

export function makeCharacter(overrides: Partial<Character> = {}): Character {
  return {
    ...makeSummary(),
    originPlanet: {
      id: 2,
      name: "Earth",
      isDestroyed: false,
      description: "Home of the Z Fighters.",
      image: null,
    },
    transformations: [{ id: 1, name: "Super Saiyan", image: null, ki: "3.000.000" }],
    ...overrides,
  };
}
