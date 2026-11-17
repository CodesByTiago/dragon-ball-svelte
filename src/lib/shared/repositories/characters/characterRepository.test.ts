import { describe, expect, it } from "vite-plus/test";
import { getCharacter, getCharacterPage, searchCharacters } from "./characterRepository.server.js";

describe("character repository", () => {
  it("parses a paginated catalog response", async () => {
    const page = await getCharacterPage(1, 12);

    expect(page).toMatchObject({
      currentPage: 1,
      totalPages: 1,
      totalItems: 2,
      items: [
        { id: 1, name: "Goku" },
        { id: 2, name: "Vegeta" },
      ],
    });
  });

  it("supports matching and empty name searches", async () => {
    await expect(searchCharacters("veg")).resolves.toMatchObject([{ id: 2, name: "Vegeta" }]);
    await expect(searchCharacters("no match")).resolves.toEqual([]);
  });

  it("parses character details without interpreting Ki values", async () => {
    const character = await getCharacter(1);

    expect(character).toMatchObject({
      name: "Goku",
      ki: "60.000.000",
      maxKi: "90 Septillion",
      originPlanet: { name: "Earth" },
      transformations: [{ name: "Super Saiyan", ki: "3.000.000" }],
    });
  });

  it("preserves not-found errors for invalid character IDs", async () => {
    await expect(getCharacter(999)).rejects.toMatchObject({ name: "ApiError", status: 404 });
  });
});
