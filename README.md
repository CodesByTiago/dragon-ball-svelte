# Dragon Ball Explorer

Catálogo de personagens de Dragon Ball com busca, página de detalhes e comparação (versus) entre dois personagens, usando a [Dragon Ball API](https://web.dragonball-api.com/documentation).

**Preview:** https://dragon-ball-svelte.vercel.app/

## Funcionalidades

- **Catálogo paginado** com 12 personagens por página.
- **Busca por nome** com sugestões enquanto você digita.
- **Detalhes do personagem:** imagem, raça, gênero, Ki, planeta de origem e transformações.
- **Comparação (versus)** entre dois personagens, sem declarar vencedor.
- **Tema claro e escuro**, com a preferência salva no navegador.

As descrições vêm da API e podem estar em espanhol; a interface está em português.

## Stack

- [SvelteKit](https://svelte.dev/docs/kit) com Svelte 5 e TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/) e [shadcn-svelte](https://www.shadcn-svelte.com/)
- [Axios](https://axios-http.com/) para acessar a API, somente no servidor
- [Vite+](https://viteplus.dev/), Vitest, Testing Library e [MSW](https://mswjs.io/) nos testes
- [pnpm](https://pnpm.io/) como gerenciador de pacotes

## Começando

```sh
pnpm install
pnpm dev
```

A aplicação sobe em `http://localhost:5173`.

## Scripts

| Comando           | Descrição                           |
| ----------------- | ----------------------------------- |
| `pnpm dev`        | Servidor de desenvolvimento         |
| `pnpm build`      | Build de produção                   |
| `pnpm preview`    | Pré-visualiza o build de produção   |
| `pnpm test`       | Executa os testes uma vez           |
| `pnpm test:e2e`   | Executa os testes E2E no Chromium   |
| `pnpm test:watch` | Executa os testes em modo watch     |
| `pnpm audit:seo`  | Gera relatório Lighthouse local     |
| `pnpm check`      | Verifica tipos e componentes Svelte |

Para executar os testes E2E pela primeira vez, instale o navegador com `pnpm exec playwright install chromium`. Os testes usam um servidor local na porta 4179 e dados controlados; veja [QA e testes E2E](./docs/engineering/6-qa.md).

Para auditar SEO com Lighthouse, inicie o servidor e execute `pnpm audit:seo`; uma URL absoluta opcional permite escolher outra rota. O relatório fica em `lighthouse-report.html`. Veja [SEO](./docs/engineering/4-seo.md) para detalhes e limitações.

Na Vercel, imagens suportadas da Dragon Ball API são otimizadas dinamicamente. No desenvolvimento e preview local são usadas as imagens originais. A otimização está sujeita aos limites e à cobrança do plano Vercel; veja [Arquitetura](./docs/engineering/1-architecture.md).

## Estrutura

```
src/
├── routes/                  # Rotas finas: validam parâmetros e compõem as features
└── lib/
    ├── core/                # Axios, handlers MSW e utilitários de teste
    ├── features/            # catalog, character-details e versus
    └── shared/              # modelos, repositórios da API, estado e componentes shadcn
```

Cada feature tem seus loaders, componentes e testes. O acesso à Dragon Ball API fica nos repositórios `.server.ts`, nunca nos componentes.

## Documentação

- [PRD do produto](./docs/product/1-prd.md)
- [Arquitetura](./docs/engineering/1-architecture.md)
- [Estilização](./docs/engineering/2-styling.md)
- [Testes](./docs/engineering/3-testing.md)
- [SEO](./docs/engineering/4-seo.md)
- [Code review](./docs/engineering/5-code-review.md)
- [QA e testes E2E](./docs/engineering/6-qa.md)

## Skills de agente

O desenvolvimento é guiado por skills em `.agents/skills/`: `/db-prd` (produto), `/db-architecture` (arquitetura), `/db-dev` (implementação), `/db-code-review` (revisão), `/db-qa` (testes E2E) e `/db-seo` (SEO).
