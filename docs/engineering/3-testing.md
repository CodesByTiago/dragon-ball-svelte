# Testes

## Stack obrigatória e situação atual

- **Vitest** é o runner obrigatório, integrado ao ecossistema Vite.
- **MSW (Mock Service Worker)** é obrigatório para interceptar requisições HTTP de testes sem acessar serviços externos.
- **Axios** é o cliente HTTP obrigatório dos repositórios; seus pedidos são interceptados pelo MSW.
- Testing Library pode ser adotada para testes de componentes Svelte quando necessária, mas não é requisito desta decisão.

Vitest, MSW e Axios estão instalados e configurados. Execute `pnpm test` para rodar os testes uma vez; `pnpm test:watch` mantém o Vitest em modo watch. `pnpm check` continua verificando tipos e componentes Svelte. Adicione novos testes em `src/**/*.test.ts`, junto ao módulo ou feature correspondente.

## Estratégia

Priorize testes automatizados para os comportamentos importantes da feature:

1. **Unidade:** conversão e validação das respostas da Dragon Ball API, formatação e regras de domínio.
2. **Repositórios:** método, URL, parâmetros, parsing tipado, respostas inválidas e erros HTTP.
3. **Componentes:** comportamento observável, acessibilidade e estados de carregamento, vazio, falha e dados ausentes.
4. **Integração:** colaboração entre a busca, seleção de personagens e navegação para o versus.
5. **Loaders:** validação dos parâmetros das rotas e tratamento de respostas do repositório, sem testar detalhes internos do SvelteKit.

Não faça chamadas reais à Dragon Ball API em testes automatizados. Use handlers MSW com respostas controladas para interceptar a instância Axios real; cubra sucesso, erro HTTP, falha de rede e dados malformados. Prefira testar o contrato do repositório sem substituir a função que se quer testar.

## Testes obrigatórios por feature

Toda feature em `src/lib/features/<feature>/` deve ter testes automatizados próprios; uma feature sem testes não está concluída. Toda criação ou alteração de comportamento de uma feature deve incluir ou atualizar seus testes na mesma mudança.

Cobertura mínima por feature:

- **Loader/lógica server-side** (`server.server.ts`): teste em `server.test.ts` na raiz da feature, com sucesso, validação de entrada e erros do repositório, usando MSW.
- **Componentes** (`components/<Nome>/<Nome>.test.ts`): estados de carregamento, vazio, erro e dados ausentes, além das interações principais (por exemplo, seleção, limpar busca e links de navegação), usando consultas por papel, rótulo e texto.
- **Fluxos entre features:** ao menos um teste de integração quando uma feature depender do resultado de outra (catálogo → detalhes → versus).

Situação atual: todas as features (`catalog`, `character-details`, `versus`) têm testes de loader e de componentes.

Testes de componentes Svelte usam `@testing-library/svelte`, `@testing-library/user-event` e `jsdom`, já instalados. O `vite.config.ts` define dois projetos Vitest: `server` (ambiente node com MSW, para tudo fora de `components/`) e `components` (ambiente jsdom com o plugin `svelteTesting`, para `src/**/components/**/*.test.ts`). Eles são separados porque a condição `browser` exigida pelo Svelte nos componentes quebra o MSW em Node. Testes de componentes que dependem de rede devem simular `fetch` (ex.: `vi.stubGlobal`) e nunca acessar a rede real. Fixtures compartilhadas ficam em `src/lib/core/testing/`. Mantenha o padrão de importação de `vite-plus/test`.

## Configuração do MSW

- Mantenha handlers reutilizáveis em `src/lib/core/msw/handlers.ts`.
- Configure o servidor Node do MSW no setup do Vitest: inicie antes da suíte com `onUnhandledFrame: 'error'` para bloquear tráfego sem handler, restaure handlers após cada teste e encerre o servidor ao final.
- Use `server.use(...)` para respostas específicas de cada caso, sem alterar handlers compartilhados.
- Use o service worker do MSW somente se testes executados no navegador ou uma necessidade explícita de mock durante desenvolvimento exigir isso; não habilite interceptação no produto publicado.
- Nunca configure handlers que permitam acesso acidental à rede real durante os testes.

## Localização e convenções

- Mantenha os testes próximos à feature ou ao módulo testado, usando o padrão de diretórios e nomes estabelecido pelo runner quando ele for escolhido.
- Agrupe testes de catálogo e busca com a feature de catálogo; testes de seleção e comparação com a feature de versus; testes de parsing compartilhado com o repositório de personagens.
- Use nomes de teste que descrevam o resultado observado, cobrindo caminhos de sucesso e falha relevantes.
- Testes internos podem acessar módulos da própria feature. Para testar integrações externas, use somente as fronteiras públicas descritas em [arquitetura](./1-architecture.md).
- Em componentes Svelte, prefira consultas por papel, rótulo e texto acessível. Evite acoplar testes a classes CSS ou à estrutura privada do DOM.

## Cobertura funcional

Ao alterar os fluxos do produto, considere verificar:

- busca com correspondências, sem correspondências e falha de rede;
- distinção entre carregamento, vazio e erro;
- seleção de dois personagens diferentes e validação de IDs inválidos ou repetidos;
- apresentação de dados ausentes sem inventar valores;
- valores `ki` e `maxKi` preservados como textos, sem comparações numéricas não definidas;
- navegação por teclado e rótulos acessíveis para controles interativos.

Não declare um vencedor no versus nem crie testes que imponham uma regra de vitória enquanto essa decisão estiver pendente no [PRD](../product/1-prd.md).

## Execução e qualidade

Execute a suíte automatizada e a verificação de tipos:

```sh
pnpm test
pnpm check
```

O projeto também oferece `pnpm build` para validar a compilação de produção. Os testes devem ser determinísticos, independentes da ordem de execução e não devem exigir rede, credenciais ou dados persistidos.
