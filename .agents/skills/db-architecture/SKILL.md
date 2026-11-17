---
name: db-architecture
description: "Defina e atualize a arquitetura técnica deste projeto SvelteKit Dragon Ball. Use para decisões de estrutura, stack, integrações, limites entre camadas, renderização, dados ou mudanças em docs/engineering/1-architecture.md; atualize o PRD se uma decisão técnica alterar requisitos de produto."
argument-hint: "Descreva a decisão ou mudança arquitetural"
---

# Arquitetura

Defina e documente decisões arquiteturais para este projeto. O resultado principal é uma arquitetura coerente com o código, a stack instalada, os requisitos de produto e as demais convenções de engenharia. Esta skill documenta decisões; não implementa funcionalidades.

## Antes de decidir

1. Leia `docs/engineering/1-architecture.md` e `docs/product/1-prd.md`.
2. Consulte `docs/engineering/2-styling.md`, `3-testing.md`, `4-seo.md` e `5-code-review.md` quando a decisão afetar esses domínios.
3. Inspecione arquivos relevantes do projeto — especialmente `package.json`, configuração TypeScript, rotas, módulos e estrutura existente. Trate o código como evidência da implementação atual, não como requisito automático para a arquitetura futura.
4. Consulte documentação oficial da stack ou do serviço externo quando a decisão depender de comportamento específico não estabelecido nos documentos.
5. Preserve mudanças existentes e limite o escopo aos documentos e decisões necessários.

## Processo de decisão

1. Registre o problema técnico e os requisitos ou restrições que o motivam.
2. Separe requisitos de produto de decisões de implementação. A arquitetura não deve decidir comportamento do usuário, escopo funcional ou política de produto por conta própria.
3. Compare alternativas razoáveis apenas quando elas afetarem significativamente dependências, limites de módulos, segurança, deploy ou custo de manutenção. Explique os trade-offs e escolha uma opção simples que atenda aos requisitos conhecidos.
4. Se faltar uma decisão de produto necessária — por exemplo, regra de vencedor no versus, indexação pública ou comportamento de falha — não a invente. Pergunte ao usuário ou registre a dependência como pendente.
5. Atualize `docs/engineering/1-architecture.md` preservando a estrutura e removendo orientações obsoletas ou incompatíveis com a decisão adotada.
6. Atualize `docs/product/1-prd.md` somente quando a decisão técnica alterar uma capacidade, restrição, dependência ou critério de aceitação observável do produto. Descreva o impacto sem misturar detalhes internos de implementação nos requisitos funcionais.
7. Se a alteração mudar diretamente as convenções de estilo, testes ou SEO, atualize também o documento responsável: `2-styling.md`, `3-testing.md` ou `4-seo.md`. Para execução de tarefas de SEO, encaminhe o trabalho operacional a `/db-seo`.
8. Não crie pastas, módulos, dependências, serviços ou exemplos de implementação vazios apenas para antecipar a arquitetura proposta.

## Limites de responsabilidade

- `/db-architecture` decide e documenta arquitetura; não implementa código de funcionalidade nem substitui `/db-dev`.
- `/db-prd` é responsável por especificação de produto. Quando uma decisão arquitetural depender de um requisito de produto indefinido, encaminhe a pergunta para esclarecimento; não resolva a ambiguidade por inferência técnica.
- `/db-dev` implementa funcionalidades conforme o PRD e a arquitetura aprovada. Mudanças arquiteturais que surgirem durante a implementação devem ser documentadas nesta skill antes ou junto da mudança, quando alterarem padrões ou limites compartilhados.
- `/db-code-review` verifica o diff contra os documentos aprovados. Se o review identificar uma lacuna arquitetural, registre-a como fora do definido e encaminhe a `/db-dev` para triagem, que pode solicitar uma atualização desta arquitetura.

## Verificação e entrega

- Confirme que as referências relativas, nomes de arquivos, stack e comandos citados correspondem ao repositório atual.
- Para mudanças somente documentais, revise consistência entre PRD e documentos de engenharia; não execute testes sem necessidade.
- Para qualquer implementação incidental autorizada separadamente, valide com os comandos existentes e informe exatamente o que foi executado.
- Ao concluir, resuma a decisão, alternativas relevantes, documentos alterados, impacto no produto e pendências que ainda precisam de decisão.
