import { error } from "@sveltejs/kit";
import { ApiError } from "#lib/core/api/http.js";
import { loadComparison } from "#lib/features/versus/index.server.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const leftId = Number(params.leftId);
  const rightId = Number(params.rightId);
  if (
    !/^[1-9]\d*$/.test(params.leftId) ||
    !/^[1-9]\d*$/.test(params.rightId) ||
    !Number.isSafeInteger(leftId) ||
    !Number.isSafeInteger(rightId)
  ) {
    error(400, "Identificador de personagem inválido.");
  }
  if (leftId === rightId) error(400, "Escolha dois personagens diferentes.");

  try {
    return await loadComparison(leftId, rightId);
  } catch (cause) {
    if (cause instanceof ApiError) {
      error(
        cause.status === 404 ? 404 : 502,
        "Não foi possível carregar os personagens do versus.",
      );
    }
    throw cause;
  }
};
