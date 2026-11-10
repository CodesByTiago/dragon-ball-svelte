<script lang="ts">
  import type { Character } from "#lib/shared/models/character.js";
  import { Button } from "#lib/shared/ui/button/index.js";

  type Props = {
    characters: [Character, Character];
  };

  let { characters }: Props = $props();

  function display(value: string | null | undefined) {
    return value?.trim() || "Não informado";
  }
</script>

<div class="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
  <Button href="/" variant="outline" class="mb-6">Voltar ao catálogo</Button>

  <header class="mb-8">
    <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Versus</p>
    <h1 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
      {characters[0].name} <span class="text-muted-foreground">vs</span> {characters[1].name}
    </h1>
    <p class="mt-3 max-w-2xl text-muted-foreground">
      Compare os dados disponíveis. Não é indicado um vencedor.
    </p>
  </header>

  <div class="grid gap-5 md:grid-cols-2">
    {#each characters as character (character.id)}
      <article class="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div class="flex h-56 items-center justify-center overflow-hidden bg-linear-to-br from-orange-100/70 via-amber-50 to-sky-100/60 p-4 sm:h-72 dark:from-orange-950/30 dark:via-muted dark:to-sky-950/30">
          {#if character.image}
            <img
              src={character.image}
              alt={character.name}
              class="size-full object-contain"
              width="320"
              height="240"
            />
          {:else}
            <p class="text-sm text-muted-foreground">Imagem indisponível</p>
          {/if}
        </div>
        <div class="border-b px-5 py-4 sm:px-6">
          <h2 class="text-2xl font-bold">{character.name}</h2>
          <p class="mt-1 text-sm text-muted-foreground">
            {display(character.race)} · {display(character.gender)}
          </p>
        </div>

        <div class="space-y-6 p-5 sm:p-6">
          <section aria-labelledby={`character-${character.id}-details`}>
            <h3 id={`character-${character.id}-details`} class="text-sm font-semibold uppercase tracking-wide">
              Informações
            </h3>
            <dl class="mt-3 divide-y">
              <div class="flex justify-between gap-4 py-2 text-sm">
                <dt class="text-muted-foreground">Afiliação</dt>
                <dd class="text-right">{display(character.affiliation)}</dd>
              </div>
              <div class="flex justify-between gap-4 py-2 text-sm">
                <dt class="text-muted-foreground">Ki</dt>
                <dd class="text-right">{display(character.ki)}</dd>
              </div>
              <div class="flex justify-between gap-4 py-2 text-sm">
                <dt class="text-muted-foreground">Ki máximo</dt>
                <dd class="text-right">{display(character.maxKi)}</dd>
              </div>
              <div class="flex justify-between gap-4 py-2 text-sm">
                <dt class="text-muted-foreground">Planeta de origem</dt>
                <dd class="text-right">{display(character.originPlanet?.name)}</dd>
              </div>
            </dl>
            {#if character.description}
              <p class="mt-4 text-sm leading-6 text-muted-foreground">{character.description}</p>
            {/if}
          </section>

          <section aria-labelledby={`character-${character.id}-transformations`}>
            <h3
              id={`character-${character.id}-transformations`}
              class="text-sm font-semibold uppercase tracking-wide"
            >
              Transformações ({character.transformations.length})
            </h3>
            {#if character.transformations.length > 0}
              <ul class="mt-3 space-y-3">
                {#each character.transformations as transformation (transformation.id)}
                  <li class="flex items-center gap-3 rounded-lg border p-3">
                    {#if transformation.image}
                      <img
                        src={transformation.image}
                        alt=""
                        class="h-20 w-16 shrink-0 rounded-md bg-accent/70 object-contain p-1"
                        loading="lazy"
                                                width="64"
                                                height="80"
                      />
                    {/if}
                    <div class="min-w-0">
                      <p class="truncate font-medium">{transformation.name}</p>
                      <p class="text-sm text-muted-foreground">Ki: {display(transformation.ki)}</p>
                    </div>
                  </li>
                {/each}
              </ul>
            {:else}
              <p class="mt-3 text-sm text-muted-foreground">Nenhuma transformação informada.</p>
            {/if}
          </section>
        </div>
      </article>
    {/each}
  </div>
</div>
