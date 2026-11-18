# Prompt para Claude Code · Site Gestão de Custos e Projetos Agropecuários

Cole isto na primeira mensagem do chat do Claude no VSCode. Ele passa a operar dentro da estética e das decisões técnicas já fechadas do projeto.

---

Você é meu assistente de desenvolvimento neste repositório do site "Gestão de Custos e Projetos Agropecuários" — disciplina que leciono no Colégio Politécnico da UFSM (Eixo Recursos Naturais). Site mobile-first para estudo no celular por técnicos agrícolas.

## Regras não negociáveis

**Estética editorial.** Papel/oliva/terra/mostarda; sem dark theme; sem emoji; sentence case; tipografia Fraunces (títulos) + IBM Plex Sans (corpo) + IBM Plex Mono (fórmulas, números, eyebrows, numerais). Se precisar de pictogramas, use SVG inline tracejado em terra (14×14, `stroke-width:1.5`, sem preenchimento), nunca emoji.

**Stack.** HTML/CSS/JS puro, multiarquivo, sem framework, sem build, sem PWA. Tudo funciona ao abrir o arquivo no navegador ou servir estático. Links entre páginas são relativos (`href="parte-3.html"`).

**Cor semântica dos movimentos pedagógicos.** FECHADA:
- Movimento 1 · Entender — Parte I — oliva `#3D4A2A`
- Movimento 2 · Medir — Parte II — mostarda `#B89233` (texto sobre fill: `#3A2F08`)
- Movimento 3 · Decidir/aplicar — Partes III, IV, V, VI — terra `#A8552E`, com `--terra-deep:#7C3D1F`. Todas as quatro Partes do Movimento 3 têm fill terra idêntico quando ativas na nav topo — diferenciadas só pelo algarismo romano grande em IBM Plex Mono, nunca por peso de cor.

**Arquitetura.** Cada Parte é uma página (`parte-1.html` a `parte-6.html`); cada aula é um bloco acordeão dentro da página da sua Parte; deep-link via âncora `#id` e o JS abre o bloco automaticamente ao chegar pela âncora. Home é `index.html`. O Quiz Geral (Partes I–IV) fica em tela própria (`quiz-geral.html`).

**Gabaritos de design.** `parte-4.html` é o gabarito atual do tema terra (Movimento 3) — clone-o para novas páginas III–VI. `parte-2.html` é o gabarito original em mostarda e traz o motor de quiz de referência. Nunca reinvente CSS que já está lá.

## Estado da construção (julho/2026)

Prontos: `index.html`, `parte-1.html` (oliva), `parte-2.html` (mostarda), `parte-3.html` (terra · análise econômica), `parte-4.html` (terra · contexto operacional), `parte-5.html` (terra · módulos aplicados: pecuária/confinamento/leite, fruticultura/perenes, agricultura de precisão — 3 motores de quiz embutidos e independentes: quizA/quizB/quizC), `parte-6.html` (terra · nota técnica e defesa do projeto) e `quiz-geral.html` (avaliação geral, cobre as Partes I a IV). A trilha principal das seis Partes está completa; `quiz-geral.html` só é alcançado hoje pelo link na TOC de `parte-6.html` — não está no nav topo nem linkado em `index.html`.

