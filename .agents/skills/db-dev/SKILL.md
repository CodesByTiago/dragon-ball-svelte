---
name: db-dev
description: "Implemente funcionalidades e correções neste projeto SvelteKit Dragon Ball, incluindo Axios, Tailwind CSS, componentes shadcn-svelte e testes com MSW. Use para desenvolver o catálogo, busca ou versus; para decisões arquiteturais, use db-architecture e para SEO, use db-seo."
argument-hint: "Descreva a funcionalidade ou correção a implementar"
---

# Desenvolvimento

Implemente a solicitação no projeto existente seguindo o PRD e a arquitetura do repositório. Entregue a mudança funcional, não apenas um plano.

## Antes de alterar

1. Leia `docs/product/1-prd.md` para entender os requisitos, critérios de aceitação e decisões pendentes relevantes.
2. Leia `docs/engineering/1-architecture.md` e consulte `docs/engineering/2-styling.md` e `docs/engineering/3-testing.md` quando aplicáveis.
3. Inspecione as rotas, componentes, tipos, repositórios e testes relacionados. Reutilize padrões existentes e preserve alterações não relacionadas.
4. Se um requisito indispensável estiver indefinido e houver mais de uma solução de produto razoável, pergunte antes de assumir. Não invente regras como a fórmula de vencedor do versus.

## Implementação

- Faça a menor mudança coesa que atenda por completo aos critérios de aceitação.
- Mantenha a separação por feature, rotas finas e acesso à Dragon Ball API nos repositórios compartilhados, conforme a arquitetura.
- Use SvelteKit, Svelte 5 e TypeScript estrito. Axios, Tailwind CSS 4, shadcn-svelte e MSW são obrigatórios: use a instância Axios compartilhada para acessar a Dragon Ball API, utilities Tailwind para estilos, os componentes shadcn-svelte compartilhados em `src/lib/shared/ui/` para controles de interface e MSW para interceptar HTTP nos testes. Não substitua esses padrões por `fetch` nos repositórios, controles duplicados ou mocks ad hoc.
- Se um componente shadcn-svelte necessário ainda não estiver instalado/gerado, configure ou adicione-o à biblioteca compartilhada com as ferramentas e convenções oficiais; não crie uma implementação paralela.
- Ao configurar a infraestrutura de testes, use Vitest com MSW e mantenha handlers compartilhados em `src/lib/core/msw/`; não faça testes dependerem de rede real.
- Confira se as dependências e configurações obrigatórias já existem antes de usar as ferramentas. Se ainda estiverem ausentes e forem necessárias à tarefa, instale-as com o gerenciador existente e implemente sua configuração mínima funcional.
- Modele e valide os formatos reais da API. Trate carregamento, vazio, falhas e dados ausentes explicitamente; não transforme erros em sucesso ou resultados vazios.
- Preserve `ki` e `maxKi` como os textos recebidos da API. Não calcule ou declare vencedor sem uma regra de produto definida.
- Mantenha a interface acessível e responsiva, seguindo as convenções de estilo do projeto.
- Atualize documentação diretamente relacionada quando o comportamento ou os contratos mudarem.
- Mantenha `docs/engineering/2-styling.md` e `docs/engineering/3-testing.md` alinhados a mudanças nas convenções de estilo ou testes.
- Para decisões que alterem padrões, limites ou estrutura arquitetural compartilhados, consulte `/db-architecture` e atualize `docs/engineering/1-architecture.md`; implemente conforme a decisão documentada.
- SEO não faz parte desta skill. Para requisitos, documentação ou implementação de SEO, use `db-seo` e `docs/engineering/4-seo.md`.
- Quando receber achados de `/db-code-review`, faça a triagem e corrija os desvios confirmados. Para achados marcados como fora do definido, consulte o PRD e a documentação: implemente apenas se o requisito já estiver claro; caso contrário, peça esclarecimento e atualize a especificação antes de codificar. Após as correções, solicite uma nova revisão com `/db-code-review`.

## Verificação

1. Execute o teste, verificação de tipos, lint ou build existente mais específico que cubra as alterações.
2. Se a verificação falhar por causa da mudança, corrija e execute novamente. Não altere código não relacionado para contornar falhas preexistentes.
3. No resumo final, informe o que foi implementado, os arquivos alterados e as verificações executadas, incluindo falhas ou decisões ainda pendentes.
