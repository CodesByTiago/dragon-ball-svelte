# Arquitetura

## Stack e princípios

- **Svelte 5** com runes e **SvelteKit**.
- **TypeScript** com `strict` habilitado.
- **Axios obrigatório** para chamadas HTTP à Dragon Ball API, por meio de uma instância central compartilhada.
- **Tailwind CSS 4 obrigatório** para estilos utilitários, integrado ao Vite.
- **shadcn-svelte obrigatório** para componentes de interface; use os componentes gerados e compartilhados em `src/lib/shared/ui`.
- **Vitest e MSW obrigatórios** para testes automatizados e interceptação de chamadas de rede, sem depender de serviços externos.
- Organização baseada em features, com rotas finas e acesso à Dragon Ball API isolado em repositórios.
- A aplicação é pública e não tem autenticação na primeira versão.

## Documentação de referência

- Svelte: https://svelte.dev/docs/svelte
- SvelteKit: https://svelte.dev/docs/kit
- Runes do Svelte: https://svelte.dev/docs/svelte/what-are-runes
- Axios: https://axios-http.com/docs/intro
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn-svelte: https://www.shadcn-svelte.com/docs
- MSW: https://mswjs.io/docs/
- Dragon Ball API: https://web.dragonball-api.com/documentation
- Otimização de imagens na Vercel: https://svelte.dev/docs/kit/adapter-vercel#Image-Optimization

Consulte a documentação aplicável quando a implementação depender de detalhes de framework ou contrato externo.

## Organização do código

O diagrama a seguir é uma referência de organização, não uma lista de pastas ou arquivos a criar. Algumas entradas são ilustrativas e podem não existir no projeto.

- Crie uma pasta somente quando houver conteúdo necessário para a implementação atual; não antecipe pastas para funcionalidades, camadas ou arquivos futuros.
- Não crie pastas vazias nem arquivos artificiais, como `.gitkeep`, apenas para reproduzir o diagrama ou reservar estrutura.
- Preserve a organização existente quando ela atender à necessidade atual; adicione novas pastas conforme a aplicação crescer.

```text
src/
├── lib/
│   ├── core/                         # Infraestrutura transversal, se necessária
│   │   ├── api/
│   │   │   └── http.ts               # Instância Axios compartilhada
│   │   └── msw/                      # Handlers e setup MSW dos testes
│   ├── features/
│   │   ├── character-details/         # Detalhes de um personagem
│   │   │   ├── components/
│   │   │   ├── index.ts
│   │   │   └── index.server.ts
│   │   ├── catalog/                  # Catálogo e busca
│   │   │   ├── components/
│   │   │   ├── index.ts              # API pública para a interface
│   │   │   └── index.server.ts       # API pública server-only da feature
│   │   └── versus/                   # Comparação de dois personagens
│   │       ├── components/
│   │       ├── index.ts
│   │       └── index.server.ts
│   ├── shared/
│   │   ├── models/                   # Tipos/modelos compartilhados
│   │   ├── repositories/
│   │   │   └── characters/           # Acesso tipado à Dragon Ball API
│   │   │       └── index.server.ts
│   │   ├── ui/                       # Componentes shadcn-svelte gerados
│   │   ├── components/               # Componentes compartilhados entre features
│   │   └── utils/
│   └── index.ts
├── app.css                           # Tailwind e tokens globais
└── routes/
    ├── +layout.svelte
    ├── +page.svelte                  # Catálogo
    ├── +page.server.ts               # Loader do catálogo, quando necessário
    ├── characters/
    │   └── [id]/
    │       ├── +page.svelte
    │       └── +page.server.ts       # Loader de detalhes do personagem
    └── versus/
        └── [leftId]/
            └── [rightId]/
                ├── +page.svelte
                └── +page.server.ts   # Loader do versus
```

## Regras de dependência

