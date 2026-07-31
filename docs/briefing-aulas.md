# Briefing — decks das aulas teóricas · 2026/1

Contrato de produção dos slides de **Gestão de Custos e Projetos Agropecuários** (Colégio Politécnico da UFSM). Turmas: Técnico em Agropecuária e Técnico em Agricultura de Precisão. Anexar este arquivo em cada conversa nova junto com o material do semestre passado da aula correspondente e pedir: "monte a T_n_".

## O entregável

Um arquivo HTML autocontido por aula (`aula-t1.html` … `aula-t8.html`), salvo no repositório do site (`Novo/Site/`), no padrão visual do site da disciplina. HTML/CSS/JS puro, sem framework, sem build. Deck **completo (25–35 slides)**: serve à projeção em aula e ao estudo posterior do aluno.

Duração do encontro: 2 períodos de 50 min (**confirmar/ajustar**).

## Design system (idêntico ao site)

Fontes (Google Fonts): **Fraunces** (títulos, serifada), **IBM Plex Sans** (corpo), **IBM Plex Mono** (números, rótulos, fórmulas).

Tokens: `--paper #FAF7F0` · `--paper-warm #F4EFE2` · `--ink #1A1A17` · `--ink-soft #3A3833` · `--stone #6B6960` · `--olive #3D4A2A` · `--mustard #B89233` · `--terra #A8552E` · `--rule #D9D3C2`.

Cor de acento por movimento pedagógico:

| Aulas | Movimento | Acento |
|---|---|---|
| T1 | Entender | oliva |
| T2–T4 | Medir | mostarda |
| T5–T8 | Decidir | terra |

Estética: fundo papel (nunca dark), limpo, sentence case, sem emoji, muito espaço em branco. Componentes do site reutilizáveis: `.formula` (borda esquerda oliva, mono), `.callout` / `.callout.success`, `.tbl`, `ul.bullets` com `›`.

## Mecânica do deck

- Um `<section>` por slide; navegação por setas do teclado, clique/toque (metade direita avança, esquerda volta) e swipe.
- Contador `n / total` discreto (mono, canto inferior).
- Navegação por hash (`aula-t3.html#12` abre o slide 12).
- Proporção pensada para projetor 16:9; texto legível do fundo da sala (corpo ≥ 24px projetado).
- `@media print`: todos os slides em sequência, um por página — vira o PDF/apostila do aluno.
- Sem dependências além do Google Fonts. Gráficos: SVG inline ou Chart.js do CDN Cloudflare só se indispensável.
- Último slide: colofão com declaração de uso de IA (padrão do docente) e blocos do site para revisão.

## Estrutura fixa — 5 atos

1. **Onde estamos** (2–3 slides): mapa do semestre, o que o grupo já tem no simulador, o que a aula de hoje destrava.
2. **Conceito** (12–18 slides): o conteúdo da aula, um conceito por slide, fórmulas em `.formula`, definições curtas — profundidade suficiente para estudo posterior.
3. **Exemplo RS trabalhado** (4–6 slides): um caso gaúcho com números reais resolvido passo a passo (fontes: CEPEA, CONAB, EMATER/RS, IRGA, Campo Futuro/CNA, cooperativas).
4. **Mão no simulador** (2–3 slides): a tarefa de saída — qual passo preencher, o que precisa estar pronto ao fim da aula, captura de tela do passo.
5. **Ponte** (2 slides): o que vem na próxima aula + blocos do site e autoavaliações para revisar + colofão.

## Diretrizes de conteúdo

- Português brasileiro. Metodologia de custos Matsunaga/IEA (base CNA/Campo Futuro). Estrutura COE → COT → CT.
- Não usar arroba de boi como unidade; usar kg, litros, hectares, sacas quando consagrado.
- Exemplos sempre ancorados no RS.
- O material do semestre passado é **insumo, não base**: aproveitar exemplos numéricos e sequências que funcionaram; reescrever o resto na estrutura nova.
- Regra de ouro do curso (repetir onde couber): *toda prática de manejo declarada precisa reaparecer como custo*.

## Processo

1. **T1 é o piloto.** Montar, o professor valida densidade/tom/visual, ajustar o template — só então produzir as demais.
2. T8 sai em **duas variantes**: `aula-t8-agropecuaria.html` e `aula-t8-ap.html` (parte comum idêntica).
3. Verificação antes de entregar: HTML válido, navegação e impressão testadas, contraste, nomes/números conferidos contra o site.
4. Commit sem push (o professor confere e faz o push).

