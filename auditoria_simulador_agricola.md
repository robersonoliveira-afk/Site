
================================================================================
AUDITORIA DO SIMULADOR DE PROJETO AGROPECUÁRIO (projeto.html)
Data da análise: 11/08/2026
================================================================================

CLASSIFICAÇÃO DOS ACHADOS:
  [CRÍTICO]  = Erro de cálculo que distorce resultados financeiros
  [ALTO]     = Falha de consistência que pode gerar dados duplicados/omitidos
  [MÉDIO]    = Limitação funcional ou falta de validação
  [BAIXO]    = Melhoria de UX, performance ou clareza

--------------------------------------------------------------------------------
1. ERROS DE CÁLCULO E FÓRMULAS
--------------------------------------------------------------------------------

[CRÍTICO-001] Depreciação de bens (passo 4) é incluída no fluxo de caixa 
               das perenes (passo 6)
  Local: função pintarPerene(), linha ~ctCaixa=D.ct-D.depFormacao
  Problema: O fluxo de caixa para VPL/TIR/payback remove apenas a depreciação 
            da formação (depFormacao), mas mantém a depreciação dos bens de 
            capital (depBens) como se fosse desembolso de caixa.
  Impacto: Custo de caixa da fase produtiva fica artificialmente inflado, 
           reduzindo VPL e TIR indevidamente.
  Correção: ctCaixa deve excluir TODA a depreciação:
            ctCaixa = D.ct - D.dep  (onde D.dep = depBens + depFormacao)
            ou equivalentemente:
            ctCaixa = D.coe + D.prol + D.out + D.remCap + D.remTerra

[CRÍTICO-002] Exemplo "Uva BRS Magna" duplica o investimento de implantação
  Local: constante EXEMPLO_UVA, p4.bens
  Problema: O exemplo lança R$ 104.000 como "bem depreciável" no passo 4 E 
            também lança os mesmos R$ 104.000 em itens de implantação no 
            passo 5. O código calcula depreciação da formação automaticamente 
            a partir do passo 5 (depFormacao = 104.000/15 = 6.933/ano) E 
            ainda soma a depreciação do bem do passo 4 (104.000/15 = 6.933).
  Impacto: Depreciação total fica 13.866/ano em vez de 6.933/ano. COT e CT 
           ficam superestimados em R$ 6.933/ano.
  Correção: No exemplo, remover o bem do passo 4 OU zerar os itens do passo 5.
            Recomendação: manter apenas o passo 5 (implantação) e deixar o 
            passo 4 apenas com máquinas/benfeitorias além do pomar.

[ALTO-003] Área desvinculada entre passo 1 (qtd) e passo 5 (area5)
  Local: passo 1 (input#qtd) vs passo 5 (input#area5)
  Problema: Para culturas perenes, o usuário informa a área no passo 1 
            (unidade "ha") e informa novamente a área implantada no passo 5.
            Se os valores divergirem (ex: 10 ha no passo 1 e 5 ha no passo 5),
            a receita é calculada para 10 ha e o investimento para 5 ha,
            gerando inconsistência metodológica grave.
  Impacto: VPL, TIR e payback ficam sem sentido econômico.
  Correção: Vincular os campos (oninput de um atualiza o outro) OU usar o 
            mesmo campo. Sugestão: no passo 5, usar o valor de #qtd como 
            área padrão e apenas permitir override com alerta visual.

[ALTO-004] Criação de giro (modo D) não utiliza "ciclos por ano"
  Local: campo m-ciclos_ano no modo D
  Problema: O campo é coletado no estado mas NUNCA é usado no cálculo de 
            receita bruta. A receita continua sendo: qtd × prod × preço,
            independente de haver 1 ou 3 ciclos/ano.
  Impacto: Para suínos, aves ou tilápia com múltiplos ciclos, a receita anual 
           fica subestimada se o usuário informar "cabeças por ciclo".
  Correção: Adicionar campo "Ciclos por ano" no passo 1 (receita) ou ajustar 
            a fórmula de RB para: qtd × prod × preço × ciclos_ano quando 
            template tiver giro=true.

[ALTO-005] Mortalidade esperada (modo D) não afeta a receita
  Local: campo m-mortalidade
  Problema: O percentual de mortalidade é descrito no manejo mas não reduz 
            a quantidade de animais na receita.
  Impacto: Receita bruta fica superestimada para atividades de giro.
  Correção: Aplicar fator (1 - mortalidade/100) na quantidade efetiva de 
            animais comercializados: qtd_efetiva = qtd × (1 - mortalidade/100).

[MÉDIO-006] Funrural incide sobre "outras receitas" sem distinção
  Local: função derivar(), cálculo de rb
  Problema: A base de cálculo do Funrural inclui a receita principal + outras 
            receitas. Se outras receitas forem de subprodutos da mesma 
            atividade, está correto. Se forem de outra fonte (ex: aluguel de 
            máquina), não deveria incidir.
  Impacto: Pequena distorção tributária dependendo da natureza da outra receita.
  Correção: Adicionar checkbox "Outras receitas sujeitas a Funrural?" ou 
            documentar a simplificação.

[MÉDIO-007] Remuneração da terra usa área do passo 4 genérico
  Local: passo 4, input#area
  Problema: Para perenes, o usuário pode preencher área no passo 5 (area5) e 
            deixar passo 4 em branco. A remuneração da terra fica zero.
  Impacto: CT fica subestimado se o arrendamento for informado mas a área 
           não for replicada no passo 4.
  Correção: Sincronizar input#area com input#area5 (ou usar o mesmo valor 
            quando template for perene).

