<script lang="ts">
  import { onMount } from "svelte";
  import { optimizedImage } from "#lib/shared/images/optimizedImage.js";
  import type { CharacterPage, CharacterSummary } from "#lib/shared/models/character.js";
  import { comparisonSelection } from "#lib/shared/state/comparisonSelection.svelte.js";
  import { Button } from "#lib/shared/ui/button/index.js";
  import { CharacterSearch } from "../CharacterSearch/index.js";

  type Props = {
    catalog: CharacterPage;
  };

  let { catalog }: Props = $props();
  let selected = $derived(comparisonSelection.items);
  let selectionMessage = $state("");
  let hydrated = $state(false);
  onMount(() => {
    hydrated = true;
  });
  let pageNumbers = $derived.by(() => {
    const count = Math.min(3, catalog.totalPages);
    const start = Math.max(1, Math.min(catalog.currentPage - 1, catalog.totalPages - count + 1));
    return Array.from({ length: count }, (_, index) => start + index);
  });

  function clearSelection() {
    comparisonSelection.clear();
    selectionMessage = "Comparação limpa.";
  }

  function toggleSelection(character: CharacterSummary) {
    const result = comparisonSelection.toggle(character);
    selectionMessage =
      result === "removed"
        ? `${character.name} removido da comparação.`
        : result === "added"
          ? `${character.name} adicionado à comparação.`
          : "Remova um personagem antes de escolher outro.";
  }

  function comparisonHref(characters: CharacterSummary[]) {
    return `/versus/${characters[0]?.id}/${characters[1]?.id}`;
  }
</script>

