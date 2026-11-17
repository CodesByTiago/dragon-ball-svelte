import { describe, expect, it } from "vite-plus/test";
import { loadComparison } from "./server.server.js";

describe("versus loader", () => {
  it("loads both characters in the requested order without declaring a winner", async () => {
    const result = await loadComparison(2, 1);

    expect(result.characters.map((character) => character.name)).toEqual(["Vegeta", "Goku"]);
    expect(result).not.toHaveProperty("winner");
  });

  it("fails when either character is not found", async () => {
    await expect(loadComparison(1, 999)).rejects.toMatchObject({ name: "ApiError", status: 404 });
    await expect(loadComparison(999, 1)).rejects.toMatchObject({ name: "ApiError", status: 404 });
  });
});