[MÉDIO-008] Ponto de equilíbrio usa CT mas unidade pode confundir
  Local: passo 6, cálculo de qEq
  Problema: qEq = D.ct / (D.rl / D.n). Isso dá "unidades de produção" 
            necessárias para cobrir CT. Mas o rótulo mostra apenas a unidade 
            base (ex: "ha"), não a unidade de produto (ex: "kg/ha").
  Impacto: O usuário pode interpretar o número como produtividade (kg/ha) 
           quando na verdade é área (ha) ou vice-versa, dependendo do template.
  Correção: Ajustar o rótulo dinamicamente: 
            - Se a "unidade" for ha e o produto for kg/ha, o equilíbrio em 
              "kg/ha" seria CT/(n×preco). O código já calcula prodNiv assim.
            - O qEq atual (CT/(RL/n)) representa "unidades de área" para 
              cobrir o custo total, o que é válido apenas se o preço e 
              produtividade forem fixos.

--------------------------------------------------------------------------------
2. FALHAS DE INTERFACE E EXPERIÊNCIA (UX)
--------------------------------------------------------------------------------

[MÉDIO-009] Troca de template apaga unidades personalizadas
  Local: aplicarTemplate(forcarUnidades=true)
  Problema: Quando o usuário muda o template, as unidades dos campos são 
            sobrescritas mesmo que já estivessem preenchidas.
  Impacto: Frustração se o usuário ajustou unidades manualmente antes de 
           trocar o template por engano.
  Correção: Perguntar ao usuário se deseja manter unidades personalizadas.

[MÉDIO-010] Passo 5 aparece na navegação mas não valida preenchimento do passo 4
  Local: passosAtivos() para perenes: [0,1,2,3,5,4,6,7]
  Problema: A ordem coloca implantação (5) ANTES de fixos (4). O usuário pode 
            preencher 5, ir para 4, e alterar a área/arrendamento, mas não 
            há alerta se o passo 5 ficar inconsistente.
  Impacto: Risco de o usuário não perceber que precisa reajustar o passo 5.
  Correção: Adicionar validação cruzada ou permitir que o passo 5 leia 
            diretamente os valores do passo 4.

[BAIXO-011] Não há validação de campos obrigatórios ao avançar passos
  Local: função vizinho() / irPara()
  Problema: O usuário pode avançar para o passo 7 (relatório) sem preencher 
            nenhum dado, gerando um relatório vazio.
  Impacto: Relatório sem sentido, impressão de PDF inútil.
  Correção: Adicionar validação mínima (ex: qtd>0, preco>0, coe>0) antes de 
            permitir avançar para o relatório.

[BAIXO-012] Itens de COE/Dep/Imp sempre iniciam com uma linha em branco
  Local: aplicarEstado()
  Problema: Se o estado não tiver itens, é adicionada uma linha vazia. Isso 
            polui o relatório e os cálculos.
  Impacto: Visual confuso, risco de linhas fantasmas no dossiê.
  Correção: Não adicionar linha vazia automaticamente; deixar o usuário 
            clicar em "adicionar".

