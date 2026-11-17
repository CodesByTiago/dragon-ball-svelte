export type CharacterSummary = {
  id: number;
  name: string;
  ki: string | null;
  maxKi: string | null;
  race: string | null;
  gender: string | null;
  description: string | null;
  image: string | null;
  affiliation: string | null;
};

export type CharacterTransformation = {
  id: number;
  name: string;
  image: string | null;
  ki: string | null;
};

export type CharacterPlanet = {
  id: number;
  name: string;
  isDestroyed: boolean | null;
  description: string | null;
  image: string | null;
};

export type Character = CharacterSummary & {
  originPlanet: CharacterPlanet | null;
  transformations: CharacterTransformation[];
};

export type CharacterPage = {
  items: CharacterSummary[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
};
