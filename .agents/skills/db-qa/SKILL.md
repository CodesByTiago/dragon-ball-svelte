---
name: db-qa
description: "Planeje, implemente e execute testes E2E do Dragon Ball Explorer com Playwright; valide jornadas no navegador, reporte regressões e confirme correções feitas pelo db-dev."
argument-hint: "Indique a jornada, alteração ou cenário E2E a validar"
---

# QA e testes E2E

Valide as jornadas da aplicação de ponta a ponta em um navegador, conforme o PRD e a documentação de engenharia. Crie ou atualize testes E2E automatizados quando a infraestrutura estiver disponível ou quando sua implementação for solicitada.

## Antes de executar

1. Leia [QA e testes E2E](../../../docs/engineering/6-qa.md), o [PRD](../../../docs/product/1-prd.md) e os documentos de [arquitetura](../../../docs/engineering/1-architecture.md) e [testes](../../../docs/engineering/3-testing.md).
2. Identifique o escopo, os critérios de aceitação, os cenários relevantes, o ambiente e os dados necessários. Verifique os scripts, dependências e configurações disponíveis antes de escolher um comando.
3. Use a aplicação local e dados controlados por padrão. Não execute testes invasivos em produção nem altere dados externos sem autorização.
4. Se faltar infraestrutura de automação, informe a limitação; não afirme que a suíte passou. Quando solicitado a implementá-la, siga a decisão de arquitetura e documente os comandos reais.

## Execução

1. Priorize fluxos completos e resultados observáveis: catálogo, paginação, busca, detalhes, comparação, tema, erros e responsividade, conforme o escopo da mudança.
2. Use Playwright Test para automação; prefira seletores por papel e nome acessível, esperas por condições observáveis e contextos isolados. Evite seletores frágeis, sleeps fixos e dependência da ordem dos testes.
3. Controle as respostas externas e os cenários de erro também no servidor SvelteKit; interceptar apenas requisições do navegador não controla chamadas Axios feitas no SSR. A suíte automatizada não deve acessar a API real.
4. Inicie somente os processos necessários, confirme sua disponibilidade e encerre os processos iniciados para a verificação. Registre ambiente, navegador, viewport, dados e resultado observado.
5. Se o comportamento esperado não estiver definido, registre a dúvida e encaminhe a `/db-dev` para triagem; não invente requisitos nem regras de vencedor.

## Achados e retorno

- Encaminhe bugs, regressões e pontos fora do definido a `/db-dev`; QA não corrige código de produto durante a validação. `/db-dev` pode encaminhar trabalho exclusivamente de SEO a `/db-seo`.
- Depois da correção, execute novamente o cenário afetado e as regressões relevantes. Se não puder validá-lo, mantenha-o como não verificado.
- Se a própria automação falhar, diferencie defeito da aplicação, defeito do teste e bloqueio de ambiente; não mascare falhas com retentativas ou expectativas frágeis.

## Relatório

Informe **Aprovado**, **Requer correções** ou **Bloqueado**, conforme as evidências. Liste os cenários executados e não executados, ambiente, comandos efetivamente executados e limitações.

Para cada achado, inclua severidade conforme [code review](../../../docs/engineering/5-code-review.md), pré-condições, passos, resultado esperado e observado, evidência, requisito aplicável, classificação (**desvio confirmado** ou **fora do definido**) e próximo responsável (`/db-dev`). Não inclua dados sensíveis em capturas, traces ou relatórios.
