// @vitest-environment jsdom
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { makeSummary } from "#lib/core/testing/fixtures.js";
import { comparisonSelection } from "#lib/shared/state/comparisonSelection.svelte.js";
import CatalogView from "./CatalogView.svelte";

const goku = makeSummary();
const vegeta = makeSummary({ id: 2, name: "Vegeta" });
const trunks = makeSummary({ id: 3, name: "Trunks" });

function catalog(items = [goku, vegeta, trunks], overrides = {}) {
  return { items, currentPage: 1, totalPages: 1, totalItems: items.length, ...overrides };
}

describe("CatalogView", () => {
  beforeEach(() => comparisonSelection.clear());

  it("renders cards linking to each character's details", () => {
    render(CatalogView, { catalog: catalog() });

    expect(screen.getByRole("link", { name: "Ver detalhes de Goku" })).toHaveProperty(
      "pathname",
      "/characters/1",
    );
    expect(screen.getAllByRole("button", { name: "Comparar" })).toHaveLength(3);
  });

  it("shows an empty state when the page has no characters", () => {
    render(CatalogView, { catalog: catalog([]) });

    expect(screen.getByText("Nenhum personagem nesta página")).toBeTruthy();
  });

  it("builds the versus link after two characters are selected", async () => {
    const user = userEvent.setup();
    render(CatalogView, { catalog: catalog() });

    await user.click(screen.getAllByRole("button", { name: "Comparar" })[0]!);
    expect(screen.queryByRole("link", { name: /Comparar Goku e/ })).toBeNull();

    await user.click(screen.getAllByRole("button", { name: "Comparar" })[0]!);
    const link = screen.getByRole("link", { name: "Comparar Goku e Vegeta" });
    expect(link).toHaveProperty("pathname", "/versus/1/2");
  });

  it("blocks a third selection and allows removing one", async () => {
    const user = userEvent.setup();
    comparisonSelection.select(goku);
    comparisonSelection.select(vegeta);
    render(CatalogView, { catalog: catalog() });

    const compare = screen.getByRole("button", { name: "Comparar" });
    expect((compare as HTMLButtonElement).disabled).toBe(true);

    await user.click(screen.getAllByRole("button", { name: "Remover" })[0]!);
    const enabled = screen.getAllByRole("button", { name: "Comparar" }) as HTMLButtonElement[];
    expect(enabled).toHaveLength(2);
    expect(enabled.every((button) => !button.disabled)).toBe(true);
    expect(screen.queryByRole("link", { name: /Comparar Goku e/ })).toBeNull();
  });

  it("clears the whole comparison", async () => {
    const user = userEvent.setup();
    comparisonSelection.select(goku);
    comparisonSelection.select(vegeta);
    render(CatalogView, { catalog: catalog() });

    await user.click(screen.getByRole("button", { name: "Limpar comparação" }));

    expect(comparisonSelection.items).toEqual([]);
    expect(screen.queryByRole("button", { name: "Limpar comparação" })).toBeNull();
    expect(screen.getAllByRole("button", { name: "Comparar" })).toHaveLength(3);
  });

  it("restores the selection kept in the application state", () => {
    comparisonSelection.select(goku);
    render(CatalogView, { catalog: catalog() });

    expect(screen.getByRole("button", { name: "Remover" })).toBeTruthy();
    expect(screen.getByText(/Goku selecionado/)).toBeTruthy();
  });

  it("keeps pagination links free of selection parameters", () => {
    render(CatalogView, { catalog: catalog([goku], { currentPage: 2, totalPages: 3 }) });

    expect(screen.getByRole("link", { name: "Página anterior" }).getAttribute("href")).toBe(
      "/?page=1",
    );
    expect(screen.getByRole("link", { name: "Próxima página" }).getAttribute("href")).toBe(
      "/?page=3",
    );
  });
});
