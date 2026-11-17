# Estilização

## Stack obrigatória

- **Tailwind CSS 4**, integrado ao Vite por `@tailwindcss/vite`.
- **shadcn-svelte**, obrigatório para os componentes de interface.
- Svelte 5 para componentes e estados.
- TypeScript para lógica de interface.

Documentação: [Tailwind CSS](https://tailwindcss.com/docs), [shadcn-svelte](https://www.shadcn-svelte.com/docs) e [CSS no Svelte](https://svelte.dev/docs/svelte/style).

## Princípios

- Use utilities Tailwind no markup para layout, espaçamento, tipografia, cores, responsividade e estados comuns.
- Mantenha as classes em uma linha legível e evite listas excessivamente longas; extraia padrões repetidos em componentes Svelte com significado.
- Para controles e padrões de interface cobertos pelo shadcn-svelte, use seus componentes gerados em `src/lib/shared/ui/` (por exemplo, Button, Input, Select, Dialog e componentes de formulário). Não substitua um componente disponível por um controle nativo ou implementação visual própria.
- Se um componente necessário ainda não estiver gerado no projeto, adicione-o à biblioteca compartilhada seguindo o procedimento oficial do shadcn-svelte; não copie uma implementação manual paralela. Envolva o componente compartilhado em componentes de feature quando precisar de comportamento ou apresentação específica do produto.
- Use elementos HTML semânticos diretamente para conteúdo e estruturas que não sejam componentes de interface cobertos pela biblioteca, como headings, parágrafos, listas, imagens e landmarks.
- Use `<style>` escopado para estilos específicos que não sejam bem expressos por utilities ou para animações e regras complexas.
- Use `src/app.css` para importar Tailwind, definir tokens de design com `@theme`, tipografia e regras globais. Importe esse arquivo uma única vez no layout raiz.
- Reutilize padrões visuais compartilhados sem criar componentes genéricos antes de haver mais de um caso de uso.
- Use os tokens de tema shadcn para acentos consistentes; a paleta do produto combina laranja dourado inspirado em Dragon Ball com azul como cor complementar. Defina os valores para os temas claro e escuro em `src/app.css`, mantendo contraste acessível e evitando cores pontuais desconectadas dos tokens.
- Tailwind CSS e shadcn-svelte são obrigatórios; mantenha suas integrações e tokens coerentes. Não introduza CSS Modules ou outra biblioteca de componentes sem uma decisão arquitetural específica.

## Exemplo

```svelte
<article class="grid gap-2 rounded-xl border border-border bg-card p-4 shadow-sm">
	<h2 class="text-lg font-semibold text-foreground">{character.name}</h2>
	<p class="text-sm text-muted-foreground">{character.race}</p>
</article>
```

Defina os tokens usados pelos componentes em `src/app.css` com `@theme`; evite valores de tema arbitrários e repetidos.

## Convenções

1. Use nomes de componente em `PascalCase.svelte`; classes utilitárias são escritas diretamente no atributo `class`.
2. Mantenha os componentes shadcn-svelte em `src/lib/shared/ui/`; features compõem esses componentes e não duplicam seus controles-base.
3. Prefira elementos HTML semânticos para conteúdo e utilities Tailwind para estilos. Reserve estilos globais para tokens, tipografia e resets em `app.css`.
4. Use breakpoints responsivos do Tailwind para catálogo e comparação. Em telas estreitas, permita que a comparação seja lida sem exigir largura de desktop.
5. Garanta foco de teclado, hover e estados desabilitados perceptíveis; não use cor como único indicador. Preserve os comportamentos acessíveis providos pelos componentes shadcn-svelte.
6. Garanta contraste legível e respeite `prefers-reduced-motion` caso adicione animações.
7. Imagens de personagens devem manter proporções e dimensões previsíveis para evitar deslocamento de layout durante o carregamento.
8. Não coloque regras de negócio nem lógica de dados em folhas de estilo.

## Verificação

Confirme que `@tailwindcss/vite` está ativo no `vite.config.ts`, que `src/app.css` importa Tailwind e que esse CSS é carregado pelo layout raiz. Confirme também que aliases/configuração do shadcn-svelte apontam para `src/lib/shared/ui/` e que a interação pode ser executada com teclado e tecnologias assistivas. Execute `pnpm check` e `pnpm build`; verifique responsividade e foco nos fluxos alterados.
