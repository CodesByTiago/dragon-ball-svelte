<script lang="ts">
  import { optimizedImage } from "#lib/shared/images/optimizedImage.js";
  import type { CharacterSummary } from "#lib/shared/models/character.js";

  let query = $state("");
  let suggestions = $state<CharacterSummary[]>([]);
  let status = $state<"idle" | "loading" | "success" | "empty" | "error">("idle");
  let requestId = 0;

  $effect(() => {
    const name = query.trim();
    const currentRequestId = ++requestId;

    if (!name) {
      suggestions = [];
      status = "idle";
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      status = "loading";

      try {
        const response = await fetch(`/api/characters?name=${encodeURIComponent(name)}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Não foi possível buscar personagens.");

        const results = (await response.json()) as CharacterSummary[];
        if (currentRequestId !== requestId) return;
        suggestions = results;
        status = results.length > 0 ? "success" : "empty";
      } catch {
        if (controller.signal.aborted || currentRequestId !== requestId) return;
        suggestions = [];
        status = "error";
      }
    }, 250);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  });
</script>

<section class="relative w-full" aria-label="Busca de personagens">
  <label for="character-search" class="mb-2 block text-sm font-medium">Buscar personagem</label>
  <div class="relative">
    <input
      id="character-search"
      bind:value={query}
      type="text"
      placeholder="Digite o nome de um personagem"
      autocomplete="off"
      aria-describedby="character-search-status"
      class="h-14 w-full rounded-xl border bg-card px-6 pr-14 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
    />
    {#if query}
      <button
        type="button"
        class="absolute top-1/2 right-4 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label="Limpar busca"
        onclick={() => (query = "")}
      >
        ✕
      </button>
    {/if}
  </div>

  <div id="character-search-status" class="sr-only" aria-live="polite">
    {#if status === "loading"}
      Buscando personagens.
    {:else if status === "empty"}
      Nenhum personagem encontrado.
    {:else if status === "error"}
      Não foi possível buscar personagens. Tente novamente.
    {:else if status === "success"}
      {suggestions.length} sugestões encontradas.
    {/if}
  </div>

  {#if status === "success"}
    <ul class="absolute z-20 mt-2 max-h-96 w-full overflow-y-auto rounded-xl border bg-popover p-2 text-popover-foreground shadow-xl">
      {#each suggestions as character (character.id)}
        <li>
          <a
            href={`/characters/${character.id}`}
            class="flex items-center gap-4 rounded-lg px-3 py-2 hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
          >
            {#if character.image}
              <img
                {...optimizedImage(character.image, 96)}
                sizes="48px"
                alt=""
                class="size-12 shrink-0 object-contain"
                loading="lazy"
              />
            {:else}
              <span class="size-12 shrink-0"></span>
            {/if}
            <span class="min-w-0 flex-1 truncate font-medium">{character.name}</span>
            <span class="text-sm text-muted-foreground">Nº {String(character.id).padStart(4, "0")}</span>
          </a>
        </li>
      {/each}
    </ul>
  {:else if status === "loading"}
    <p class="mt-2 text-sm text-muted-foreground" aria-hidden="true">Buscando...</p>
  {:else if status === "empty"}
    <p class="mt-2 text-sm text-muted-foreground">Nenhum personagem encontrado.</p>
  {:else if status === "error"}
    <p class="mt-2 text-sm text-destructive">Não foi possível buscar. Tente novamente.</p>
  {/if}
</section>
