# Code review

## Objetivo e escopo

Use code review para encontrar bugs, regressões e desvios verificáveis em relação aos requisitos e padrões técnicos deste projeto. A revisão avalia o diff e seu contexto necessário; não é uma reimplementação nem uma auditoria especulativa de todo o repositório.

O review deve consultar:

- [PRD](../product/1-prd.md) para comportamento esperado e critérios de aceitação;
- [arquitetura](./1-architecture.md) para limites entre rotas, features, repositórios e código server-only;
- [estilização](./2-styling.md) para padrões de CSS e acessibilidade visual/interativa;
- [testes](./3-testing.md) para estratégia de validação e cobertura;
- [QA e testes E2E](./6-qa.md) quando houver mudanças na automação ou nas jornadas E2E;
- [SEO](./4-seo.md) para requisitos das páginas públicas.

## Critérios

Reporte somente problemas acionáveis sustentados por evidência no diff e no contexto do código, como:

1. comportamento incorreto, caminhos de erro não tratados ou regressões;
2. violações dos critérios de aceitação do PRD;
3. incompatibilidades de tipos ou formatos da Dragon Ball API;
4. quebra de fronteiras de arquitetura ou importação indevida de código server-only;
5. falhas relevantes de acessibilidade, navegação, responsividade ou metadados conforme os documentos aplicáveis;
6. ausência de validação necessária para a mudança, quando isso criar risco concreto de regressão;
7. feature criada ou alterada sem os testes mínimos exigidos em [testes](./3-testing.md#testes-obrigatórios-por-feature); trate como desvio confirmado.

Não reporte preferências pessoais, observações cosméticas sem impacto, suposições não comprovadas ou problemas preexistentes fora do diff. Não trate uma lacuna na especificação como bug confirmado.

## Severidade

- **Crítica:** risco de perda/corrupção grave de dados ou falha que inviabiliza o fluxo principal para todos os usuários.
- **Alta:** fluxo principal quebrado ou requisito importante descumprido sem alternativa razoável.
- **Média:** comportamento incorreto em condições específicas ou funcionalidade importante degradada com alternativa disponível.
- **Baixa:** impacto limitado que não bloqueia o fluxo, mas merece correção objetiva.

Avalie severidade pelo impacto demonstrável, não pela complexidade ou tamanho da mudança. Registre confiança como alta, média ou baixa; achados de baixa confiança devem ser perguntas/riscos, não afirmações definitivas.

## Fora do definido

Classifique como **desvio confirmado** quando o comportamento contradiz explicitamente o PRD ou uma regra de engenharia. Classifique como **fora do definido** quando o problema ou comportamento desejado não puder ser decidido com base nesses documentos.

Um achado fora do definido não autoriza o reviewer a inventar critérios ou alterar código. Encaminhe-o a `/db-dev` para triagem: corrigir a implementação se um requisito existente resolver a questão ou pedir esclarecimento e atualizar a especificação se faltar uma decisão de produto. Não encerre o fluxo como aprovado enquanto um achado acionável permanecer sem decisão.

Todo achado confirmado também volta primeiro para `/db-dev` para triagem. A revisão é somente leitura; não implemente as correções durante o review. Depois que `/db-dev` alterar o código, revise novamente o diff atualizado. Se o achado for exclusivamente de SEO, `/db-dev` pode encaminhar a implementação para `/db-seo`; o resultado do review continua sendo acompanhado pelo fluxo de desenvolvimento.

## Formato do relatório

Abra com um dos resultados:

- **Aprovado:** nenhum achado acionável no escopo revisado.
- **Aprovado com observações:** sem bloqueios confirmados; há limitações de validação ou perguntas não bloqueantes.
- **Requer correções:** um ou mais achados precisam de resolução ou decisão.

Para cada achado, inclua:

- severidade;
- arquivo e linha(s) específicas;
- descrição objetiva do problema, impacto e condição para reproduzir;
- requisito ou regra violada, quando aplicável;
- classificação: **desvio confirmado** ou **fora do definido**;
- confiança: alta, média ou baixa;
- próximo responsável (`/db-dev`; ele pode encaminhar execução exclusivamente de SEO para `/db-seo`).

Se não houver achados, declare essa conclusão explicitamente. Registre também quais verificações foram executadas e quais não foram; não afirme que testes, build ou lint passaram sem executá-los.

## Limites de responsabilidade

- `/db-code-review`: analisar e relatar; não editar código nem aprovar comportamento não especificado.
- `/db-dev`: receber todos os achados, implementar e corrigir funcionalidades, arquitetura, estilos e testes; resolver desvios ou solicitar decisão quando a especificação for insuficiente. Encaminhar execução exclusivamente de SEO para `/db-seo` quando apropriado.
- `/db-seo`: resolver alterações exclusivamente relacionadas a SEO.

Para o procedimento operacional de revisão, consulte a skill [db-code-review](../../.agents/skills/db-code-review/SKILL.md).
