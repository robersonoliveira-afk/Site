# Briefing — decks das aulas teóricas · 2026/1 · v2 (T6–T8)

Contrato de produção dos slides de **Gestão de Custos e Projetos Agropecuários** (Colégio Politécnico da UFSM). Turmas: Técnico em Agropecuária e Técnico em Agricultura de Precisão. Anexar este arquivo em conversa nova e pedir: "monte a T_n_".

## Estado atual (21 jul 2026)

| Deck | Status | Commit | Slides |
|---|---|---|---|
| aula-t1.html | pronto (piloto validado) | d7ac8e1 + a91a47b | 33 |
| aula-t2.html | pronto | 8c9698a | 26 |
| aula-t3.html | pronto | 8c9698a | 28 |
| aula-t4.html | pronto | c8b0509 | 26 |
| aula-t5.html | pronto | 25ae000 | 26 |
| **aula-t6.html** | **próximo** | — | — |
| aula-t7.html | pendente | — | — |
| aula-t8 (2 variantes) | pendente | — | — |

Commits locais sem push (o professor confere e faz o push). Repositório git em `Novo/Site/` (dentro da pasta Site).

## O entregável

Um arquivo HTML autocontido por aula, salvo em `Novo/Site/`, 25–35 slides, HTML/CSS/JS puro. Serve à projeção (2 períodos de 50 min) e ao estudo posterior.

**Template**: copiar integralmente o CSS/JS de `aula-t5.html` (acento terra, correto para T6–T8). Estrutura idêntica: um `<section class="slide" data-act="...">` por slide; navegação por setas/clique/swipe/hash; contador; `@media print` = apostila; colofão com declaração de IA. O guia de edição no topo do arquivo deve ser mantido.

## Design system

Fraunces (títulos) + IBM Plex Sans (corpo) + IBM Plex Mono (números/fórmulas), via Google Fonts. Tokens: `--paper #FAF7F0 · --paper-warm #F4EFE2 · --ink #1A1A17 · --ink-soft #3A3833 · --stone #6B6960 · --olive #3D4A2A · --mustard #B89233 · --terra #A8552E · --rule #D9D3C2`. T6–T8 = movimento **Decidir** = acento **terra** (`--accent:var(--terra); --accent-text:#8A4322; --accent-deep:#93492A; --terra-ink:#3D1E0E`; célula `.now` do mapa: fundo terra, texto paper). Fundo papel, sentence case, sem emoji, sem arroba de boi (usar kg, litros, ha, sacas).

Componentes prontos no template: `.formula`, `.callout`/`.callout.success`, `.tbl`, `ul.bullets`, `ul.check`, `.cascade` (+ variante `.row.bad`), `.cols2`/`.panel`, `.mock` (mockup do simulador), `.sem-map` (mapa do semestre), `.foto`.

## Estrutura fixa — 5 atos

1. **Onde estamos** (2–3): capa; mapa do semestre (marcar a semana com `.now`); o que o grupo já tem + "hoje destrava".
2. **Conceito** (12–18): um conceito por slide, fórmulas em `.formula`.
3. **Exemplo RS trabalhado** (4–6): caso gaúcho com números reais passo a passo (CEPEA, CONAB, EMATER/RS, IRGA, Campo Futuro/CNA).
4. **Mão no simulador** (2–3): tarefa de saída + checklist.
5. **Ponte** (2): próxima aula + blocos do site para revisar + colofão.

## Convenções firmadas (decisões já tomadas — não rediscutir)

- **Margens sobre a RL**: MB = RL − COE; ML = RL − COT; LE = RL − CT. É o que o simulador implementa (`projeto.html`, ~linha 1404: `mb=D.rl-D.coe`). Encargos da venda (Funrural 1,63%, comercialização 1,0–2,0%) saem no passo 1 (RB → RL) e **não** se repetem no COE.
- **COT = COE + depreciação + pró-labore** (bloco II.4 do site — o pró-labore está no COT, não fora).
- **CT = COT + custo de oportunidade do capital e da terra**. Rentabilidade sempre sobre o CT.
- Metodologia Matsunaga et al. (IEA, 1976), padrão Campo Futuro/CNA.
- Regra de ouro (repetir onde couber): *toda prática de manejo declarada precisa reaparecer como custo*.
- Ganchos AP em cada aula (receita/custo/margem por zona de manejo) — já plantados em T2, T3 e T5.

## Pendência a corrigir no site (quando conveniente)

- `parte-3.html`, bloco III.1: o texto define MB = **RB** − COE; corrigir para **RL** − COE (divergia do simulador e do briefing). Tabelas de indicadores usam LE÷RB (lucratividade) e LE÷CT (rentabilidade) — esses estão corretos.

