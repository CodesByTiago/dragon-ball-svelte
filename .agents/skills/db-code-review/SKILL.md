---
name: db-code-review
description: "Revise alterações de código deste projeto em busca de bugs, regressões e desvios dos requisitos documentados. Use para code review, revisar diff ou validar correções feitas pelo db-dev."
argument-hint: "Indique o diff, commit ou mudança a revisar"
---

# Code review

Revise as alterações solicitadas sem modificá-las. O objetivo é identificar problemas concretos que possam causar comportamento incorreto, regressão ou descumprimento dos requisitos e padrões documentados do projeto.

## Antes da revisão

1. Leia `docs/engineering/5-code-review.md`.
2. Leia `docs/product/1-prd.md` e os documentos de engenharia aplicáveis: `1-architecture.md`, `2-styling.md`, `3-testing.md` e `4-seo.md`.
3. Identifique o diff relevante e inspecione contexto suficiente para confirmar cada possível problema. Não inclua alterações preexistentes ou fora do escopo da revisão.
4. Não faça alterações no código ou nos documentos durante a revisão. Todos os achados voltam a `/db-dev` para triagem; ele pode encaminhar a execução exclusivamente de SEO para `/db-seo`.

## Como avaliar

- Priorize bugs, regressões, falhas de tipo/dados, acessibilidade que impeça o uso, tratamento incorreto de estados e violações claras do PRD ou dos documentos de engenharia.
- Baseie cada achado em um caminho concreto de execução e evidência no diff; explique impacto e condição para ocorrer.
- Não reporte preferências de estilo, hipóteses sem evidência, problemas preexistentes ou observações sem impacto acionável.
- Use a severidade definida em `5-code-review.md`. Não infle severidade nem confiança.
- Diferencie **desvio confirmado** (contraria requisito documentado) de **ponto sem definição** (os documentos não estabelecem o comportamento esperado). Não transforme lacunas de produto em bugs por suposição.
- Se a alteração não permite concluir um ponto, registre-o como pergunta ou risco não confirmado, não como achado.

## Encaminhamento obrigatório

- Todo desvio confirmado ou bug reportado deve voltar para `/db-dev` para triagem e resolução; o code review não corrige o código.
- Se o achado estiver fora do comportamento definido no PRD ou nos documentos de engenharia, marque-o como **fora do definido**, descreva a decisão necessária e encaminhe-o a `/db-dev`. O `db-dev` deve corrigir a implementação quando houver requisito claro ou pedir esclarecimento/atualização do requisito quando a especificação for insuficiente; não deve inventar uma regra.
- Depois das correções, execute uma nova revisão do diff atualizado. Não aprove uma correção apenas com base no resumo do implementador.
- Mesmo achados de SEO devem voltar primeiro para `/db-dev`; o `db-dev` pode encaminhar a implementação para `/db-seo` conforme o escopo do projeto. Depois das correções, revise novamente as alterações relevantes.

## Formato do relatório

Comece com um resultado: **Aprovado**, **Aprovado com observações** ou **Requer correções**.

Para cada achado, informe:

- severidade (`Crítica`, `Alta`, `Média` ou `Baixa`);
- arquivo e linha(s) pontual(is);
- problema e impacto observável;
- requisito ou regra relacionada, se houver;
- condição de reprodução e confiança (`alta`, `média` ou `baixa`);
- classificação (**desvio confirmado** ou **fora do definido**);
- próximo responsável: `/db-dev`, que pode encaminhar a implementação exclusivamente de SEO para `/db-seo`.

Se não houver achados, diga explicitamente que não foram encontrados problemas no escopo revisado e liste limitações de validação relevantes. Não diga que testes passaram se não os executou.