<div class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  <section class="rounded-2xl border bg-linear-to-br from-orange-50 via-background to-amber-100/70 p-6 shadow-sm dark:from-orange-950/30 dark:via-background dark:to-amber-900/20 sm:p-8">
    <div>
      <p class="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        Dragon Ball Explorer
      </p>
      <h1 class="text-3xl font-bold tracking-tight sm:text-5xl">Explore o universo Dragon Ball</h1>
      <p class="mt-4 text-base leading-7 text-muted-foreground">
        Encontre personagens, conheça suas histórias e escolha dois para comparar.
      </p>
    </div>
  </section>

  <div class="my-6">
    <CharacterSearch />
  </div>

  <section class="mb-8 rounded-xl border bg-muted/40 p-4 sm:flex sm:items-center sm:justify-between">
    <div>
      <h2 class="font-semibold text-primary">Sua comparação</h2>
      <p class="text-sm text-muted-foreground" aria-live="polite">
        {#if selected.length === 0}
          Escolha dois personagens do catálogo ou da busca.
        {:else if selected.length === 1}
          {selected[0]?.name} selecionado. Escolha mais um personagem.
        {:else}
          {selected[0]?.name} e {selected[1]?.name} selecionados
        {/if}
      </p>
      <p class="sr-only" aria-live="polite">{selectionMessage}</p>
    </div>
    {#if selected.length > 0}
      <div class="mt-3 flex flex-wrap gap-2 sm:mt-0">
        {#if selected.length === 2}
          <Button href={comparisonHref(selected)}>
            Comparar {selected[0]?.name} e {selected[1]?.name}
          </Button>
        {/if}
        <Button variant="outline" class="cursor-pointer" onclick={clearSelection}>
          Limpar comparação
        </Button>
      </div>
    {/if}
  </section>

  {#if catalog.items.length === 0}
    <section class="rounded-xl border border-dashed p-12 text-center">
      <h2 class="text-xl font-semibold">Nenhum personagem nesta página</h2>
      <p class="mt-2 text-muted-foreground">Tente outra página do catálogo.</p>
    </section>
  {:else}
    <section aria-labelledby="catalog-heading">
      <div class="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="catalog-heading" class="text-2xl font-bold">Catálogo de personagens</h2>
          <p class="mt-1 text-sm text-muted-foreground">
            {catalog.totalItems} personagens • página {catalog.currentPage} de {catalog.totalPages}
          </p>
        </div>
      </div>

      <ul class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {#each catalog.items as character (character.id)}
          {@const isSelected = selected.some((item) => item.id === character.id)}
          <li>
            <article class="flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
              <a
                href={`/characters/${character.id}`}
                class="group flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-ring"
                aria-label={`Ver detalhes de ${character.name}`}
              >
                <span class="relative block aspect-square overflow-hidden bg-linear-to-br from-sky-50 via-muted to-orange-50 dark:from-sky-950/30 dark:via-muted dark:to-orange-950/30">
                  {#if character.image}
                    <img
                      {...optimizedImage(character.image, 320)}
                      sizes="(min-width: 1280px) 200px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      alt=""
                      class="size-full object-contain p-3 transition-transform group-hover:scale-105"
                      loading="lazy"
                      width="320"
                      height="320"
                    />
                  {:else}
                    <span class="flex size-full items-center justify-center text-sm text-muted-foreground">
                      Imagem indisponível
                    </span>
                  {/if}
                  <span aria-hidden="true" class="absolute right-3 bottom-3 rounded-full bg-accent/80 px-3 py-1 text-xs font-semibold text-accent-foreground sm:top-3 sm:bottom-auto sm:bg-accent">
                    Nº {String(character.id).padStart(4, "0")}
                  </span>
                </span>
                <span class="flex items-center justify-between gap-2 border-t px-3 py-3 font-semibold group-hover:text-primary">
                  <span class="truncate">{character.name}</span>
                  <span aria-hidden="true" class="text-muted-foreground">→</span>
                </span>
              </a>
              <div class="mt-auto border-t p-2">
                <Button
                  variant={isSelected ? "secondary" : "ghost"}
                  class="w-full cursor-pointer"
                  disabled={!hydrated || (!isSelected && selected.length === 2)}
                  aria-pressed={isSelected}
                  onclick={() => toggleSelection(character)}
                >
                  {isSelected ? "Remover" : "Comparar"}
                </Button>
              </div>
            </article>
          </li>
        {/each}
      </ul>
    </section>
  {/if}

  {#if catalog.totalPages > 1}
    <nav class="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Paginação do catálogo">
      <Button
        href={catalog.currentPage > 1 ? "/?page=1" : undefined}
        disabled={catalog.currentPage <= 1}
        variant="outline"
        size="icon-lg"
        aria-label="Primeira página"
      >
        <span aria-hidden="true">«</span>
      </Button>
      <Button
        href={catalog.currentPage > 1 ? `/?page=${catalog.currentPage - 1}` : undefined}
        disabled={catalog.currentPage <= 1}
        variant="outline"
        size="icon-lg"
        aria-label="Página anterior"
      >
        <span aria-hidden="true">‹</span>
      </Button>
      {#each pageNumbers as pageNumber (pageNumber)}
        <Button
          href={`/?page=${pageNumber}`}
          variant={pageNumber === catalog.currentPage ? "default" : "outline"}
          size="icon-lg"
          aria-label={`Página ${pageNumber}`}
          aria-current={pageNumber === catalog.currentPage ? "page" : undefined}
        >
          {pageNumber}
        </Button>
      {/each}
      <Button
        href={catalog.currentPage < catalog.totalPages ? `/?page=${catalog.currentPage + 1}` : undefined}
        disabled={catalog.currentPage >= catalog.totalPages}
        variant="outline"
        size="icon-lg"
        aria-label="Próxima página"
      >
        <span aria-hidden="true">›</span>
      </Button>
      <Button
        href={catalog.currentPage < catalog.totalPages ? `/?page=${catalog.totalPages}` : undefined}
        disabled={catalog.currentPage >= catalog.totalPages}
        variant="outline"
        size="icon-lg"
        aria-label="Última página"
      >
        <span aria-hidden="true">»</span>
      </Button>
    </nav>
  {/if}
</div>