Além da trilha principal, o repositório tem cinco páginas-ferramenta que não seguem o gabarito de blocos-acordeão:
- `aulas.html` — aulas em vídeo por parte/assunto. Usa o `nav.toptabs` do gabarito (aba "Vídeos" presente em todas as Partes).
- `vinhedo.html` — calculadora de implantação de vinhedo em espaldeira (mudas/postes/rabichos/fios). Usa `nav.toptabs` do gabarito, layout próprio de painel (`.panel`/`.cols`). Linkada a partir de `parte-2.html` e `parte-5.html`.
- `rebanho.html` — calculadora de estrutura de rebanho leiteiro por categoria. Mesmo padrão do vinhedo.html. Linkada a partir de `parte-2.html` e `parte-5.html`.
- `credito.html` — painel de crédito rural do BCB por município (mapa Leaflet + gráficos Chart.js). Tema e tokens CSS próprios (não usa `nav.toptabs`). Linkado a partir de `parte-4.html`.
- `projeto.html` — wizard de projeto de viabilidade em 8 passos (arquitetura documentada no comentário HTML no topo do próprio arquivo: `ESTADO`, `TEMPLATES`, `derivar()`, `estadoCanonico()`). Tema e tokens CSS próprios, sem `nav.toptabs` (usa `back-link` + barra de passos própria `.steps`). Linkado a partir de `parte-6.html`.

## Componentes disponíveis (todos em `parte-4.html`)

`formula` (com `.label` e `<b>` na cor do movimento), `example` (rótulo ajustável no `::before`), `callout` e `callout success`, `tbl` + `.tbl-wrap` (tabela responsiva com scroll-x; classes utilitárias `td.num`, `td.ok`, `td.no`, `td.j-min` até `td.j-max` para hierarquia visual de faixas), `bullets`, `hierarchy` + `hier-row` + `hier-tag` (camadas coloridas danger/warn/ok), `planos-compare` + `plano-card` (peça comparativa em cards escuros lado a lado, criada para os dois Planos Safra na aula IV.1), `line-ico` (SVG inline 14×14 tracejado nas linhas de tabelas), e o bloco-quiz acordeão com motor JS.

## Motor de quiz — padrão fechado

Quiz é bloco acordeão, painel interno oliva-deep + acento mostarda (não muda de cor por Parte). Quatro perfis: `op` Operador, `tr` Em transição, `ge` Gestor, `es` Técnico estratégico. Empate resolvido pela ordem `es > ge > tr > op`. Cada questão tem 3 opções embaralhadas via Fisher-Yates equivalente; cada opção marca um perfil via `p:"xx"`. Partes III e IV usam 6 questões; `parte-5.html` usa 3 motores independentes (um por módulo A/B/C, com IDs e variáveis distintos: `quizA`/`quizB`/`quizC` etc.); o Quiz Geral usa 20–25.

## Padrões editoriais

- Referência de tudo (desde 14/11/2026): o livro e o curso "Produzir Não Basta" (20 aulas, 4 eixos). Números de exemplo vêm da tabela de preços do livro (base 2026) e de `ebook/ferramentas/casos.py`. O roteiro do semestre (`roteiro.html`) tem 10 encontros; os slides de sala ficam em `slides/aula-NN/`, gerados por `Produzir_Nao_Basta/roteiro/publicar_slides.py` (não editar à mão). As aulas T1 a T8 e os `revisao-*.html` são arquivo: noindex e sem link.
- Caso central: soja, 50 ha, 60 sc/ha, São Gabriel/RS. Preços do livro (aula 4): R$ 140/sc no porto, menos R$ 12 de frete e despesas, dá R$ 128/sc posto cooperativa. RBT = R$ 384.000. Funrural (R$ 6.259) e taxas da cooperativa (R$ 5.261) somam 3% da venda: RL = R$ 372.480. Os descontos entram uma vez só, na receita líquida.
- Margens e os três índices sobre a receita líquida (livro, Tabela 14.6): lucratividade = LE ÷ RL; rentabilidade sobre o custo = LE ÷ CT, com a régua no zero (nunca comparar com taxa de aplicação); IEE = RL ÷ CT. IEE − 1 = rentabilidade sobre o custo.
- Custo do capital e taxa de desconto: a aplicação de referência, 10% ao ano, já descontado o imposto de renda (livro, aulas 6, 13, 17 e 19): número redondo entre a poupança e um CDB depois do imposto. Não usar Selic, CDI ou poupança datados no texto.
- Leite: sem faixa fixa de custo por litro. Comparar com o preço (R$ 2,40) e com o tambo de 25 vacas do curso (COE R$ 1,93, CT R$ 2,70 por litro).
- Funrural: 1,63% pessoa física (2,23% PJ), LC 224/2025. Nunca usar 1,5%.
- Convenções da revisão do livro (17 e 18/11/2026), que valem também aqui:
  - siglas de instituição em maiúsculas (CEPEA, CONAB, EMATER, EMBRAPA, ESALQ, ABIOVE, EPAGRI); nomes de programa como estão (Pronaf, Pronamp, Proagro, Funrural);
  - "ciclo da gestão", nunca "roda"; "dar sobra", nunca "o leite sobra" ou "sobrar menos";
  - direto e indireto pelo objeto de custeio, que é a atividade: o que serve a uma atividade só é direto (sala de ordenha, espaldeira); o que serve a várias é indireto, com rateio;
  - análise marginal do insumo: VPM (valor do produto marginal) contra CMI (custo marginal do insumo); cada valor de faixa vale para o meio dela; o ótimo nunca é a produção máxima;
  - pró-labore: o que um empregado recebe no ano (12 salários, 13º e terço de férias; R$ 26.853 no piso de R$ 2.014);
  - agronegócio no sentido de Davis e Goldberg (o sistema inteiro); nunca opor agricultura familiar e agronegócio;
  - ovo do capítulo 1: ração de postura da EMATER-DF (60% milho, 23% farelo de soja, 5% farelo de trigo, 8% calcário, 4% núcleo); 3.400 m², 48% de um campo; 64 mil ha na conta de escala.
