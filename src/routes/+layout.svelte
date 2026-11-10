<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import { Button } from '#lib/shared/ui/button/index.js';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
	let theme = $state<'light' | 'dark'>('light');
	let themeError = $state('');

	function applyTheme(nextTheme: 'light' | 'dark') {
		theme = nextTheme;
		document.documentElement.classList.toggle('dark', nextTheme === 'dark');
	}

	function toggleTheme() {
		const nextTheme = theme === 'light' ? 'dark' : 'light';
		applyTheme(nextTheme);

		try {
			localStorage.setItem('dragon-ball-explorer-theme', nextTheme);
			themeError = '';
		} catch {
			themeError = 'O tema foi alterado, mas não foi possível salvar sua preferência neste navegador.';
		}
	}

	onMount(() => {
		try {
			const preference = localStorage.getItem('dragon-ball-explorer-theme');
			if (preference === 'light' || preference === 'dark') applyTheme(preference);
		} catch {
			themeError = 'Não foi possível restaurar sua preferência de tema neste navegador.';
			document.documentElement.classList.remove('dark');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="color-scheme" content="light dark" />
</svelte:head>

<div class="min-h-screen">
	<header class="border-b bg-background">
		<div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
			<a href="/" class="flex items-center gap-2 font-bold tracking-tight">
				<img src={favicon} alt="" class="size-7" width="28" height="28" />
				Dragon Ball Explorer
			</a>
			<Button variant="outline" class="cursor-pointer" aria-label={`Ativar tema ${theme === 'light' ? 'escuro' : 'claro'}`} onclick={toggleTheme}>
				{#if theme === 'light'}
					<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
					</svg>
					Tema escuro
				{:else}
					<svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<circle cx="12" cy="12" r="4" />
						<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
					</svg>
					Tema claro
				{/if}
			</Button>
		</div>
	</header>
	{#if themeError}
		<p class="border-b bg-muted px-4 py-2 text-center text-sm text-muted-foreground" role="status">
			{themeError}
		</p>
	{/if}
	<main>{@render children()}</main>
</div>
