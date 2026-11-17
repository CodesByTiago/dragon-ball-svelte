// @vitest-environment jsdom
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vite-plus/test";
import { makeCharacter } from "#lib/core/testing/fixtures.js";
import { comparisonSelection } from "#lib/shared/state/comparisonSelection.svelte.js";
import CharacterDetails from "./CharacterDetails.svelte";

describe("CharacterDetails", () => {
  it("shows the character data, preserving Ki as text", () => {
    render(CharacterDetails, { character: makeCharacter() });

    expect(screen.getByRole("heading", { level: 1, name: "Goku" })).toBeTruthy();
    expect(screen.getByText("60.000.000")).toBeTruthy();
    expect(screen.getAllByText("90 Septillion").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Earth" })).toBeTruthy();
    expect(screen.getByText("Super Saiyan")).toBeTruthy();
  });

  it("selects the character in the app state and links to its catalog page", async () => {
    comparisonSelection.clear();
    const user = userEvent.setup();
    render(CharacterDetails, { character: makeCharacter({ id: 7 }), catalogPage: 3 });

    expect(screen.getByRole("link", { name: "← Voltar ao catálogo" }).getAttribute("href")).toBe(
      "/",
    );
    const compare = screen.getByRole("link", { name: "Comparar personagem" });
    expect(compare.getAttribute("href")).toBe("/?page=3");

    compare.addEventListener("click", (event) => event.preventDefault());
    await user.click(compare);
    expect(comparisonSelection.items.map((item) => item.id)).toEqual([7]);
  });

  it("describes missing data without inventing values", () => {
    render(CharacterDetails, {
      character: makeCharacter({
        affiliation: null,
        image: null,
        originPlanet: null,
        transformations: [],
      }),
    });

    expect(screen.getByText("Imagem indisponível")).toBeTruthy();
    expect(screen.getByText("Planeta de origem não informado.")).toBeTruthy();
    expect(screen.getByText("Nenhuma transformação informada.")).toBeTruthy();
    expect(screen.getByText("Afiliação").nextElementSibling?.textContent).toBe("Não informado");
  });
});
