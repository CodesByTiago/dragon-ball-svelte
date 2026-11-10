---
name: db-seo
description: "Cuide de SEO técnico e conteúdo indexável neste projeto SvelteKit Dragon Ball. Use para metadados, SSR, indexação, robots.txt, sitemap, canonicals, acessibilidade relacionada a SEO ou auditorias de SEO."
argument-hint: "Descreva a melhoria ou problema de SEO"
---

# SEO

Cuide dos requisitos e da implementação de SEO do projeto, mantendo as recomendações alinhadas às rotas e à configuração existentes. Não trate sugestões de SEO como autorização para adicionar ferramentas ou arquivos sem verificar sua necessidade.

## Antes de alterar

1. Leia `docs/engineering/4-seo.md` e `docs/engineering/1-architecture.md`.
2. Leia `docs/product/1-prd.md` para confirmar quais páginas e dados são públicos e quais decisões de produto permanecem pendentes.
3. Inspecione as rotas reais, os loaders, os metadados atuais e `package.json`; não assuma que sitemap, `robots.txt`, URL canônica ou Lighthouse CI já existem.
4. Preserve a separação de responsabilidades: esta skill cobre SEO e `4-seo.md`; estilização, arquitetura geral e testes pertencem a `db-dev`.
5. Se o pedido depender de uma decisão de indexação ou publicação que não está definida, pergunte antes de assumir.

## Implementação e documentação

- Defina metadados exclusivos, corretos e concisos por rota pública, usando `<svelte:head>` na página correspondente.
- Prefira conteúdo principal renderizado no servidor quando a página depender da Dragon Ball API.
- Mantenha HTML semântico, headings em ordem, links descritivos e texto alternativo apropriado para imagens informativas.
- Não afirme vencedor nem valores de poder que o produto não tenha definido ou que os dados da API não sustentem.
- Trate IDs inválidos e conteúdo indisponível sem produzir páginas indexáveis enganosas.
- Só crie ou altere `robots.txt`, sitemap, URL canônica, dados estruturados ou auditorias depois de verificar rotas, ambiente de publicação e necessidade.
- Atualize `docs/engineering/4-seo.md` quando as convenções ou ferramentas de SEO mudarem. Não mova orientações de estilo/testes para esse documento.

## Verificação

1. Execute `pnpm check` e, quando apropriado, `pnpm build`.
2. Confira o HTML renderizado pelo servidor, incluindo `<title>`, description, headings e conteúdo principal sem depender de JavaScript no navegador.
3. Verifique links, textos alternativos, status de páginas inválidas e regras reais de rastreamento, quando existirem.
4. Quando uma auditoria for pertinente, siga as instruções de Lighthouse em `docs/engineering/4-seo.md`, confira a URL auditada e reporte resultados, metas não atingidas e limitações.
5. No resumo final, informe as mudanças, as rotas verificadas, os comandos executados e decisões de publicação que continuem pendentes.
