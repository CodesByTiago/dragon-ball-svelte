<script lang="ts">
  import { ComparisonView } from "#lib/features/versus/index.js";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  const firstCharacter = $derived(data.characters[0]);
  const secondCharacter = $derived(data.characters[1]);
</script>

<svelte:head>
  <title>{firstCharacter.name} vs {secondCharacter.name} | Dragon Ball Explorer</title>
  <meta
    name="description"
    content={`Compare as informações, o Ki e as transformações de ${firstCharacter.name} e ${secondCharacter.name}.`}
  />
  <meta property="og:title" content={`${firstCharacter.name} vs ${secondCharacter.name}`} />
</svelte:head>

<ComparisonView characters={[firstCharacter, secondCharacter]} />