1. **Uma feature por página ou fluxo:** catálogo, detalhes do personagem e versus ficam em features distintas; cada uma concentra seus componentes e lógica específica.
2. **Rotas orquestram:** arquivos de rota validam parâmetros, chamam loaders da feature e compõem sua UI. Evite regras de negócio, acesso direto à API externa e markup extenso nas rotas.
3. **Fronteiras públicas:** importe UI e tipos de outra feature somente pela `index.ts`; importe loaders e código server-only somente pela `index.server.ts`. Não acesse arquivos internos de outra feature.
4. **Código compartilhado:** funcionalidades usadas por mais de uma feature vão para `shared/`; modelos compartilhados ficam em `shared/models/` e acesso reutilizado à API em `shared/repositories/characters/`.
5. **Infraestrutura isolada:** `core/` contém somente infraestrutura transversal e não depende de rotas ou features.
6. **Exports de servidor:** módulos que usam APIs exclusivas do servidor devem usar o sufixo `.server.ts` (ou ficar em `$lib/server/`) e nunca ser importados por componentes ou módulos executados no cliente. Use `index.server.ts` como fronteira pública de exports server-only.
7. **Imports internos:** preserve o alias `#lib` já configurado no projeto e o padrão de extensão `.js` usado em imports TypeScript quando aplicável.
8. Axios, Tailwind CSS, shadcn-svelte, Vitest e MSW são dependências obrigatórias do projeto. Evite outras bibliotecas, design systems ou camadas sem uma necessidade concreta.

### Dependências obrigatórias

- `axios`: dependência de aplicação para chamadas HTTP da Dragon Ball API.
- `tailwindcss` e `@tailwindcss/vite`: dependências de desenvolvimento para utilities e integração com Vite.
- `shadcn-svelte`: tooling/configuração para gerar e manter componentes-fonte acessíveis em `src/lib/shared/ui/`; instale as dependências de runtime exigidas pelos componentes efetivamente adicionados.
- `vitest` e `msw`: dependências de desenvolvimento para executar testes e interceptar requisições HTTP.

Axios, Tailwind CSS, shadcn-svelte, Vitest e MSW estão instalados e configurados como base do projeto. Consulte `package.json`, `vite.config.ts`, `components.json` e `src/lib/core/` ao estender suas integrações.

## Acesso à Dragon Ball API

- A API base é `https://dragonball-api.com/api`.
- Uma única instância Axios fica em `src/lib/core/api/http.ts`, com base URL centralizada em `https://dragonball-api.com/api` e timeout explícito de 10 segundos.
- O acesso à API fica em `shared/repositories/characters/`; componentes e rotas não chamam Axios diretamente. Repositórios importam a instância compartilhada, nunca criam instâncias próprias nem importam Axios diretamente.
- Como o repositório é server-only, use módulos `.server.ts`/`index.server.ts` para manter chamadas externas fora do bundle do cliente. Loaders do SvelteKit podem chamar esses repositórios. Use o `fetch` injetado pelo SvelteKit somente para necessidades específicas do próprio framework, como encaminhamento de cookies ou APIs internas; ele não substitui Axios para a Dragon Ball API.
- Implemente funções de repositório com parâmetros e resultados tipados. Retorne os dados necessários, não objetos de resposta HTTP sem tratamento.
- Centralize a configuração HTTP compartilhada na instância (timeout e tratamento tipado/normalizado de erros). Preserve erros de rede, HTTP e parsing como falhas explícitas; não use defaults que as disfarcem.
- Isole a conversão da resposta externa para modelos usados pela aplicação no limite do repositório. A listagem paginada e a busca por `name` podem ter formatos de resposta diferentes; modele e valide cada formato conforme a documentação e as respostas reais.
- O catálogo usa `GET /characters` com paginação (`page` e `limit`); a busca por nome usa o parâmetro `name`. Os detalhes usam `GET /characters/{id}` e podem incluir `originPlanet` e `transformations`.
- A busca com autocomplete ocorre no navegador por meio da rota interna `GET /api/characters?name=...`. Essa rota valida a consulta e delega à feature de catálogo, que chama o repositório server-only; o navegador nunca acessa a Dragon Ball API diretamente. Propague o sinal de cancelamento para interromper consultas obsoletas.
- A seleção de personagens para comparação (até dois) vive em um estado da própria aplicação, em `src/lib/shared/state/comparisonSelection.svelte.ts`, e não na URL. Ela persiste na navegação do lado do cliente, inclusive ao voltar pelo histórico do navegador, e é perdida em um recarregamento completo da página. Altere-a somente em handlers do cliente, nunca durante o SSR, para não compartilhar estado entre requisições. A página de detalhes seleciona o personagem nesse estado e leva ao catálogo na página dele (`/?page={n}`, calculada por `catalogPageFor`, assumindo IDs sequenciais).
- Trate erros HTTP, respostas inválidas e dados ausentes como estados explícitos. Não substitua falhas por listas vazias nem apresente dados parciais como completos.
- Campos de Ki, como `ki` e `maxKi`, são fornecidos como texto e podem usar escalas ou formatos distintos. Preserve-os como texto; não os converta para números nem derive um vencedor sem regra de produto validada.
- Não adicione cache ou índice local sem necessidade demonstrada. Para o autocomplete client-side, use somente a rota interna de busca já definida e a busca `name` da Dragon Ball API; não crie outra rota proxy ou de sugestões.

