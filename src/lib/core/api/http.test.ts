import { describe, expect, it } from "vite-plus/test";
import { ApiError, http } from "#lib/core/api/http.js";

describe("shared HTTP client", () => {
  it("loads character data through the shared Axios instance", async () => {
    const response = await http.get<{ items: { name: string }[] }>("/characters");

    expect(response.data.items[0]?.name).toBe("Goku");
  });

  it("normalizes HTTP failures with their status code", async () => {
    await expect(http.get("/characters/999")).rejects.toMatchObject({
      name: "ApiError",
      status: 404,
    } satisfies Partial<ApiError>);
  });
});
