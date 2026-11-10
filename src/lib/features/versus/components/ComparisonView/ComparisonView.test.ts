// @vitest-environment jsdom
import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vite-plus/test";
import { makeCharacter } from "#lib/core/testing/fixtures.js";
import ComparisonView from "./ComparisonView.svelte";

const goku = makeCharacter();
const vegeta = makeCharacter({ id: 2, name: "Vegeta", ki: "54.000.000", transformations: [] });

describe("ComparisonView", () => {
  it("shows both characters and does not declare a winner", () => {
    render(ComparisonView, { characters: [goku, vegeta] });

    expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/Goku\s+vs\s+Vegeta/);
    expect(screen.getByRole("heading", { level: 2, name: "Goku" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "Vegeta" })).toBeTruthy();
    expect(screen.getByText("60.000.000")).toBeTruthy();
    expect(screen.getByText("54.000.000")).toBeTruthy();
    expect(screen.getByText(/Não é indicado um vencedor/)).toBeTruthy();
  });

  it("shows placeholders for missing images and data", () => {
    render(ComparisonView, {
      characters: [makeCharacter({ image: null, affiliation: null }), vegeta],
    });

    expect(screen.getByText("Imagem indisponível")).toBeTruthy();
    expect(screen.getAllByText("Não informado").length).toBeGreaterThan(0);
  });

  it("links back to the catalog", () => {
    render(ComparisonView, { characters: [goku, vegeta] });

    expect(screen.getByRole("link", { name: "Voltar ao catálogo" }).getAttribute("href")).toBe("/");
  });
});
