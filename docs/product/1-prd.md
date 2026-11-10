# PRD — Catálogo de personagens Dragon Ball

**Status:** Rascunho  
**Versão:** 1.3

## Visão do produto

Aplicação de estudo para portfólio que permite explorar personagens do universo Dragon Ball, encontrá-los por busca com autocomplete, consultar uma página individual de detalhes e comparar dois personagens em uma página de versus. A primeira versão não exige login.

## Problema

Quem visita a aplicação precisa de uma forma direta de consultar informações sobre personagens de Dragon Ball e colocá-los lado a lado.

## Público e objetivo

- **Público:** visitantes do portfólio interessados em explorar personagens de Dragon Ball.
- **Objetivo do projeto:** demonstrar uma experiência de catálogo, busca e comparação de personagens em um produto funcional para portfólio.

## Escopo da primeira versão

### Incluído

- Página inicial com catálogo de personagens obtidos da [Dragon Ball API](https://web.dragonball-api.com/documentation).
- Busca com autocomplete por nome de personagem.
- Página pública de detalhes para cada personagem, acessível a partir do catálogo e das sugestões de busca.
- Seleção de dois personagens a partir do catálogo e acesso a uma página de versus.
- Comparação lado a lado das informações e dos valores de Ki disponíveis para os personagens e suas transformações.
- Tema claro e escuro, com alternância manual e persistência da preferência escolhida.
- Uso dos fluxos principais sem autenticação ou conta.

### Fora do escopo

- Login e criação de contas na primeira versão.

## Histórias de usuário

1. Como visitante, quero explorar um catálogo de personagens para conhecer as informações disponíveis sobre o universo Dragon Ball.
2. Como visitante, quero buscar um personagem com sugestões de autocomplete para encontrá-lo sem percorrer todo o catálogo.
3. Como visitante, quero abrir a página de um personagem a partir do catálogo ou das sugestões de busca para consultar seus detalhes.
4. Como visitante, quero iniciar uma comparação a partir dos detalhes de um personagem e escolher outro no catálogo para entender suas diferenças e níveis de poder.
5. Como visitante, quero usar o produto sem criar uma conta.
6. Como visitante, quero alternar entre tema claro e escuro e manter minha preferência nas próximas visitas.

## Requisitos funcionais

1. A página inicial deve apresentar o catálogo de personagens fornecido pela Dragon Ball API.
2. A busca deve oferecer sugestões correspondentes ao nome digitado, usando os resultados de personagens fornecidos pela API.
3. O visitante deve poder selecionar dois personagens diferentes a partir do catálogo e abrir uma página de versus com ambos.
4. A página de versus deve apresentar lado a lado os dados de cada personagem fornecidos pela API, incluindo informações gerais, valores de Ki e transformações quando disponíveis.
5. A aplicação não deve exigir autenticação para consultar o catálogo, usar a busca, acessar detalhes ou acessar uma comparação.
6. A interface deve distinguir carregamento, catálogo sem resultados e falha ao carregar os dados; uma falha não deve ser apresentada como catálogo carregado com sucesso.
7. Quando a API não fornecer um dado solicitado para detalhes ou necessário para uma comparação, a interface não deve inventar ou inferir esse dado.
8. A aplicação deve oferecer controles para alternar entre tema claro e tema escuro em suas páginas públicas.
9. Em uma primeira visita sem preferência previamente salva, a aplicação deve iniciar no tema claro.
10. A escolha explícita do visitante entre tema claro e escuro deve ser salva e restaurada em visitas posteriores.
11. A mudança de tema deve ser aplicada consistentemente às páginas públicas sem exigir recarregamento, e o controle deve comunicar seu propósito de forma acessível.
12. Cada personagem deve ter uma página pública própria, que possa ser aberta a partir do catálogo e das sugestões de busca sem impedir a seleção de personagens para o versus.
13. A página de detalhes deve apresentar as informações do personagem fornecidas pela API, incluindo, quando disponíveis, nome, imagem, descrição, raça, gênero, afiliação e valores de Ki, além dos dados do planeta de origem e das transformações.
14. Um identificador inválido ou inexistente não deve resultar em uma página de detalhes apresentada como carregada com sucesso; a interface deve informar que não foi possível encontrar ou carregar o personagem.
15. A página de detalhes deve oferecer uma ação para iniciar a comparação daquele personagem, permitindo escolher o segundo personagem no catálogo.

## Critérios de aceitação

- A página inicial permite consultar o catálogo sem login.
- Ao digitar uma consulta, a busca apresenta sugestões correspondentes a personagens disponíveis no catálogo.
- Cada item do catálogo e cada sugestão de busca permitem abrir a página de detalhes do personagem correspondente; a ação de abrir detalhes não substitui a ação de selecionar personagens para o versus.
- A página de detalhes identifica o personagem e apresenta as informações disponíveis da API, incluindo planeta de origem e transformações quando fornecidos.
- Um dado não fornecido pela API é indicado como indisponível ou omitido, sem conteúdo inventado.
- Um identificador inválido ou inexistente não é apresentado como uma página de detalhes carregada com sucesso; a interface informa que os detalhes não puderam ser encontrados/carregados.
- A ação de comparar na página de detalhes retorna ao catálogo com aquele personagem selecionado; o visitante pode escolher outro personagem e abrir o versus.
- Após escolher dois personagens diferentes no catálogo, o visitante chega a uma página que identifica e apresenta os dois personagens.
- A página de versus compara lado a lado os dados disponíveis para ambos, incluindo valores de Ki e transformações quando fornecidos pela API.
- O vencedor só é indicado segundo uma regra de comparação previamente definida; sem essa regra ou sem os dados necessários, a interface não afirma um vencedor.
- Estados de carregamento, ausência de resultados e falha de carregamento são distinguíveis pelo visitante.
- Uma primeira visita sem preferência salva apresenta o tema claro.
- O visitante pode alternar entre os temas claro e escuro e a mudança é aplicada às páginas públicas sem recarregar a página.
- Após escolher um tema, o visitante pode navegar entre páginas e retornar em uma visita posterior mantendo a escolha.
- O controle de tema tem nome acessível e permite identificar e acionar a alternância.
- Nenhum dos fluxos da primeira versão solicita login.

## Decisões pendentes

- **Uso da API:** Dragon Ball API definida como fonte de dados. Confirmar limites de uso, disponibilidade, condições de utilização e eventuais requisitos de atribuição antes de publicar o portfólio.
- **Campos do catálogo:** apresentar as informações úteis fornecidas pela API sem pressupor que todos os recursos tenham os mesmos campos; definir a apresentação final dos dados após validar as respostas completas.
- **Vencedor do versus:** definir se haverá vencedor e qual regra será usada. A API retorna `ki` e `maxKi` como textos (por exemplo, `"60.000.000"` e `"90 Septillion"`), além de `ki` textual para transformações; não se deve tratá-los como valores numéricos comparáveis sem definir e validar uma interpretação. Até essa decisão, comparar os dados sem declarar vencedor.
- **Busca:** definir o comportamento para consultas sem correspondência e detalhes de correspondência (por exemplo, nomes parciais e variações de acentuação).
- **Catálogo:** a primeira versão usa paginação explícita com 12 personagens por página. Reavaliar somente se o volume ou a experiência de uso exigir carregamento incremental.
- **Página de detalhes:** definida como uma página pública por personagem, acessível tanto no catálogo quanto nas sugestões de busca; a apresentação respeita a disponibilidade dos campos na resposta da API.

## Fonte de dados

- **Documentação:** [web.dragonball-api.com/documentation](https://web.dragonball-api.com/documentation).
- **Catálogo e busca:** `GET https://dragonball-api.com/api/characters`, com paginação por `page` e `limit`. A consulta `name` foi verificada como filtro por nome; a listagem retorna itens e metadados/links de paginação.
- **Detalhes:** `GET https://dragonball-api.com/api/characters/{id}` retorna informações adicionais, incluindo planeta de origem e transformações.
- **Campos observados:** `id`, `name`, `ki`, `maxKi`, `race`, `gender`, `description`, `image`, `affiliation`; nos detalhes, também `originPlanet` e `transformations`.
- Os exemplos de respostas foram consultados em 9 de novembro de 2026; conteúdo e disponibilidade podem mudar. Validar o contrato e as políticas da API antes da implementação e publicação.

## Dependências e observações

A fonte de dados está definida. A regra de vencedor e a confirmação das condições de uso da API continuam necessárias para fechar o escopo do versus e preparar a publicação. Nenhuma fórmula de vitória é assumida neste rascunho.
