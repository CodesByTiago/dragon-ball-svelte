# QA e testes E2E

## Objetivo e responsabilidades

Validar jornadas reais no navegador, do ponto de vista do visitante, em complemento aos testes de unidade, componentes e integração definidos em [testes](./3-testing.md). O comportamento esperado vem do [PRD](../product/1-prd.md); arquitetura, acessibilidade e estilização seguem os documentos de engenharia.

- `/db-qa` planeja, implementa e executa testes E2E, relata achados e valida novamente as correções.
- `/db-dev` recebe todos os achados, corrige a aplicação ou pede esclarecimento quando o requisito não estiver definido. Questões exclusivamente de SEO podem ser encaminhadas a `/db-seo`.
- `/db-code-review` revisa mudanças de código, inclusive testes, conforme [code review](./5-code-review.md). QA não substitui code review nem inventa regras de produto.

## Ferramenta e situação atual

**Playwright Test** executa a suíte E2E automatizada em Chromium. Ele permite usar navegadores reais, validar jornadas e configurar a inicialização do servidor; consulte a documentação oficial de [servidor web](https://playwright.dev/docs/test-webserver) e [rede](https://playwright.dev/docs/network).

A configuração está em `playwright.config.ts`, os testes em `e2e/` e os handlers compartilhados em `src/lib/core/msw/handlers.ts`. A suíte inicial cobre catálogo, busca por nome, detalhes, personagem inexistente e comparação; os demais cenários prioritários abaixo ainda precisam ser automatizados. A validação exploratória no navegador é complementar, não substitui a automação.

## Isolamento e dados

- Execute a suíte contra uma instância local dedicada, com fixtures determinísticas e contextos de navegador isolados. Verifique que o servidor está pronto e encerre processos iniciados pelo teste. Em CI, uma porta ocupada ou servidor inadequado deve resultar em falha explícita, não em reutilização silenciosa.
- A aplicação acessa a Dragon Ball API no servidor via Axios, inclusive durante SSR. `e2e/mock-api.mjs` inicia MSW Node com os handlers compartilhados em cada processo do servidor de testes por `NODE_OPTIONS`; chamadas não previstas falham explicitamente. O navegador também bloqueia requisições externas nos testes. Não habilite mocks no produto publicado.
- Use cenários controlados de sucesso, lista vazia, dados ausentes, erros HTTP, rede e respostas inválidas quando relevantes. Não use credenciais reais nem dados sensíveis; restrinja screenshots, traces e relatórios ao necessário.
- Uma verificação exploratória contra API real ou ambiente publicado não é teste determinístico: faça-a somente quando apropriado ao pedido, sem operações destrutivas, e registre a dependência externa e suas limitações.

## Jornadas prioritárias

Selecione os cenários afetados pelo pedido; ao criar uma suíte inicial, cubra os fluxos principais e as condições de falha aplicáveis:

1. **Catálogo e paginação:** visualizar dados, percorrer números e controles de primeira, anterior, próxima e última página; verificar estado atual e limites.
2. **Busca:** pesquisar por nome e número, abrir detalhes a partir das sugestões, limpar a consulta e distinguir resultados, ausência e falha.
3. **Detalhes:** abrir a partir do catálogo, apresentar campos e estados ausentes, iniciar comparação e tratar IDs inválidos ou inexistentes.
4. **Versus:** selecionar dois personagens diferentes, navegar para a comparação, conferir dados e Ki como texto, remover ou limpar seleção; verificar que não há vencedor declarado.
5. **Navegação e estado:** voltar pelo histórico e paginar preservando a seleção durante navegação cliente; não exigir persistência da seleção após recarga completa.
6. **Tema e acessibilidade:** alternar tema, navegar e recarregar para verificar preferência; usar teclado e nomes acessíveis nos controles principais.
7. **Responsividade:** conferir mobile e desktop, incluindo duas colunas no catálogo mobile e ausência de transbordamento horizontal nos fluxos alterados.

## Convenções de implementação e execução

- Prefira seletores por papel e nome acessível e asserções sobre comportamento visível; evite depender de classes CSS ou estrutura interna. Use esperas baseadas em estado, sem pausas fixas.
- Cada teste prepara seu estado, é independente da ordem e limpa seus próprios dados. Não use retentativas como forma de esconder instabilidade.
- Instale dependências com `pnpm install`, instale o navegador com `pnpm exec playwright install chromium` e execute `pnpm test:e2e`. O servidor local usa a porta 4179 e deve estar livre. Em CI Linux, instale também as dependências do sistema exigidas pelo Chromium (por exemplo, `pnpm exec playwright install --with-deps chromium`). O setup foi validado com Node 24 e Chromium instalado pelo Playwright 1.65.0. `pnpm test` continua executando apenas Vitest; `pnpm check` verifica tipos.
- Valide ao menos os cenários atingidos pela mudança. Registre navegador, viewport, ambiente, dados usados, comandos executados e testes não executados.

## Relatório e encaminhamento

Use **Aprovado** quando os cenários executados não apresentarem achados e informe o escopo; **Requer correções** para problemas confirmados; **Bloqueado** quando não for possível concluir a verificação. Uma limitação não verificada não equivale a sucesso.

Para cada achado, registre severidade conforme [code review](./5-code-review.md), pré-condições, passos reproduzíveis, resultado esperado e observado, evidência, referência ao requisito, classificação (**desvio confirmado** ou **fora do definido**) e responsável `/db-dev`. Quando faltar definição, descreva a decisão necessária, sem transformar hipótese em requisito. Após a correção, `/db-qa` repete o cenário e as regressões relevantes; `/db-code-review` revisa as alterações de código.

Procedimento operacional: [skill db-qa](../../.agents/skills/db-qa/SKILL.md).
