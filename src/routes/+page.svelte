<script lang="ts">
  import { CatalogView } from "#lib/features/catalog/index.js";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>Dragon Ball Explorer | Catálogo de personagens</title>
  <meta
    name="description"
    content="Explore personagens de Dragon Ball, encontre seus favoritos e compare suas informações."
  />
  <meta property="og:title" content="Dragon Ball Explorer" />
  <meta
    property="og:description"
    content="Explore personagens de Dragon Ball e compare suas informações."
  />
</svelte:head>

<CatalogView catalog={data.catalog} />
