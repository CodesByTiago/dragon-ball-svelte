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
- Na Vercel, as imagens remotas suportadas usam otimização responsiva; fora dela são servidas diretamente. O preview local não mede a otimização da Vercel. Consulte a arquitetura para origens permitidas e limites.
- A página de versus deve identificar ambos os personagens no conteúdo e metadados, sem sugerir um vencedor por padrão.
- Valide os valores de rota e trate personagens inexistentes ou indisponíveis com resposta apropriada; não gere conteúdo indexável enganoso para IDs inválidos.

## Indexação e rastreamento

- Mantenha `robots.txt` coerente com a intenção de tornar catálogo e comparações públicas rastreáveis. Não bloqueie páginas públicas para resolver problemas de conteúdo ou pontuação.
- Use URLs estáveis e canônicas para conteúdo público. Uma rota de comparação deve identificar os dois personagens de forma inequívoca.
- Não adicione regras de indexação, sitemap ou canonical sem verificar primeiro as rotas reais e os requisitos de publicação.
- O projeto tem `static/robots.txt`, que atualmente permite o rastreamento. O preview publicado está indicado no README; confirme as decisões de indexação e publicação antes de modificá-las.

## Auditoria Lighthouse

- Instale as dependências com `pnpm install` e o Chromium do Playwright com `pnpm exec playwright install chromium`. Lighthouse 13 requer Node.js 22.19 ou superior.
- Inicie o servidor local com `pnpm dev` e, em outro terminal, execute `pnpm audit:seo`. Por padrão, o comando audita `http://127.0.0.1:5173/`; para outra rota ou ambiente, informe uma URL absoluta, por exemplo `pnpm audit:seo http://127.0.0.1:5173/characters/1`.
- O script `scripts/lighthouse.mjs` inicia o Chromium instalado pelo Playwright em modo headless e gera `lighthouse-report.html` na raiz do projeto. O relatório é ignorado pelo Git e substituído em cada execução. O servidor auditado deve estar disponível antes do comando; encerre os processos de desenvolvimento iniciados apenas para a auditoria ao terminá-la.
- O Lighthouse usa a configuração padrão, incluindo emulação mobile e as categorias disponíveis na versão instalada. Em cada rota auditada, a pontuação exibida de **todas as categorias** deve ser superior a 90 (91 a 100); 90 não atende à meta. Categorias sem pontuação devem ser registradas como não verificadas, não como aprovadas.
- Registre a URL, o ambiente, as pontuações, os achados e as limitações. Repita medições afetadas por condições instáveis antes de concluir; pontuações não substituem a revisão de conteúdo, acessibilidade e indexabilidade. O comando atual gera um relatório, mas não aplica a meta automaticamente nem há Lighthouse CI configurado.
- Uma auditoria no servidor de desenvolvimento, com mocks ou dados externos pode diferir de produção. Para medir performance, prefira uma build de produção e indique o ambiente. Auditar uma URL publicada faz requisições reais a ela e às suas dependências.
- Para avaliar a otimização de imagens, audite uma implantação atualizada na Vercel, confirme as respostas de `/_vercel/image` e registre as pontuações por rota; uma build local não comprova a performance do serviço.

## Verificação

Após alterar uma página pública:

1. Execute `pnpm check` e, quando a mudança justificar, `pnpm build`.
2. Confira o HTML renderizado pelo servidor para confirmar que título, descrição, headings e conteúdo principal estão presentes sem depender da execução de JavaScript.
3. Verifique navegação por links reais, textos alternativos e comportamento para IDs inválidos.
4. Quando pertinente, execute a auditoria Lighthouse descrita acima e interprete os achados no contexto da rota e do ambiente.
