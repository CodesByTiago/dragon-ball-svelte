import { describe, expect, it } from "vite-plus/test";
import { loadCharacterDetails } from "./server.server.js";

describe("character details loader", () => {
  it("loads a character with planet and transformations, keeping Ki as text", async () => {
    await expect(loadCharacterDetails(1)).resolves.toMatchObject({
      id: 1,
      name: "Goku",
      ki: "60.000.000",
      maxKi: "90 Septillion",
      originPlanet: { name: "Earth" },
      transformations: [{ name: "Super Saiyan" }],
    });
  });

  it("loads a character without transformations", async () => {
    await expect(loadCharacterDetails(2)).resolves.toMatchObject({
      name: "Vegeta",
      transformations: [],
    });
  });

  it("propagates not-found errors", async () => {
    await expect(loadCharacterDetails(999)).rejects.toMatchObject({
      name: "ApiError",
      status: 404,
    });
  });
});
