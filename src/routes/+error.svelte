<script lang="ts">
  import { page } from "$app/state";
  import { Button } from "#lib/shared/ui/button/index.js";
</script>

<svelte:head>
  <title>{page.status} | Dragon Ball Explorer</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
  <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{page.status}</p>
  <h1 class="mt-3 text-3xl font-bold">Não foi possível concluir sua solicitação</h1>
  <p class="mt-3 text-muted-foreground">{page.error?.message ?? "Ocorreu um erro inesperado."}</p>
  <Button href="/" class="mt-6">Voltar ao catálogo</Button>
</section>
