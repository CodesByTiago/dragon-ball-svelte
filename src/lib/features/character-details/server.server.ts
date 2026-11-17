import { getCharacter } from "#lib/shared/repositories/characters/index.server.js";

export function loadCharacterDetails(id: number) {
  return getCharacter(id);
}
