# Curso para produtores: roteiro de construção

Documento interno. Não é linkado por nenhuma página.

## O que é

Curso online, autoinstrucional, sem certificação, para pequeno e médio produtor rural que quer aprender a fazer gestão da propriedade, e para quem quer começar na atividade (comprar ou arrendar um sítio, montar um negócio rural). Segunda porta de entrada do site de Gestão de Custos (a primeira é a do aluno, `../index.html`). Reaproveita conteúdo e ferramentas do site, reescritos para o produtor.

## Princípios

1. **A propriedade do aluno é o caso do curso inteiro.** Cada módulo termina com "Na sua propriedade": ele preenche números da realidade dele, que ficam salvos no navegador (`localStorage`, chave `gpr_caderno`). O módulo 10 junta tudo num retrato da propriedade, imprimível.
2. **Parte do que ele já sabe.** Pergunta antes do conceito. Sigla só depois da ideia em palavras simples (COE = "o dinheiro que sai do bolso").
3. **Unidades do dia a dia**: saca, litro, cabeça, hectare, mês.
4. **Curto e no celular.** Módulo de 20 a 30 minutos, lições curtas, fonte grande (base 18px).
5. **Exemplos do RS**, com números de exemplo identificados como exemplo. Dado real só com fonte verificada (CEPEA, CONAB, EMATER, BCB, Campo Futuro/CNA). Nunca inventar número apresentado como real.
6. Sem emoji, sem travessão, sem dark theme. Pictogramas em SVG inline.
7. Material sem vestígios de produção: nada de notas de edição, decisões ou changelog nas páginas.
8. Rodapé de toda página com declaração de uso de IA.

## Dois perfis

Escolhido na página inicial e trocável em cada módulo (`gpr_perfil`: `ja` ou `novo`). Mesmo conteúdo; muda o exercício "Na sua propriedade" (números reais x planejados) e aparecem caixas "Se você vai começar" (`.novo-box`). Classes `.so-ja` e `.so-novo` mostram blocos só para um perfil.

## Trilha

| # | Arco | Módulo | Arquivo | Reaproveita | Estado |
|---|---|---|---|---|---|
| 1 | Olhar | A propriedade como negócio | `modulo-1.html` | conteúdo novo | pronto |
| 2 | Olhar | De onde vem o preço | `modulo-2.html` | aula-t2, relacao-troca-precos, revisões de mercado | pronto |
| 3 | Olhar | Anotar para gerenciar | `modulo-3.html` | parte-1 (parcial) | pronto |
| 4 | Medir | Quanto custa produzir | `modulo-4.html` | parte-2, parte-3 | pronto |
| 5 | Medir | Quanto sobra | `modulo-5.html` | parte-3, equilibrio-soja | pronto |
| 6 | Medir | O dinheiro no tempo | `modulo-6.html` | projeto.html (fluxo) | pronto |
| 7 | Decidir | Crédito rural | `modulo-7.html` | parte-4, credito.html | pronto |
| 8 | Decidir | Riscos e venda | `modulo-8.html` | parte-4 (parcial) | pronto |
| 9 | Decidir | Começar ou ampliar | `modulo-9.html` | conteúdo novo | pronto |
| 10 | Decidir | Planejar o próximo passo | `modulo-10.html` | projeto.html | pronto |

Arcos e cores: Olhar = oliva, Medir = mostarda, Decidir = terra (mesma lógica dos movimentos do site do aluno).

### Conteúdo previsto por módulo

