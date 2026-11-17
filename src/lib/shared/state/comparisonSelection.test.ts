import { beforeEach, describe, expect, it } from "vite-plus/test";
import { makeSummary } from "#lib/core/testing/fixtures.js";
import { comparisonSelection } from "./comparisonSelection.svelte.js";

const goku = makeSummary();
const vegeta = makeSummary({ id: 2, name: "Vegeta" });
const trunks = makeSummary({ id: 3, name: "Trunks" });

describe("comparison selection", () => {
  beforeEach(() => comparisonSelection.clear());

  it("toggles characters up to two", () => {
    expect(comparisonSelection.toggle(goku)).toBe("added");
    expect(comparisonSelection.toggle(vegeta)).toBe("added");
    expect(comparisonSelection.toggle(trunks)).toBe("full");
    expect(comparisonSelection.items.map((item) => item.id)).toEqual([1, 2]);

    expect(comparisonSelection.toggle(goku)).toBe("removed");
    expect(comparisonSelection.items.map((item) => item.id)).toEqual([2]);
  });

  it("selects from details without duplicating, dropping the oldest when full", () => {
    comparisonSelection.select(goku);
    comparisonSelection.select(goku);
    comparisonSelection.select(vegeta);
    expect(comparisonSelection.items.map((item) => item.id)).toEqual([1, 2]);

    comparisonSelection.select(trunks);
    expect(comparisonSelection.items.map((item) => item.id)).toEqual([2, 3]);
  });
});