--------------------------------------------------------------------------------
3. PROBLEMAS DE CONSISTÊNCIA METODOLÓGICA
--------------------------------------------------------------------------------

[MÉDIO-013] Depreciação de bens no passo 4 não permite rateio entre atividades
  Local: passo 4, itens-dep
  Problema: Se um trator é usado 50% em lavoura e 50% em pecuária, o usuário 
            não pode lançar apenas 50% da depreciação neste projeto.
  Impacto: COT/CT ficam superestimados para projetos parciais.
  Correção: Adicionar campo "% de uso neste projeto" em cada bem, aplicando 
            o rateio na depreciação.

[MÉDIO-014] Receita de perenes assume produção constante ao longo da vida útil
  Local: montarFluxos()
  Problema: O fluxo de caixa assume que RL e CT são idênticos em todos os 
            anos produtivos. Na prática, pomares têm ramp-up (produção 
            crescente nos 2-3 primeiros anos de colheita).
  Impacto: VPL pode ser otimista ou pessimista dependendo da curva real.
  Correção: Adicionar campos opcionais de "fator de produção" por ano de 
            pomar (ex: ano 1 prod: 40%, ano 2: 70%, ano 3: 100%).

[MÉDIO-015] Custo de formação (passo 6) é valor total, mas label não deixa claro
  Local: passo 6, input#custoform
  Problema: O usuário não sabe se deve informar o custo por ha ou o total.
  Impacto: Fluxo de caixa completamente errado se o usuário informar por ha.
  Correção: Alterar label para "Custo de formação anual TOTAL (R$)" e 
            adicionar hint com exemplo.

--------------------------------------------------------------------------------
4. MELHORIAS SUGERIDAS
--------------------------------------------------------------------------------

[BAIXO-016] Adicionar exportação para JSON/CSV além do PDF
  Impacto: Facilita análise externa e backup.

[BAIXO-017] Adicionar gráfico de sensibilidade (tornado chart) no passo 6
  Impacto: Mostrar como VPL/TIR reagem a variações de preço, produtividade 
           e custo.

[BAIXO-018] Persistir o passo atual no localStorage
  Impacto: Usuário retorna à mesma etapa após recarregar.

[BAIXO-019] Adicionar cálculo de depreciação acelerada (ex: soma dos dígitos)
  Impacto: Alguns bens podem ter depreciação não-linear conforme CONAB.

[BAIXO-020] Incluir índice de liquidez (LC = RL / COE) como indicador
  Impacto: Métrica rápida de saúde financeira do ciclo.

================================================================================
RESUMO DOS ERROS CRÍTICOS A SEREM CORRIGIDOS NO CÓDIGO:
================================================================================
1. [CRÍTICO-001] No fluxo de caixa perene, alterar:
   DE:  const ctCaixa = D.ct - D.depFormacao;
   PARA: const ctCaixa = D.ct - D.dep;  // remove TODA depreciação

   Ou, mais explicitamente:
   const ctCaixa = D.coe + D.prol + D.out + D.remCap + D.remTerra;

2. [CRÍTICO-002] Corrigir o exemplo EXEMPLO_UVA:
   - Remover o bem do passo 4 (p4.bens deve ficar vazio ou conter apenas 
     máquinas/benfeitorias, não o pomar).
   OU
   - Zerar os itens do passo 5 e manter apenas o bem no passo 4.
   A lógica do simulador privilegia o passo 5 para perenes.

3. [ALTO-003] Vincular área do passo 1 com passo 5:
   Adicionar listener: el('area5').addEventListener('input', () => {
     if(ehPerene(el('template').value)) el('qtd').value = el('area5').value;
   });
   E vice-versa.

4. [ALTO-004] Usar ciclos_ano no cálculo de RB quando template.giro=true:
   const ciclos = numv(E.p2.campos.ciclos_ano) || 1;
   const rb = numv(E.p1.qtd) * numv(E.p1.prod) * numv(E.p1.preco) * ciclos 
              + numv(E.p1.secValor);

5. [ALTO-005] Aplicar mortalidade na receita de giro:
   const mortalidade = numv(E.p2.campos.mortalidade) / 100;
   const qtdEfetiva = numv(E.p1.qtd) * (1 - mortalidade);
   const rb = qtdEfetiva * numv(E.p1.prod) * numv(E.p1.preco) + ...;

================================================================================
