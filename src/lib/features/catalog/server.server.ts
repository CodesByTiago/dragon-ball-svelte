import {
  getCharacterPage,
  searchCharacters,
} from "#lib/shared/repositories/characters/index.server.js";
import type { CharacterSummary } from "#lib/shared/models/character.js";

export const CATALOG_PAGE_SIZE = 12;

export function catalogPageFor(characterId: number) {
  return Math.ceil(characterId / CATALOG_PAGE_SIZE);
}

export function loadCatalog(page: number) {
  return getCharacterPage(page, CATALOG_PAGE_SIZE);
}

const NUMERIC_QUERY = /^\d+$/;
const ALL_CHARACTERS_PAGE_SIZE = 100;

// A API só filtra por nome; buscas numéricas casam com o número (ID) do personagem.
async function searchByNumber(digits: string): Promise<CharacterSummary[]> {
  const matches: CharacterSummary[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const result = await getCharacterPage(page, ALL_CHARACTERS_PAGE_SIZE);
    totalPages = result.totalPages;
    matches.push(...result.items.filter((character) => String(character.id).includes(digits)));
    page += 1;
  } while (page <= totalPages);

  return matches.sort((a, b) => a.id - b.id);
}

export async function searchCatalogCharacters(name: string, signal?: AbortSignal) {
  const query = name.trim();
  if (NUMERIC_QUERY.test(query)) {
    return searchByNumber(query.replace(/^0+(?=\d)/, ""));
  }
  return searchCharacters(query, signal);
}
