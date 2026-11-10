import {
  getCharacterPage,
  searchCharacters,
} from "#lib/shared/repositories/characters/index.server.js";

export const CATALOG_PAGE_SIZE = 12;

export function catalogPageFor(characterId: number) {
  return Math.ceil(characterId / CATALOG_PAGE_SIZE);
}

export function loadCatalog(page: number) {
  return getCharacterPage(page, CATALOG_PAGE_SIZE);
}

export function searchCatalogCharacters(name: string, signal?: AbortSignal) {
  return searchCharacters(name, signal);
}