## Resumo das 8 aulas

### T1 · S3 — A propriedade como empresa + SWOT (oliva)
Objetivos: propriedade rural como empresa num sistema; planejar antes de calcular; aplicar SWOT. Site: Parte I completa. Exemplo RS: SWOT de propriedade leiteira familiar da região de Santa Maria. Simulador: **passo 0** (identificação, enquadramento, SWOT interativa). Saída: identificação + 2 itens por quadrante.

### T2 · S4 — Receita: da bruta à líquida (mostarda)
Objetivos: RB = produção × preço; deduções (Funrural, comercialização) → RL; fontes de preço (CEPEA, CONAB, cooperativas); outras receitas. Site: Parte III bloco 1 (receita) + Parte IV bloco 3 (preços). Exemplo RS: soja em Santa Maria com preço CEPEA do dia vs. cotação da cooperativa. Simulador: **passo 1**. Saída: RB → RL com preço real pesquisado.

### T3 · S5 — Do manejo técnico ao custo (mostarda)
Abertura: retomar a área marcada na S2 ("vocês têm o onde; hoje o como"). Objetivos: diagnóstico técnico → itens de custo; classificação fixo×variável, direto×indireto (Matsunaga). Site: Parte II blocos II.1 e II.3 (o II.2, croqui/CAR, já foi dado na S2). Exemplo RS: arroz irrigado da Fronteira Oeste; discutir energia da irrigação (fixa ou variável?). Simulador: **passos 2–3**. Saída: manejo descrito + lista de custos rascunhada.

### T4 · S6 — COE, COT e Custo Total (mostarda)
Objetivos: COE com itens diretos e automáticos (%); COT = COE + depreciação; CT = COT + remuneração dos fatores; depreciação linear. Site: Parte II blocos II.4–II.5; autoavaliação de casa. Exemplo RS: trator 75 cv — depreciação anual e por hora; o autoengano de não pagar a própria mão de obra. Simulador: **passos 3–4 completos**. Saída: COE → COT → CT fechados.

### T5 · S9 — Margens e indicadores (terra)
Objetivos: RL−COE = MB; RL−COT = ML; RL−CT = lucro; o que cada margem diz para curto/médio/longo prazo. Site: Parte III bloco 1 completo. Exemplo RS: leite na região central — MB positiva com lucro negativo (referência Campo Futuro/CNA). Simulador: **passo 6** (resultado por nível). Saída: interpretação escrita das três margens do projeto.

### T6 · S10 — Equilíbrio, análise marginal e cenários (terra)
Objetivos: ponto de equilíbrio e margem de segurança; função de produção e análise marginal; cenários pessimista/provável/otimista. Site: Parte III blocos 2–5; autoavaliação de casa. Exemplo RS: cenários de preço da soja com câmbio; para AP, adubação a taxa variável na margem. Simulador: **passo 6 como máquina de cenários** (variar preço/produtividade no passo 1 e observar a propagação). Saída: cenário pessimista registrado.

### T7 · S11 — Crédito rural e fluxo de caixa (terra)
Objetivos: Plano Safra, enquadramento (Pronaf/Pronamp/demais), custeio × investimento; fluxo de caixa e capital de giro; checklist de documentos (retomar croqui/CAR da S2 — referência cruzada, sem reensinar). Site: Parte IV blocos 1–2 + painel `credito.html` (cada aluno consulta seu município). Exemplo RS: custeio × investimento no painel BCB; juros Pronaf vs. taxa livre. Simulador: **passo 0, seção crédito**. Saída: enquadramento do projeto justificado.

### T8 · S12 — Módulos aplicados + investimento (terra) — DUAS VARIANTES
Parte comum: perenes (implantação, formação, análise plurianual); payback, VPL e TIR. Variante Agropecuária: UA e lotação, custos no confinamento, leite (calculadora `rebanho.html`). Variante AP: tecnologia como decisão econômica; viabilidade do investimento em AP (monitor de colheita se paga em quantos ha?). Site: Parte V conforme turma + `vinhedo.html` como exemplo de investimento perene. Simulador: **passos 5–6** (perenes preenchem o 5; todos leem VPL/TIR/payback no 6). Saída: perenes com passo 5 fechado.