## Materiais e dados já levantados (reutilizar sem nova busca)

- **IRGA custo arroz 2025/26** (publ. jun 2026, usado na T3): CT R$ 15.770,36/ha; produtividade 174,79 sc/ha; custo R$ 90,22/sc; CV R$ 11.781,29/ha (74,7%) = R$ 67,40/sc; depreciação R$ 1.245,59/ha; renda dos fatores R$ 2.743,47/ha; preço ref. R$ 61,02/sc. PDF: irga.rs.gov.br → Custos de Produção 2025/26. **Ótimo cenário-base para a T6** (PE e MS do arroz: produzir 174,79 vendendo a 61 = LE negativo; PE em sacas = CT/preço).
- **Exemplo T5 (leite, região central)**: 30 vacas, 600 L/dia, 219.000 L/ano; por litro: RL 2,40 · COE 2,05 · COT 2,45 · CT 2,75 → MB +0,35 · ML −0,05 · LE −0,35 (referência didática padrão Campo Futuro; atualizar em aula).
- **Exemplo T4 (trator 75 cv)**: R$ 200.000, residual 20%, 10 anos/10.000 h → R$ 16.000/ano, R$ 16/h (mercado 2026: R$ 160–260 mil).
- **Exemplo T2 (soja Santa Maria)**: 50 ha × 60 sc/ha × R$ 128/sc (posto cooperativa) → RB 384.000 → RL 371.981. Obs.: o parte-3.html usa R$ 120/sc no mesmo exemplo — pequena divergência, sem impacto.
- Os pptx/pdf antigos ("Aula N") seguem numeração antiga e **divergem** do plano novo (ex.: "Aula 3_26" = PE/MS/cenários → insumo da **T6**; tem bom gráfico RT×CT e simulações de queda de preço/produtividade). São insumo, não base.

## Resumo das aulas restantes

### T6 · S10 — Equilíbrio, análise marginal e cenários (terra)
Objetivos: ponto de equilíbrio e margem de segurança; função de produção e análise marginal (RM = CM); cenários pessimista/provável/otimista. Site: Parte III blocos 2–5 (`parte-3.html`: #fatores-producao, #marginal, #equilibrio, #cenarios) + autoavaliação de casa. Exemplo RS: cenários de preço da soja com câmbio; para AP, adubação a taxa variável na margem (site tem exemplo milho × ureia no #marginal). Simulador: **passo 6 como máquina de cenários** (variar preço/produtividade no passo 1 e observar propagação). Saída: cenário pessimista registrado. Insumo antigo útil: "Aula 3_26.pdf" (PE, MS, simulações) e "Analise_Marginal_Agricola.pptx".

### T7 · S11 — Crédito rural e fluxo de caixa (terra)
Objetivos: Plano Safra, enquadramento (Pronaf/Pronamp/demais), custeio × investimento; fluxo de caixa e capital de giro; checklist de documentos (retomar croqui/CAR da S2 — referência cruzada, sem reensinar). Site: Parte IV blocos 1–2 + painel `credito.html` (cada aluno consulta seu município). Exemplo RS: custeio × investimento no painel BCB; juros Pronaf vs. taxa livre. Simulador: **passo 0, seção crédito**. Saída: enquadramento do projeto justificado. Material de apoio na pasta: CARTILHA_DIGITAL_CrditoPlanoSafra20252026.pdf (conferir se saiu Plano Safra 2026/27 — buscar).

### T8 · S12 — Módulos aplicados + investimento (terra) — DUAS VARIANTES
`aula-t8-agropecuaria.html` e `aula-t8-ap.html`, parte comum idêntica. Comum: perenes (implantação, formação, análise plurianual); payback, VPL e TIR. Variante Agropecuária: UA e lotação, custos no confinamento, leite (calculadora `rebanho.html`). Variante AP: tecnologia como decisão econômica; viabilidade do investimento em AP (monitor de colheita se paga em quantos ha?). Site: Parte V conforme turma + `vinhedo.html`. Simulador: **passos 5–6**. Saída: perenes com passo 5 fechado.

## Processo

1. Ler o template (`aula-t5.html`) e os blocos do site da aula antes de montar; material antigo é insumo, não base.
2. Buscar números reais atuais para o exemplo RS (fonte + data no colofão); onde não houver dado público, usar referência didática com nota "atualizar em aula".
3. Verificar antes de entregar: HTML válido (parser), contas do exemplo conferidas em código, navegação/impressão, nomes e âncoras contra o site (`parte-N.html#id`).
4. Commit sem push. Se o git travar com lock (OneDrive), remover `.git/*.lock` e repetir (pode precisar habilitar exclusão de arquivos na sessão).
5. Colofão sempre com declaração de uso de IA (texto padrão nos decks prontos).
