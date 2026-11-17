import { error } from "@sveltejs/kit";
import { ApiError } from "#lib/core/api/http.js";
import { catalogPageFor } from "#lib/features/catalog/index.server.js";
import { loadCharacterDetails } from "#lib/features/character-details/index.server.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  if (!/^[1-9]\d*$/.test(params.id)) {
    error(400, "Identificador de personagem inválido.");
  }

  const id = Number(params.id);
  if (!Number.isSafeInteger(id)) error(400, "Identificador de personagem inválido.");

  try {
    return { character: await loadCharacterDetails(id), catalogPage: catalogPageFor(id) };
  } catch (cause) {
    if (cause instanceof ApiError) {
      if (cause.status === 404) error(404, "Personagem não encontrado.");
      error(
        502,
        "Não foi possível carregar os detalhes do personagem. Tente novamente mais tarde.",
      );
    }
    throw cause;
  }
};