1. **A propriedade como negócio.** Conta da casa x conta da propriedade; retirada da família; autoconsumo; patrimônio; objetivos e ciclo da gestão.
2. **De onde vem o preço.** Oferta e demanda; o produtor como tomador de preço ("você não manda no preço, manda no custo e na hora de vender"); cadeia produtiva (insumo, produtor, cerealista/cooperativa, indústria, varejo, consumidor); mercado internacional (Chicago, câmbio, prêmio de porto, China); insumos também são globais (fertilizante importado, petróleo, câmbio); preço do leite, do boi, das hortaliças (CEASA, mercado local, sazonalidade); onde acompanhar preços (CEPEA, EMATER, CONAB). Na sua propriedade: relação de troca (quantas sacas pagam o adubo).
3. **Anotar para gerenciar.** O que anotar, como (caderno, planilha, aplicativo); inventário de bens; caderno de campo; notas fiscais e bloco de produtor. Na sua propriedade: inventário.
4. **Quanto custa produzir.** Custo que sai do bolso, desgaste (depreciação), o que se deixa de ganhar (oportunidade); custo por unidade. Na sua propriedade: custo de uma atividade.
5. **Quanto sobra.** Receita, margem, lucro, ponto de equilíbrio (quantas sacas para pagar a conta). Na sua propriedade: ponto de equilíbrio.
6. **O dinheiro no tempo.** Fluxo de caixa mês a mês, safra concentrada x gasto o ano todo, reserva. Na sua propriedade: calendário de entradas e saídas.
7. **Crédito rural.** Custeio, investimento, comercialização; PRONAF, PRONAMP; custo real do financiamento; quando vale a pena. Na sua propriedade: simulação de parcela x capacidade de pagamento.
8. **Riscos e venda.** Clima, preço, saúde; PROAGRO, seguro rural, diversificação; vender em partes, venda antecipada, armazenagem. Na sua propriedade: mapa de riscos.
9. **Começar ou ampliar.** Escolher a atividade, comprar x arrendar, capital de entrada, documentação (CAR, CCIR, ITR, matrícula, inscrição estadual, CAF), assistência técnica, começar pequeno.
10. **Planejar o próximo passo.** Junta o caderno em um plano (próxima safra ou novo negócio); retrato imprimível; ponte para projeto.html.

## Estrutura de cada página de módulo

1. Faixa de abertura: número, arco, título, pergunta de partida, tempo estimado, "neste módulo".
2. Barra de progresso de leitura fixa no topo.
3. Lições curtas (3 a 5), cada uma com texto, exemplo e um visual (SVG animado quando ajuda).
4. "Na sua propriedade": calculadora que salva no caderno.
5. "Para lembrar": 3 a 4 frases.
6. "Teste rápido": 3 perguntas com retorno imediato.
7. Botão "concluir módulo" (marca em `gpr_progresso`) e link para o próximo.

## Manutenção

As páginas de módulo são HTML estático: edite direto no arquivo. Cada módulo segue a mesma estrutura (abertura, "neste módulo", lições, "Na sua propriedade", "Para lembrar", teste rápido, concluir). Chaves do caderno: m1, m1novo, m2troca, m2venda, m3inv, m4, m5, m6, m7, m8, m9, m9check, m10. O módulo 10 lê todas para montar o retrato.

Cópia do caderno: botões em `[data-copia]` (rodapé de todas as páginas, bloco "Seu caderno" na home, módulo 10). Baixar gera `caderno-propriedade-AAAA-MM-DD.json` com caderno, progresso e perfil; "Enviar para mim" usa o compartilhamento do celular quando disponível; "Carregar" valida o campo `curso` e substitui os dados. Lembrete fixo no rodapé da tela quando há números e nenhuma cópia há mais de 7 dias (`gpr_copia`), fechável por sessão.

## Arquivos

- `curso.css`: tokens e componentes comuns.
- `curso.js`: progresso, caderno, revelação ao rolar, quiz, barra de leitura.
- `index.html`: página inicial do curso.
- `modulo-N.html`: um por módulo, de 1 a 10.
- Imagens: reaproveitar `../Aulas/*.jpg` com o crédito já usado no site.

## Publicação

Nada linkado a partir da home do aluno até o autor decidir lançar. Quando lançar: card na `../index.html`, entrada no `../sitemap.xml`, remover `noindex`.

## Registro de trabalho

- 07/10/2026: roteiro, curso.css, curso.js, index.html, modulo-1.html. Perfil "quero começar" e módulo 9 novo (trilha passa a 10). Módulos 2 a 10 escritos, testados em tela de celular e com teste de interação sem erros. Cópia do caderno (baixar, enviar, carregar) e lembrete de 7 dias.
