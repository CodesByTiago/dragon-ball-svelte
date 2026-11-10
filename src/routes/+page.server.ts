import { error } from "@sveltejs/kit";
import { ApiError } from "#lib/core/api/http.js";
import { loadCatalog } from "#lib/features/catalog/index.server.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const rawPage = url.searchParams.get("page") ?? "1";
  if (!/^[1-9]\d*$/.test(rawPage)) error(400, "Número de página inválido.");

  const page = Number(rawPage);
  if (!Number.isSafeInteger(page)) error(400, "Número de página inválido.");

  try {
    const catalog = await loadCatalog(page);
    if (catalog.totalPages > 0 && page > catalog.totalPages) {
      error(404, "Esta página do catálogo não existe.");
    }

    return { catalog };
  } catch (cause) {
    if (cause instanceof ApiError) {
      error(502, "Não foi possível carregar o catálogo. Tente novamente mais tarde.");
    }
    throw cause;
  }
};
