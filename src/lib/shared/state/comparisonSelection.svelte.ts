import type { CharacterSummary } from "#lib/shared/models/character.js";

export const MAX_COMPARISON_SIZE = 2;

// Estado de módulo: só deve ser alterado em handlers do cliente, nunca durante o SSR,
// para não vazar seleção entre requisições de usuários diferentes.
let selected = $state<CharacterSummary[]>([]);

export const comparisonSelection = {
  get items() {
    return selected;
  },
  has(id: number) {
    return selected.some((item) => item.id === id);
  },
  get isFull() {
    return selected.length >= MAX_COMPARISON_SIZE;
  },
  toggle(character: CharacterSummary): "added" | "removed" | "full" {
    if (selected.some((item) => item.id === character.id)) {
      selected = selected.filter((item) => item.id !== character.id);
      return "removed";
    }
    if (selected.length >= MAX_COMPARISON_SIZE) return "full";
    selected = [...selected, character];
    return "added";
  },
  // Usado a partir dos detalhes: garante o personagem selecionado, descartando o mais antigo se necessário.
  select(character: CharacterSummary) {
    if (selected.some((item) => item.id === character.id)) return;
    selected = [...selected, character].slice(-MAX_COMPARISON_SIZE);
  },
  clear() {
    selected = [];
  },
};
