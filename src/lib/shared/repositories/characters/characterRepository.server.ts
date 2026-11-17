import { ApiError, http } from "#lib/core/api/http.js";
import type {
  Character,
  CharacterPage,
  CharacterPlanet,
  CharacterSummary,
  CharacterTransformation,
} from "#lib/shared/models/character.js";

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function optionalString(value: unknown, field: string): string | null {
  if (value === undefined || value === null) return null;
  if (typeof value !== "string") {
    throw new ApiError(`Invalid character API response: "${field}" must be a string`);
  }
  return value;
}

function requiredId(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    throw new ApiError(`Invalid character API response: "${field}" must be a positive integer`);
  }
  return value;
}

function parseSummary(value: unknown): CharacterSummary {
  if (!isRecord(value) || typeof value.name !== "string" || value.name.length === 0) {
    throw new ApiError("Invalid character API response: character name is missing");
  }

  return {
    id: requiredId(value.id, "id"),
    name: value.name,
    ki: optionalString(value.ki, "ki"),
    maxKi: optionalString(value.maxKi, "maxKi"),
    race: optionalString(value.race, "race"),
    gender: optionalString(value.gender, "gender"),
    description: optionalString(value.description, "description"),
    image: optionalString(value.image, "image"),
    affiliation: optionalString(value.affiliation, "affiliation"),
  };
}

function parsePlanet(value: unknown): CharacterPlanet | null {
  if (value === undefined || value === null) return null;
  if (!isRecord(value) || typeof value.name !== "string") {
    throw new ApiError("Invalid character API response: originPlanet is malformed");
  }

  return {
    id: requiredId(value.id, "originPlanet.id"),
    name: value.name,
    isDestroyed: typeof value.isDestroyed === "boolean" ? value.isDestroyed : null,
    description: optionalString(value.description, "originPlanet.description"),
    image: optionalString(value.image, "originPlanet.image"),
  };
}

function parseTransformation(value: unknown): CharacterTransformation {
  if (!isRecord(value) || typeof value.name !== "string") {
    throw new ApiError("Invalid character API response: transformation is malformed");
  }

  return {
    id: requiredId(value.id, "transformation.id"),
    name: value.name,
    image: optionalString(value.image, "transformation.image"),
    ki: optionalString(value.ki, "transformation.ki"),
  };
}

function parseCharacter(value: unknown): Character {
  const summary = parseSummary(value);
  if (!isRecord(value)) {
    throw new ApiError("Invalid character API response: character is malformed");
  }

  const transformations = value.transformations ?? [];
  if (!Array.isArray(transformations)) {
    throw new ApiError("Invalid character API response: transformations must be an array");
  }

  return {
    ...summary,
    originPlanet: parsePlanet(value.originPlanet),
    transformations: transformations.map(parseTransformation),
  };
}

function parseCharacterList(value: unknown): CharacterSummary[] {
  if (!Array.isArray(value)) {
    throw new ApiError("Invalid character API response: expected a character list");
  }
  return value.map(parseSummary);
}

export async function getCharacterPage(page: number, limit = 12): Promise<CharacterPage> {
  const { data } = await http.get<unknown>("/characters", { params: { page, limit } });
  if (!isRecord(data) || !Array.isArray(data.items) || !isRecord(data.meta)) {
    throw new ApiError("Invalid character API response: paginated list is malformed");
  }

  const currentPage = data.meta.currentPage;
  const totalPages = data.meta.totalPages;
  const totalItems = data.meta.totalItems;
  if (
    typeof currentPage !== "number" ||
    typeof totalPages !== "number" ||
    typeof totalItems !== "number"
  ) {
    throw new ApiError("Invalid character API response: pagination metadata is malformed");
  }

  return {
    items: parseCharacterList(data.items),
    currentPage,
    totalPages,
    totalItems,
  };
}

export async function searchCharacters(
  name: string,
  signal?: AbortSignal,
): Promise<CharacterSummary[]> {
  const { data } = await http.get<unknown>("/characters", {
    params: { name },
    signal,
  });
  return parseCharacterList(data);
}

export async function getCharacter(id: number): Promise<Character> {
  const { data } = await http.get<unknown>(`/characters/${id}`);
  return parseCharacter(data);
}
