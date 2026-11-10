# SEO e qualidade de páginas públicas

## Objetivo

As páginas públicas do catálogo e do versus devem ter conteúdo e metadados claros, acessíveis e renderizados no HTML inicial sempre que dependerem de dados externos.

## Metadados por rota

- Defina um `<title>` único e descritivo para cada rota pública.
- Inclua uma meta description concisa e específica para o conteúdo da página.
- Coloque metadados específicos da rota em `<svelte:head>` na respectiva página; não use metadados de uma página no layout global.
- Evite títulos ou descrições que afirmem um vencedor, poder relativo ou dados que o produto não tenha confirmado.
- Não inclua dados temporários ou conteúdo fornecido pelo usuário nos metadados indexáveis.

## Renderização e conteúdo

- Prefira carregamento server-side nas páginas que dependem da Dragon Ball API para disponibilizar os dados principais sem depender da execução de JavaScript no navegador.
- Use headings em ordem semântica, links com texto compreensível e imagens informativas com `alt` que descreva o personagem. Imagens decorativas devem usar `alt=""`.
- Garanta que cada personagem e suas transformações sejam identificáveis por texto, sem depender somente da imagem.
- A página de versus deve identificar ambos os personagens no conteúdo e metadados, sem sugerir um vencedor por padrão.
- Valide os valores de rota e trate personagens inexistentes ou indisponíveis com resposta apropriada; não gere conteúdo indexável enganoso para IDs inválidos.

## Indexação e rastreamento

- Mantenha `robots.txt` coerente com a intenção de tornar catálogo e comparações públicas rastreáveis. Não bloqueie páginas públicas para resolver problemas de conteúdo ou pontuação.
- Use URLs estáveis e canônicas para conteúdo público. Uma rota de comparação deve identificar os dois personagens de forma inequívoca.
- Não adicione regras de indexação, sitemap ou canonical sem verificar primeiro as rotas reais e os requisitos de publicação.
- A aplicação está em desenvolvimento; nenhum `robots.txt`, sitemap, URL de produção ou auditoria Lighthouse está configurado ainda. Não presuma comandos de SEO que não existam no `package.json`.

## Verificação

Após alterar uma página pública:

1. Execute `pnpm check` e, quando a mudança justificar, `pnpm build`.
2. Confira o HTML renderizado pelo servidor para confirmar que título, descrição, headings e conteúdo principal estão presentes sem depender da execução de JavaScript.
3. Verifique navegação por links reais, textos alternativos e comportamento para IDs inválidos.
4. Se uma auditoria Lighthouse/SEO for adicionada futuramente, documente sua configuração e limites reais; um score não substitui a revisão de conteúdo, acessibilidade e indexabilidade.
