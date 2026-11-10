<script lang="ts">
  import type { Character } from "#lib/shared/models/character.js";
  import { comparisonSelection } from "#lib/shared/state/comparisonSelection.svelte.js";
  import { Button } from "#lib/shared/ui/button/index.js";

  type Props = {
    character: Character;
    catalogPage?: number;
  };

  let { character, catalogPage = 1 }: Props = $props();

  function display(value: string | null | undefined) {
    return value?.trim() || "Não informado";
  }
</script>

<div class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  <nav class="mb-6 flex flex-wrap items-center justify-between gap-3" aria-label="Ações do personagem">
    <Button href="/" variant="ghost" class="px-0">← Voltar ao catálogo</Button>
    <Button
      href={`/?page=${catalogPage}`}
      onclick={() => comparisonSelection.select(character)}
    >
      Comparar personagem
    </Button>
  </nav>

  <article class="overflow-hidden rounded-2xl border bg-card shadow-sm">
    <header class="grid bg-linear-to-br from-orange-50 via-background to-sky-50 dark:from-orange-950/25 dark:via-card dark:to-sky-950/25 md:grid-cols-2">
      <div
        class="flex items-center justify-center bg-linear-to-br from-orange-100/70 via-amber-50 to-sky-100/60 p-6 dark:from-orange-950/30 dark:via-muted dark:to-sky-950/30"
      >
        {#if character.image}
          <img
            src={character.image}
            alt={character.name}
            class="h-80 w-full object-contain md:h-96"
            width="640"
            height="480"
          />
        {:else}
          <div class="flex h-80 items-center justify-center text-sm text-muted-foreground md:h-96">
            Imagem indisponível
          </div>
        {/if}
      </div>
      <div class="flex flex-col justify-center p-6 sm:p-10">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Nº {String(character.id).padStart(4, "0")}
        </p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">{character.name}</h1>
        <div class="mt-4 flex flex-wrap gap-2">
          {#each [character.race, character.gender].filter((value): value is string => Boolean(value)) as trait (trait)}
            <span class="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground">
              {trait}
            </span>
          {/each}
        </div>
        <dl class="mt-6 grid grid-cols-2 gap-4">
          <div>
            <dt class="text-sm text-muted-foreground">Ki</dt>
            <dd class="mt-1 font-semibold">{display(character.ki)}</dd>
          </div>
          <div>
            <dt class="text-sm text-muted-foreground">Ki máximo</dt>
            <dd class="mt-1 font-semibold">{display(character.maxKi)}</dd>
          </div>
        </dl>
        {#if character.description}
          <p class="mt-6 text-base leading-7 text-muted-foreground">{character.description}</p>
        {/if}
      </div>
    </header>

    <div class="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_1fr]">
      <section aria-labelledby="character-information-heading">
        <h2 id="character-information-heading" class="border-l-4 border-primary pl-3 text-xl font-semibold">Informações</h2>
        <dl class="mt-4 divide-y rounded-xl border px-4">
          <div class="flex justify-between gap-4 py-3 text-sm">
            <dt class="text-muted-foreground">Raça</dt>
            <dd class="text-right">{display(character.race)}</dd>
          </div>
          <div class="flex justify-between gap-4 py-3 text-sm">
            <dt class="text-muted-foreground">Gênero</dt>
            <dd class="text-right">{display(character.gender)}</dd>
          </div>
          <div class="flex justify-between gap-4 py-3 text-sm">
            <dt class="text-muted-foreground">Afiliação</dt>
            <dd class="text-right">{display(character.affiliation)}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="origin-planet-heading">
        <h2 id="origin-planet-heading" class="border-l-4 border-sky-600 pl-3 text-xl font-semibold dark:border-sky-400">Planeta de origem</h2>
        {#if character.originPlanet}
          <article class="mt-4 overflow-hidden rounded-xl border">
            {#if character.originPlanet.image}
              <img
                src={character.originPlanet.image}
                alt={character.originPlanet.name}
                class="aspect-16/7 w-full bg-muted object-cover"
                loading="lazy"
                width="640"
                height="280"
              />
            {/if}
            <div class="p-4">
              <h3 class="font-semibold">{character.originPlanet.name}</h3>
              <p class="mt-2 text-sm leading-6 text-muted-foreground">
                {display(character.originPlanet.description)}
              </p>
              {#if character.originPlanet.isDestroyed !== null}
                <p class="mt-3 inline-flex rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
                  Estado: {character.originPlanet.isDestroyed ? "Destruído" : "Não destruído"}
                </p>
              {/if}
            </div>
          </article>
        {:else}
          <p class="mt-4 rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
            Planeta de origem não informado.
          </p>
        {/if}
      </section>
    </div>

    <section class="border-t bg-linear-to-br from-amber-50/60 via-background to-orange-50/60 p-5 dark:from-amber-950/10 dark:via-background dark:to-orange-950/10 sm:p-8" aria-labelledby="transformations-heading">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="transformations-heading" class="border-l-4 border-primary pl-3 text-xl font-semibold">Transformações</h2>
        <span class="text-sm text-muted-foreground">
          {character.transformations.length} informadas
        </span>
      </div>
      {#if character.transformations.length > 0}
        <ul class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {#each character.transformations as transformation (transformation.id)}
            <li>
              <article class="flex h-full items-center gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-primary/40">
                {#if transformation.image}
                  <img
                    src={transformation.image}
                    alt=""
                    class="h-24 w-20 shrink-0 rounded-lg bg-accent/70 object-contain p-1"
                    loading="lazy"
                                        width="80"
                                        height="96"
                  />
                {/if}
                <div class="min-w-0">
                  <h3 class="truncate font-medium">{transformation.name}</h3>
                  <p class="mt-1 text-sm text-muted-foreground">
                    Ki: {display(transformation.ki)}
                  </p>
                </div>
              </article>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="mt-4 rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
          Nenhuma transformação informada.
        </p>
      {/if}
    </section>
  </article>
</div>