## Imagens remotas

- Na build da Vercel (`VERCEL=1`), use `@sveltejs/adapter-vercel` e a API nativa de otimização para imagens remotas da Dragon Ball API. O projeto deve ter a opção **Enable access to System Environment Variables** habilitada na Vercel para disponibilizar essa variável. O adaptador automático continua responsável pelos demais ambientes.
- Centralize larguras e padrões de origem em `src/lib/shared/images/config.ts`; o helper compartilhado gera `src` e `srcset` para catálogo, busca, detalhes, planeta, transformações e versus. Cada imagem informa seu `sizes` de acordo com o layout.
- O otimizador permite apenas HTTPS em `dragonball-api.com` nos diretórios `characters`, `planetas`, `transformaciones` e `transformations`; outras URLs permanecem diretas, sem serem enviadas ao otimizador. A origem e os dados podem mudar: revise os padrões se a API passar a usar outros caminhos.
- Fora da build Vercel, inclusive no desenvolvimento e preview local convencionais, as imagens mantêm os URLs originais; `/_vercel/image` não está disponível no preview do Vite. Não há fallback automático em caso de falha do serviço de otimização.
- O serviço tem limites e pode gerar cobrança conforme o plano e o uso; no Hobby, o esgotamento da franquia pode causar respostas de erro para novas transformações. Consulte https://vercel.com/docs/image-optimization/limits-and-pricing e monitore o uso na Vercel.
- A API é pública; não adicione autenticação ou segredos que o serviço não exige.

## SvelteKit e renderização

- Use `+page.server.ts` quando a página depender de dados carregados no servidor; mantenha o carregador/orquestração junto da feature responsável.
- Passe os dados carregados para componentes por props. Use estado cliente apenas para interações locais, como o texto e a seleção da busca.
- Valide IDs recebidos na rota do versus e trate IDs inexistentes, iguais ou personagens indisponíveis com um estado apropriado, sem renderizar uma comparação enganosa.
- Preserve os estados de carregamento, vazio, falha e dados ausentes definidos no [PRD](../product/1-prd.md).
- Não mova chamadas para o cliente por padrão. Se uma interação exigir busca incremental no navegador, mantenha-a tipada e implemente debounce/cancelamento apenas quando necessário para evitar requisições obsoletas.
- O catálogo apresenta 12 personagens por página, com navegação numérica e controles para primeira, anterior, próxima e última página usando `page` e os metadados de paginação; o autocomplete mostra estado de carregamento, resultados, ausência de correspondência e falha.

## Estilos e testes

- Tailwind CSS 4 é integrado por `@tailwindcss/vite` no `vite.config.ts`; `src/app.css` importa Tailwind e centraliza tokens globais, e é importado uma vez no layout raiz.
- shadcn-svelte é obrigatório para os componentes de interface padrão. Mantenha os componentes gerados em `src/lib/shared/ui/` e suas configurações/aliases alinhados à arquitetura real; veja [estilização](./2-styling.md).
- MSW intercepta chamadas HTTP em testes. Seus handlers compartilhados ficam em `src/lib/core/msw/`; a configuração do runner inicia e encerra o servidor e restaura handlers após cada teste. Veja [estilização](./2-styling.md) e [testes](./3-testing.md) para os detalhes operacionais.
- Cada feature em `src/lib/features/` é acompanhada de testes no próprio diretório (loader em `server.test.ts` e componentes em `components/<Nome>/<Nome>.test.ts`); a cobertura mínima está em [testes](./3-testing.md).
- Playwright Test executa testes E2E em navegador com MSW isolando também as chamadas Axios server-side, conforme [QA e testes E2E](./6-qa.md).
- Não substitua Axios por `fetch` nos repositórios nem desative o MSW nos testes para acessar serviços reais.

## Convenções

- Componentes Svelte: `PascalCase.svelte`.
- Outros módulos TypeScript: `camelCase.ts`; tipos e funções seguem as convenções do código existente.
- Use Tailwind CSS e componentes shadcn-svelte como padrão; reserve estilos escopados no componente Svelte para casos específicos. Regras globais e tokens seguem a documentação de [estilização](./2-styling.md).
- Siga a documentação de [testes](./3-testing.md): Vitest e MSW são obrigatórios. Não adicione outras dependências de teste sem verificar a necessidade.
- Requisitos funcionais e decisões de produto vêm do [PRD](../product/1-prd.md); esta arquitetura define somente os limites técnicos.
