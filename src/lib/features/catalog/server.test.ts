import { describe, expect, it } from "vite-plus/test";
import {
  CATALOG_PAGE_SIZE,
  catalogPageFor,
  loadCatalog,
  searchCatalogCharacters,
} from "./server.server.js";

describe("catalog loader", () => {
  it("loads a catalog page", async () => {
    expect(CATALOG_PAGE_SIZE).toBe(12);
    expect([1, 12, 13, 25].map(catalogPageFor)).toEqual([1, 1, 2, 3]);
    await expect(loadCatalog(1)).resolves.toMatchObject({
      currentPage: 1,
      items: [{ name: "Goku" }, { name: "Vegeta" }],
    });
  });

  it("searches by name, returning an empty list without matches", async () => {
    await expect(searchCatalogCharacters("goku")).resolves.toMatchObject([{ name: "Goku" }]);
    await expect(searchCatalogCharacters("zzz")).resolves.toEqual([]);
  });
});
