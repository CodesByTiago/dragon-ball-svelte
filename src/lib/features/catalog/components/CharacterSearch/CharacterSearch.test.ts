// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import { makeSummary } from "#lib/core/testing/fixtures.js";
import CharacterSearch from "./CharacterSearch.svelte";

function mockFetch(response: Response | Error) {
  const fetchMock = vi.fn(async () => {
    if (response instanceof Error) throw response;
    return response;
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CharacterSearch", () => {
  it("lists matching characters linking to their details", async () => {
    const fetchMock = mockFetch(
      Response.json([makeSummary(), makeSummary({ id: 12, name: "Gohan" })]),
    );
    const user = userEvent.setup();
    render(CharacterSearch);

    await user.type(screen.getByRole("textbox", { name: "Buscar personagem" }), "go");

    const link = await screen.findByRole("link", { name: /Goku/ });
    expect(link).toHaveProperty("pathname", "/characters/1");
    expect(link.textContent).toContain("Nº 0001");
    expect(screen.getByRole("link", { name: /Gohan/ }).textContent).toContain("Nº 0012");
    expect(fetchMock).toHaveBeenLastCalledWith("/api/characters?name=go", expect.anything());
  });

  it("shows an empty message without matches", async () => {
    mockFetch(Response.json([]));
    const user = userEvent.setup();
    render(CharacterSearch);

    await user.type(screen.getByRole("textbox", { name: "Buscar personagem" }), "zzz");

    expect((await screen.findAllByText("Nenhum personagem encontrado.")).length).toBeGreaterThan(0);
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("shows an error message when the request fails", async () => {
    mockFetch(new Error("network"));
    const user = userEvent.setup();
    render(CharacterSearch);

    await user.type(screen.getByRole("textbox", { name: "Buscar personagem" }), "goku");

    expect(await screen.findByText("Não foi possível buscar. Tente novamente.")).toBeTruthy();
  });

  it("clears the query and suggestions", async () => {
    mockFetch(Response.json([makeSummary()]));
    const user = userEvent.setup();
    render(CharacterSearch);
    const input = screen.getByRole("textbox", { name: "Buscar personagem" }) as HTMLInputElement;

    await user.type(input, "goku");
    await screen.findByRole("link", { name: /Goku/ });
    await user.click(screen.getByRole("button", { name: "Limpar busca" }));

    expect(input.value).toBe("");
    await waitFor(() => expect(screen.queryByRole("link")).toBeNull());
  });
});
