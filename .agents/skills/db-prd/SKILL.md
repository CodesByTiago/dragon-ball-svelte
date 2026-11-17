---
name: db-prd
description: "Use when defining, refining, or documenting product requirements for a new or existing Pokédex feature before implementation."
argument-hint: "Descreva a ideia, problema ou feature a especificar"
---

# Definição de requisitos da feature

Esta etapa transforma uma ideia ou necessidade em requisitos claros e verificáveis. Não implemente código, testes ou alterações de SEO nesta etapa.

1. Leia `docs/product/prd.md` para entender o produto, o escopo atual e evitar requisitos conflitantes ou duplicados.
2. Esclareça o problema do usuário, os resultados esperados e as restrições relevantes. Não invente decisões de produto; registre como pendentes as informações que não puder inferir com segurança.
3. Defina o escopo da mudança, incluindo o que está dentro e fora dele, histórias de usuário quando úteis e critérios de aceitação observáveis e testáveis.
4. Considere estados importantes, como carregamento, vazio, erro e entradas inválidas, quando fizerem sentido para a feature.
5. Diferencie requisitos de produto de decisões de implementação. Consulte os documentos em `docs/engineering/` somente se a especificação depender desses padrões técnicos.
6. Atualize `docs/product/prd.md` preservando sua estrutura e convenções, ou proponha uma seção separada caso o escopo não pertença ao PRD atual. Não sobrescreva requisitos existentes sem necessidade.
7. Ao concluir, resuma as decisões registradas, as questões pendentes e os critérios de aceitação que orientarão as etapas de implementação, testes e QA.
