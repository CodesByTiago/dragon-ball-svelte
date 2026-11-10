import { getCharacter } from "#lib/shared/repositories/characters/index.server.js";

export async function loadComparison(leftId: number, rightId: number) {
  const [left, right] = await Promise.all([getCharacter(leftId), getCharacter(rightId)]);
  return { characters: [left, right] as const };
}
