<script lang="ts">
  import { CharacterDetails } from "#lib/features/character-details/index.js";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>{data.character.name} | Dragon Ball Explorer</title>
  <meta
    name="description"
    content={`Conheça ${data.character.name}: informações, Ki, planeta de origem e transformações disponíveis no Dragon Ball Explorer.`}
  />
</svelte:head>

<CharacterDetails character={data.character} catalogPage={data.catalogPage} />