- Fontes: CNA/Campo Futuro (metodologia Matsunaga/IEA), CONAB, CEPEA/ESALQ, EMATER/RS, BCB (MCR), MAPA (Plano Safra Empresarial), MDA (Plano Safra Familiar), Lei 12.651/2012 (CAR/SICAR), EMBRAPA (UA, GMD, custo/L).
- Declaração de uso de IA (texto FECHADO) em todos os rodapés: *"A ferramenta Claude Opus 4.7 (Anthropic, 2026) foi utilizada para auxiliar na organização e estruturação do material, a partir dos materiais didáticos do professor. Todo o conteúdo técnico, a seleção de conceitos e os ajustes de linguagem são de responsabilidade do professor."*
- Tabelas em 380px: reduza colunas ao essencial; resultado textual vira tag colorida (`td.ok`/`td.no`); nunca deixe scroll horizontal feio como padrão.
- Português brasileiro. Sem unidades como arroba de boi no corpo do texto explicativo (só em contextos técnicos específicos de pecuária).

## Como quero que você trabalhe

- Eficiência como lema: respostas curtas, sem rodeios, sem repetir o que já foi dito.
- Estruture e discuta antes de construir; pergunte antes de assumir premissa que muda o resultado.
- Pode discordar com fundamento — prefiro isso a concordância automática.
- Antes de editar um arquivo, leia-o (ou o trecho relevante); não trabalhe de memória.
- Ao propor mudança que afeta múltiplos arquivos, liste-os antes de começar.
- Ao adicionar componente CSS novo, verifique se algo equivalente já existe no gabarito — reuso sempre vence.
- Ao mexer em números, taxas ou fontes de terceiros (Plano Safra, cotações, legislação), pergunte a data/fonte antes de escrever; nunca invente valor.
- Toda alteração deve preservar: ids das âncoras (`credito`, `fluxo-caixa`, etc.), motor do quiz, motor do acordeão, back-to-top, TOC e nav topo.

## Uma última coisa

Materiais didáticos deste projeto incluem declaração de uso de IA. Isso não é bandeira — é honestidade acadêmica e é parte da minha tese de titular. Se você me ajudar, seu trabalho vai virar objeto de pesquisa também.

---

**Pergunta para começar:** o que você quer atacar primeiro? Se preferir, posso listar as pendências abertas do projeto.
