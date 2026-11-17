import { json, type RequestHandler } from "@sveltejs/kit";
import { ApiError } from "#lib/core/api/http.js";
import { searchCatalogCharacters } from "#lib/features/catalog/index.server.js";

export const GET: RequestHandler = async ({ url, request }) => {
  const name = url.searchParams.get("name")?.trim() ?? "";
  if (!name) return json([]);

  try {
    return json(await searchCatalogCharacters(name, request.signal));
  } catch (cause) {
    if (cause instanceof ApiError) {
      return json(
        { message: "Não foi possível buscar personagens. Tente novamente mais tarde." },
        { status: 502 },
      );
    }
    throw cause;
  }
};
